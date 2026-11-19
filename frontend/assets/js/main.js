window.dataLayer = window.dataLayer || [];

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

function showToast(title, icon = "success") {
  if (window.Swal) Swal.fire({ title, icon, toast: true, position: "bottom-end", timer: 2200, showConfirmButton: false });
}

function setupTheme() {
  const toggle = $(".theme-toggle");
  toggle?.addEventListener("click", () => {
    const isDark = document.documentElement.classList.toggle("dark");
    localStorage.setItem("adt-theme", isDark ? "dark" : "light");
  });
}

function setupModal() {
  const modal = $("#auth-modal");
  if (!modal) return;
  $$(".join-trigger").forEach((button) => button.addEventListener("click", () => modal.showModal()));
  $(".close-modal", modal)?.addEventListener("click", () => modal.close());
  modal.addEventListener("click", (event) => { if (event.target === modal) modal.close(); });
  $$("[data-auth-tab]", modal).forEach((tab) => tab.addEventListener("click", () => {
    const signup = tab.dataset.authTab === "signup";
    $$("[data-auth-tab]", modal).forEach((item) => item.classList.toggle("active", item === tab));
    $("#auth-title", modal).textContent = signup ? "Comece a compartilhar." : "Bem-vindo de volta.";
    $("#auth-submit", modal).textContent = signup ? "Criar minha conta" : "Entrar na Comunidade";
  }));
  $("#auth-form", modal)?.addEventListener("submit", (event) => { event.preventDefault(); modal.close(); showToast("Bem-vindo à comunidade!"); });
}

function setupFilters() {
  $$(".filter").forEach((button) => button.addEventListener("click", () => {
    const value = button.dataset.filter;
    $$(".filter").forEach((item) => item.classList.toggle("active", item.dataset.filter === value));
    $$(".article-card").forEach((card) => { card.hidden = value !== "Todos" && !card.dataset.tags.includes(value); });
    $$(".track-card").forEach((card) => { card.hidden = value !== "Todas" && !card.dataset.category.includes(value); });
  }));
}

function setupBookmarks() {
  $$(".bookmark").forEach((button) => button.addEventListener("click", () => {
    button.classList.toggle("saved");
    showToast(button.classList.contains("saved") ? "Artigo salvo" : "Artigo removido dos salvos");
  }));
}

function setupSandbox() {
  const output = $("#event-output");
  $("#push-event")?.addEventListener("click", () => {
    const event = { event: "lead_generated", user: { id: "dev_500", consent: true }, timestamp: new Date().toISOString() };
    window.dataLayer.push(event);
    if (output) output.textContent = JSON.stringify(event, null, 2);
    showToast("lead_generated disparado");
  });
  $("#reset-event")?.addEventListener("click", () => { window.dataLayer.length = 0; if (output) output.textContent = "{}"; showToast("Evento resetado", "info"); });
  $("#copy-code")?.addEventListener("click", async () => { await navigator.clipboard?.writeText($("#sandbox-code")?.textContent || ""); showToast("Código copiado"); });
}

async function loadTrilhas() {
  const container = $("#trilhas-api");
  if (!container) return;
  try {
    const response = await fetch("http://localhost:8000/trilhas");
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const trilhas = await response.json();
    if (Array.isArray(trilhas) && trilhas.length) container.dataset.loaded = "true";
  } catch { /* A interface estática permanece pronta quando a API ainda não subiu. */ }
}

document.addEventListener("DOMContentLoaded", () => {
  window.lucide?.createIcons();
  setupTheme(); setupModal(); setupFilters(); setupBookmarks(); setupSandbox(); loadTrilhas();
});
