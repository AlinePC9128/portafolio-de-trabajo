"use strict";
(() => {
  document.documentElement.classList.add("js");
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.querySelector("#menu");
  const closeMenu = () => {
    menu?.classList.remove("open");
    toggle?.setAttribute("aria-expanded", "false");
    toggle?.setAttribute("aria-label", "Abrir menú");
  };
  toggle?.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") !== "true";
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
    menu.classList.toggle("open", open);
  });
  menu?.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMenu));
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && toggle?.getAttribute("aria-expanded") === "true") {
      closeMenu(); toggle.focus();
    }
  });
  const stages = {
    acquisition: { label: "ADQUISICIÓN", title: "Un mensaje para cada intención.", copy: "Trabajo audiencias, búsquedas, anuncios y páginas de destino en Google Ads, Meta Ads y TikTok Ads. La siguiente decisión depende del comportamiento y de la calidad del lead.", tools: ["Google Ads", "Meta Ads", "TikTok Ads"] },
    conversion: { label: "CONVERSIÓN", title: "Una experiencia que facilita el siguiente paso.", copy: "Trabajo propuesta de valor, jerarquía, CTA y formularios en WordPress. Reviso eventos y conversiones con GA4 y GTM para entender en qué parte del recorrido aparece la fricción.", tools: ["WordPress", "GA4 + GTM", "CRO + UX"] },
    followup: { label: "SEGUIMIENTO", title: "Que cada solicitud llegue con contexto.", copy: "Conecto formularios con CRM, correo y WhatsApp mediante Zapier y webhooks. Fuentes, estados, responsables y actividades ayudan al equipo comercial a continuar la conversación.", tools: ["Perfex CRM", "Zapier", "Webhooks"] }
  };
  document.querySelectorAll("[data-stage]").forEach(button => {
    button.addEventListener("click", () => {
      const data = stages[button.dataset.stage]; if (!data) return;
      document.querySelectorAll("[data-stage]").forEach(item => {
        const selected = item === button; item.classList.toggle("active", selected); item.setAttribute("aria-pressed", String(selected));
      });
      document.querySelector("#stage-label").textContent = data.label;
      document.querySelector("#stage-title").textContent = data.title;
      document.querySelector("#stage-copy").textContent = data.copy;
      document.querySelector("#stage-tools").replaceChildren(...data.tools.map(text => { const span = document.createElement("span"); span.textContent = text; return span; }));
    });
  });
  const year = document.querySelector("#year"); if (year) year.textContent = String(new Date().getFullYear());
})();

