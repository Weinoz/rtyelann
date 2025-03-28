let responses = JSON.parse(localStorage.getItem("responses") || "[]");
let favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

function navigate(pageId) {
  document.querySelectorAll(".page").forEach(p => p.style.display = "none");
  document.getElementById(pageId).style.display = "block";
  if (pageId === "favoritesPage") renderFavorites();
}

function renderResponses() {
  const container = document.getElementById("responsesContainer");
  container.innerHTML = "";
  responses.forEach((res, i) => {
    const el = createResponseElement(res, i);
    container.appendChild(el);
  });
}

function renderFavorites() {
  const container = document.getElementById("favoritesContainer");
  container.innerHTML = "";
  favorites.forEach((res, i) => {
    const el = createResponseElement(res, i, true);
    container.appendChild(el);
  });
}

function createResponseElement(res, index, isFav = false) {
  const div = document.createElement("div");
  div.className = "response";
  div.innerHTML = `
    <div class='title'>${res.title}</div>
    <div class='text'>${res.text}</div>
    <div class='tags'>${(res.tags || []).map(t => `<span class="tag">${t}</span>`).join("")}</div>
    <button onclick="deleteResponse(${index});event.stopPropagation()">🗑️</button>
  `;
  div.onclick = () => {
    navigator.clipboard.writeText(res.text);
    const c = document.getElementById("confirmation");
    c.style.display = "block";
    setTimeout(() => c.style.display = "none", 1500);
  };
  return div;
}

function filterResponses() {
  const val = document.getElementById("searchBar").value.toLowerCase();
  document.querySelectorAll("#responsesContainer .response").forEach(el => {
    const text = el.innerText.toLowerCase();
    el.style.display = text.includes(val) ? "block" : "none";
  });
}

function showAddResponse() {
  document.getElementById("addResponseModal").style.display = "flex";
}

function closeModal() {
  document.getElementById("addResponseModal").style.display = "none";
}

function saveResponse() {
  const title = document.getElementById("newTitle").value.trim();
  const text = document.getElementById("newText").value.trim();
  const tags = document.getElementById("newTags").value.split(",").map(t => t.trim()).filter(Boolean);
  if (!title || !text) return;
  responses.push({ title, text, tags });
  localStorage.setItem("responses", JSON.stringify(responses));
  closeModal();
  renderResponses();
}

function deleteResponse(index) {
  if (!confirm("Supprimer cette réponse ?")) return;
  responses.splice(index, 1);
  localStorage.setItem("responses", JSON.stringify(responses));
  renderResponses();
}

function generateWithAI() {
  const prompt = document.getElementById("aiPrompt").value;
  const key = document.getElementById("apiKey").value;
  if (!prompt || !key) return alert("Entre un prompt et ta clé API OpenAI");

  fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + key
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: `Formule une réponse type professionnelle et bienveillante à cette situation : ${prompt}` }],
      max_tokens: 150
    })
  }).then(r => r.json()).then(data => {
    const res = data.choices?.[0]?.message?.content || "Erreur dans la réponse IA";
    document.getElementById("newText").value = res;
    document.getElementById("newTitle").value = "Réponse IA";
  }).catch(err => alert("Erreur : " + err.message));
}

function toggleTheme() {
  document.body.classList.toggle("dark");
  localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
}

document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
  }
  renderResponses();
});
