"use strict";
(() => {
  const G = window.GrowthLab;
  const $ = selector => document.querySelector(selector);
  const number = new Intl.NumberFormat("es-MX");
  const currency = new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN", minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const percent = new Intl.NumberFormat("es-MX", { style: "percent", minimumFractionDigits: 1, maximumFractionDigits: 2 });
  const money = value => value === null ? "N/D" : currency.format(value);
  const rate = value => value === null ? "N/D" : percent.format(value);
  const setText = (selector, text) => { $(selector).textContent = text; };
  function status(selector, message, error = false) { const el = $(selector); el.textContent = message; el.classList.toggle("error", error); }
  function currentRows() { return G.filterCampaigns($("#channel-filter").value, $("#country-filter").value); }
  function updateCampaigns() {
    const rows = currentRows(), total = G.summarize(rows);
    for (const [id, value] of Object.entries({ "spend": money(total.spend), "leads": number.format(total.leads), "cpl": money(total.cpl), "opportunities": number.format(total.opportunities), "cpo": money(total.cpo), "acceptance": rate(total.acceptance) })) setText("#metric-" + id, value);
    setText("#funnel-clicks", number.format(total.clicks)); setText("#funnel-leads", number.format(total.leads)); setText("#funnel-opps", number.format(total.opportunities));
    setText("#funnel-note", "CTR: " + rate(total.ctr) + " · Clic a lead: " + rate(total.conversion) + ". Tasas calculadas desde los totales.");
    const body = $("#campaign-rows"); body.replaceChildren();
    for (const row of rows) {
      const tr = document.createElement("tr"), m = G.summarize([row]);
      const values = [row.name, G.countryNames[row.country], money(row.spend), rate(m.ctr), number.format(row.leads), money(m.cpl), number.format(row.opportunities), rate(m.acceptance), money(m.cpo)];
      values.forEach((value, i) => {
        const td = document.createElement("td"); td.textContent = value;
        if (i === 0) { const small = document.createElement("small"); small.textContent = G.channelNames[row.channel]; td.appendChild(small); }
        tr.appendChild(td);
      }); body.appendChild(tr);
    }
    const insight = $("#campaign-insight"); insight.classList.toggle("empty", !rows.length);
    if (!rows.length) {
      const tr = document.createElement("tr"), td = document.createElement("td"); td.colSpan = 9; td.textContent = "No hay campañas para esta combinación. Prueba otro filtro."; tr.appendChild(td); body.appendChild(tr);
      insight.textContent = "No hay registros en el filtro seleccionado. Las tasas sin denominador aparecen como N/D.";
    } else {
      const ranking = rows.filter(row => row.opportunities > 0).slice().sort((a, b) => G.summarize([a]).cpo - G.summarize([b]).cpo);
      if (!ranking.length) insight.textContent = "El filtro no registra oportunidades. Revisaría calidad del lead y seguimiento antes de valorar una ampliación de inversión.";
      else {
        const best = ranking[0], cheapest = rows.filter(row => row.leads > 0).slice().sort((a, b) => G.summarize([a]).cpl - G.summarize([b]).cpl)[0];
        insight.textContent = G.channelNames[best.channel] + " · " + G.countryNames[best.country] + " tiene el menor costo por oportunidad de este filtro (" + money(G.summarize([best]).cpo) + "). " + (cheapest && cheapest.id !== best.id ? "La campaña con el CPL más bajo es otra: revisaría la aceptación comercial antes de mover presupuesto." : "Compararía calidad, capacidad de seguimiento y volumen antes de ampliar la inversión.");
      }
    }
  }
  function download(text, filename, type) {
    const url = URL.createObjectURL(new Blob([text], { type }));
    const link = document.createElement("a"); link.href = url; link.download = filename; document.body.appendChild(link); link.click(); link.remove(); setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  $("#channel-filter").addEventListener("change", updateCampaigns);
  $("#country-filter").addEventListener("change", updateCampaigns);
  $("#export-campaigns").addEventListener("click", () => download("\ufeff" + G.campaignCsv(currentRows()), "growth-lab-campanas-demo.csv", "text/csv;charset=utf-8"));
  function utmValues() { return { base: $("#base-url").value, source: $("#utm-source").value, medium: $("#utm-medium").value, campaign: $("#utm-campaign").value, content: $("#utm-content").value }; }
  let generatedUrl = "";
  function generateUtm() {
    generatedUrl = G.buildUtm(utmValues()); $("#utm-result").textContent = generatedUrl; status("#utm-status", "Enlace generado. Revisa destino y nomenclatura antes de usarlo."); return generatedUrl;
  }
  $("#utm-form").addEventListener("submit", event => { event.preventDefault(); try { generateUtm(); } catch (error) { generatedUrl = ""; $("#utm-result").textContent = "Corrige el destino o los campos para generar un nuevo enlace."; status("#utm-status", error.message, true); } });
  $("#utm-form").addEventListener("input", () => { generatedUrl = ""; $("#utm-result").textContent = "Los campos cambiaron. Genera el enlace para actualizarlo."; status("#utm-status", ""); });
  $("#copy-utm").addEventListener("click", async () => {
    try {
      const value = generateUtm();
      if (!navigator.clipboard?.writeText) { status("#utm-status", "Tu navegador no permite copiar automáticamente. Selecciona y copia el enlace mostrado."); return; }
      await navigator.clipboard.writeText(value); status("#utm-status", "Enlace copiado.");
    } catch (error) { status("#utm-status", error.message || "Selecciona y copia el enlace mostrado.", true); }
  });
  let tracking = G.createTrackingSession();
  document.querySelectorAll("[data-track]").forEach(button => button.addEventListener("click", () => {
    const result = tracking.step(button.dataset.track); $("#tracking-trace").textContent = JSON.stringify(result.events, null, 2);
    setText("#lead-event-count", String(result.events.filter(item => item.event === "generate_lead").length));
    status("#tracking-status", result.message);
  }));
  $("#reset-tracking").addEventListener("click", () => { tracking = G.createTrackingSession(); setText("#tracking-trace", "[]"); setText("#lead-event-count", "0"); status("#tracking-status", "Simulación reiniciada."); });
  $("#export-tracking").addEventListener("click", () => download(JSON.stringify(G.trackingPlan, null, 2), "growth-lab-plan-medicion-demo.json", "application/json"));
  function updateCro() {
    const values = ["#visits-a", "#leads-a", "#visits-b", "#leads-b"].map(selector => { const raw = $(selector).value.trim(); if (!raw) throw new Error("Completa las visitas y los leads de ambas variantes."); return Number(raw); });
    const result = G.compareVariants(...values);
    setText("#rate-a", rate(result.rateA)); setText("#rate-b", rate(result.rateB));
    const pp = new Intl.NumberFormat("es-MX", { maximumFractionDigits: 2 }).format(result.absoluteLift * 100);
    setText("#absolute-lift", (result.absoluteLift > 0 ? "+" : "") + pp + " pp");
    setText("#relative-lift", result.relativeLift === null ? "N/D" : (result.relativeLift > 0 ? "+" : "") + rate(result.relativeLift));
    setText("#cro-interpretation", result.absoluteLift === 0 ? "Las variantes tienen la misma conversión observada. Revisaría calidad del lead y el diseño de la prueba." : (result.absoluteLift > 0 ? "B" : "A") + " tiene una conversión observada mayor. Esto describe los datos introducidos; no demuestra por sí solo que el cambio cause una mejora.");
    status("#cro-status", "Comparación calculada. Revisa también la aceptación comercial.");
  }
  $("#cro-form").addEventListener("submit", event => { event.preventDefault(); try { updateCro(); } catch (error) {
    for (const id of ["#rate-a", "#rate-b", "#absolute-lift", "#relative-lift"]) setText(id, "—");
    setText("#cro-interpretation", "Corrige los datos para comparar las variantes."); status("#cro-status", error.message, true);
  } });
  $("#cro-form").addEventListener("input", () => { for (const id of ["#rate-a", "#rate-b", "#absolute-lift", "#relative-lift"]) setText(id, "—"); setText("#cro-interpretation", "Los datos cambiaron. Pulsa Comparar variantes para actualizar."); status("#cro-status", ""); });
  updateCampaigns(); updateCro();
})();
