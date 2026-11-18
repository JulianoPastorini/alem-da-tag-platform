window.dataLayer = window.dataLayer || [];

async function loadTrilhas() {
  const container = document.querySelector("#trilhas");
  if (!container) return;

  try {
    const response = await fetch("http://localhost:8000/trilhas");
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const trilhas = await response.json();
    container.innerHTML = trilhas
      .map((trilha) => `
        <article class="card">
          <h3>${trilha.titulo}</h3>
          <p>${trilha.descricao}</p>
        </article>
      `)
      .join("");
  } catch (error) {
    container.innerHTML = '<p class="card">Não foi possível carregar as trilhas agora.</p>';
  }
}

function pushSandboxEvent() {
  const event = {
    event: "alem_da_tag_sandbox",
    timestamp: new Date().toISOString(),
  };

  window.dataLayer.push(event);

  const output = document.querySelector("#event-output");
  if (output) output.textContent = JSON.stringify(window.dataLayer, null, 2);
}

document.querySelector("#push-event")?.addEventListener("click", pushSandboxEvent);
loadTrilhas();
