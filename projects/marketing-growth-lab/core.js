/* Pure calculations and validation shared by the browser demo and its tests. */
(function (root) {
  "use strict";
  const campaigns = Object.freeze([
    { id: "mx-google", name: "Búsquedas de solución", channel: "google", country: "MX", impressions: 42000, clicks: 1260, spend: 6600, leads: 63, opportunities: 21 },
    { id: "mx-meta", name: "Beneficio de producto", channel: "meta", country: "MX", impressions: 160000, clicks: 1920, spend: 4800, leads: 96, opportunities: 12 },
    { id: "mx-tiktok", name: "Video de problema y solución", channel: "tiktok", country: "MX", impressions: 100000, clicks: 1000, spend: 1800, leads: 32, opportunities: 4 },
    { id: "co-google", name: "Búsquedas de solución", channel: "google", country: "CO", impressions: 18000, clicks: 540, spend: 3000, leads: 27, opportunities: 9 },
    { id: "ec-meta", name: "Beneficio de producto", channel: "meta", country: "EC", impressions: 65000, clicks: 780, spend: 1800, leads: 39, opportunities: 6 },
    { id: "ec-google", name: "Búsquedas de solución", channel: "google", country: "EC", impressions: 18000, clicks: 720, spend: 2400, leads: 36, opportunities: 12 }
  ].map(row => Object.freeze(row)));
  const channelNames = Object.freeze({ google: "Google Ads", meta: "Meta Ads", tiktok: "TikTok Ads" });
  const countryNames = Object.freeze({ MX: "México", CO: "Colombia", EC: "Ecuador" });
  const ratio = (numerator, denominator) => denominator > 0 ? numerator / denominator : null;
  function summarize(rows) {
    const total = rows.reduce((acc, row) => {
      for (const key of ["impressions", "clicks", "spend", "leads", "opportunities"]) {
        if (!Number.isFinite(row[key]) || row[key] < 0) throw new Error("El escenario contiene un valor inválido.");
        acc[key] += row[key];
      }
      return acc;
    }, { impressions: 0, clicks: 0, spend: 0, leads: 0, opportunities: 0 });
    return Object.freeze({ ...total, ctr: ratio(total.clicks, total.impressions), conversion: ratio(total.leads, total.clicks), cpl: ratio(total.spend, total.leads), cpo: ratio(total.spend, total.opportunities), acceptance: ratio(total.opportunities, total.leads) });
  }
  function filterCampaigns(channel = "all", country = "all") {
    return campaigns.filter(row => (channel === "all" || row.channel === channel) && (country === "all" || row.country === country));
  }
  function buildUtm({ base, source, medium, campaign, content = "" }) {
    let url;
    try { url = new URL(String(base).trim()); } catch { throw new Error("Introduce una URL válida que empiece por https:// o http://."); }
    if (!["https:", "http:"].includes(url.protocol)) throw new Error("El destino debe usar https:// o http://.");
    if (url.username || url.password) throw new Error("Usa una URL de destino sin credenciales.");
    const required = { utm_source: source, utm_medium: medium, utm_campaign: campaign };
    for (const [key, value] of Object.entries(required)) {
      if (!String(value ?? "").trim()) throw new Error("Completa fuente, medio y campaña.");
      url.searchParams.set(key, String(value).trim());
    }
    for (const key of ["utm_content", "utm_term"]) url.searchParams.delete(key);
    if (String(content).trim()) url.searchParams.set("utm_content", String(content).trim());
    return url.toString();
  }
  function compareVariants(visitsA, leadsA, visitsB, leadsB) {
    for (const value of [visitsA, leadsA, visitsB, leadsB]) if (!Number.isSafeInteger(value) || value < 0) throw new Error("Usa cantidades enteras y no negativas.");
    if (!visitsA || !visitsB) throw new Error("Cada variante necesita al menos una visita.");
    if (leadsA > visitsA || leadsB > visitsB) throw new Error("Los leads no pueden superar las visitas en esta comparación.");
    const rateA = leadsA / visitsA, rateB = leadsB / visitsB;
    return Object.freeze({ rateA, rateB, absoluteLift: rateB - rateA, relativeLift: rateA > 0 ? (rateB - rateA) / rateA : null });
  }
  function campaignCsv(rows) {
    const columns = ["campana", "canal", "pais", "moneda", "impresiones", "clics", "inversion", "leads", "oportunidades", "ctr", "cpl", "aceptacion", "costo_oportunidad"];
    const escape = value => {
      let text = String(value ?? "");
      if (/^[=+@-]/.test(text)) text = "'" + text;
      return '"' + text.replace(/"/g, '""') + '"';
    };
    const data = rows.map(row => {
      const metrics = summarize([row]);
      return [row.name, channelNames[row.channel], countryNames[row.country], "MXN", row.impressions, row.clicks, row.spend, row.leads, row.opportunities, metrics.ctr, metrics.cpl, metrics.acceptance, metrics.cpo].map(escape).join(",");
    });
    return [columns.join(","), ...data].join("\r\n");
  }
  function createTrackingSession() {
    let started = false, recorded = false;
    const events = [];
    function step(action) {
      if (!["error", "success", "repeat"].includes(action)) throw new Error("Acción de demo inválida.");
      if (action === "repeat" && !recorded) return { events: events.slice(), newEvents: [], message: "Primero confirma el lead para probar una repetición." };
      if (recorded) return { events: events.slice(), newEvents: [], message: "Solicitud ya registrada: se mantiene una sola conversión." };
      const next = [];
      if (!started) { next.push({ event: "form_start", form_id: "demo_lead_form", demo: true }); started = true; }
      next.push({ event: "form_submit", form_id: "demo_lead_form", demo: true });
      if (action === "error") next.push({ event: "form_error", form_id: "demo_lead_form", error_type: "validation", demo: true });
      else { next.push({ event: "generate_lead", form_id: "demo_lead_form", lead_source: "portfolio_demo", demo: true }); recorded = true; }
      events.push(...next);
      return { events: events.slice(), newEvents: next, message: action === "error" ? "Se registró un error de ejemplo. Aún no se genera un lead." : "Recepción confirmada: se registró una conversión de ejemplo." };
    }
    return Object.freeze({ step });
  }
  const trackingPlan = Object.freeze({
    title: "Plan propuesto de medición de una landing B2B",
    demo: true,
    author: "Aline Peña Colunga",
    events: [
      { event: "form_start", type: "enhanced_measurement", trigger: "Primera interacción con el formulario", parameters: ["form_id"], qa: "Comprobar medición mejorada antes de añadir instrumentación manual." },
      { event: "form_submit", type: "enhanced_measurement", trigger: "Intento de envío", parameters: ["form_id"], qa: "No usar un intento como confirmación de recepción." },
      { event: "form_error", type: "custom_proposed", trigger: "Error de validación o recepción", parameters: ["form_id", "error_type"], qa: "Usar categorías del error sin datos personales." },
      { event: "generate_lead", type: "recommended", trigger: "Recepción confirmada de la solicitud", parameters: ["lead_source"], qa: "Una emisión por solicitud en este flujo; si se añade value, añadir currency." },
      { event: "qualify_lead", type: "recommended", trigger: "Calificación conforme al criterio comercial", parameters: [], qa: "Requiere integración con CRM y criterio de calificación." }
    ],
    references: ["https://support.google.com/analytics/answer/9216061?hl=es", "https://developers.google.com/analytics/devguides/collection/ga4/reference/events?client_type=gtm"]
  });
  const api = Object.freeze({ campaigns, channelNames, countryNames, summarize, filterCampaigns, buildUtm, compareVariants, campaignCsv, createTrackingSession, trackingPlan });
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.GrowthLab = api;
})(typeof globalThis !== "undefined" ? globalThis : this);
