"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const G = require("../core.js");
const near = (actual, expected) => assert.ok(Math.abs(actual - expected) < 1e-10);
test("totals reflect the six displayed campaign records", () => {
  const t = G.summarize(G.campaigns);
  assert.equal(t.spend, 20400); assert.equal(t.leads, 293); assert.equal(t.opportunities, 64);
  assert.equal(t.clicks, 6220); assert.equal(t.impressions, 403000);
  near(t.cpl, 20400 / 293); near(t.cpo, 318.75); near(t.acceptance, 64 / 293);
});
test("rates aggregate counts rather than averaging channel rates", () => {
  const t = G.summarize([{ spend: 100, leads: 1, opportunities: 0, impressions: 10, clicks: 1 }, { spend: 900, leads: 20, opportunities: 10, impressions: 1000, clicks: 100 }]);
  near(t.conversion, 21 / 101); near(t.acceptance, 10 / 21);
  assert.notEqual(t.acceptance, 0.25);
});
test("an empty filter has zero volume and unavailable rates", () => {
  const rows = G.filterCampaigns("tiktok", "CO"); assert.equal(rows.length, 0);
  const t = G.summarize(rows); assert.equal(t.spend, 0); assert.equal(t.cpo, null); assert.equal(t.ctr, null); assert.equal(t.cpl, null);
});
test("country and channel filters combine", () => {
  const rows = G.filterCampaigns("google", "EC"); assert.equal(rows.length, 1);
  assert.equal(rows[0].id, "ec-google"); assert.equal(G.summarize(rows).cpo, 200);
});
test("summary rejects negative and missing data", () => {
  assert.throws(() => G.summarize([{ impressions: 5, clicks: -1, spend: 2, leads: 1, opportunities: 1 }]));
  assert.throws(() => G.summarize([{ impressions: 5, clicks: 1, spend: 2, leads: 1 }]));
});
test("UTM preserves the destination query and fragment, encodes input and replaces old values", () => {
  const result = G.buildUtm({ base: "https://example.com/path?product=a&utm_source=old&utm_source=dup&utm_term=old#form", source: "google", medium: "cpc", campaign: "México demo & A", content: "copy a" });
  const u = new URL(result); assert.equal(u.hash, "#form"); assert.equal(u.searchParams.get("product"), "a");
  assert.deepEqual(u.searchParams.getAll("utm_source"), ["google"]); assert.equal(u.searchParams.get("utm_campaign"), "México demo & A"); assert.equal(u.searchParams.get("utm_content"), "copy a"); assert.equal(u.searchParams.has("utm_term"), false);
});
test("optional content removes stale content from a previous campaign", () => {
  const u = new URL(G.buildUtm({ base: "https://example.com/?utm_content=old", source: "meta", medium: "paid_social", campaign: "demo" }));
  assert.equal(u.searchParams.has("utm_content"), false);
});
test("UTM rejects script destinations, credentials, missing fields and relative URLs", () => {
  for (const base of ["javascript:alert(1)", "data:text/html,test", "/relative", "https://user:password@example.com/"]) assert.throws(() => G.buildUtm({ base, source: "a", medium: "b", campaign: "c" }));
  assert.throws(() => G.buildUtm({ base: "https://example.com", source: "  ", medium: "b", campaign: "c" }));
});
test("CRO reports percentage points separately from relative improvement", () => {
  const t = G.compareVariants(1000, 30, 1000, 42); near(t.rateA, 0.03); near(t.rateB, 0.042);
  near(t.absoluteLift, 0.012); near(t.relativeLift, 0.4);
});
test("CRO handles base zero and a lower conversion", () => {
  assert.equal(G.compareVariants(100, 0, 100, 3).relativeLift, null);
  near(G.compareVariants(100, 10, 200, 10).relativeLift, -0.5);
});
test("CRO rejects impossible, zero exposure, fractional and negative counts", () => {
  for (const input of [[10, 11, 10, 1], [0, 0, 100, 1], [10.5, 1, 20, 1], [10, -1, 20, 1]]) assert.throws(() => G.compareVariants(...input));
});
test("a form error creates no generate_lead and a later confirmation creates exactly one", () => {
  const session = G.createTrackingSession(); const err = session.step("error");
  assert.equal(err.events.filter(e => e.event === "generate_lead").length, 0);
  const ok = session.step("success"); assert.equal(ok.events.filter(e => e.event === "generate_lead").length, 1);
  assert.equal(ok.events.filter(e => e.event === "form_start").length, 1);
  const repeat = session.step("repeat"); assert.equal(repeat.newEvents.length, 0); assert.equal(repeat.events.filter(e => e.event === "generate_lead").length, 1);
  assert.equal(session.step("success").newEvents.length, 0);
});
test("repeating before reception creates no lead", () => {
  const result = G.createTrackingSession().step("repeat"); assert.equal(result.events.length, 0);
});
test("CSV contains only the selected rows and keeps units explicit", () => {
  const csv = G.campaignCsv(G.filterCampaigns("google", "EC"));
  assert.equal(csv.split("\r\n").length, 2); assert.ok(csv.includes('"Ecuador"')); assert.ok(csv.includes('"MXN"')); assert.ok(!csv.includes('"México"'));
});
