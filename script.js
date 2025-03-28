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
  responses.forEach((res, index) => {
    const el = createResponseElement(res, index);
    container.appendChild(el);
  });
}

function renderFavorites() {
  const container = document.getElementById("favoritesContainer");
  container.innerHTML = "";
  favorites.forEach((res, index) => {
    const el = createResponseElement(res, index, true);
    container.appendChild(el);
  });
}

function createResponseElement(res, index, isFav = false) {
  const div = document.createElement("div");
  div.className = "response";
  div.innerHTML = `<div class='title'>${res.title}</div><div class='text'>${res.text}</div>`;
  div.onclick = () => {
    navigator.clipboard.writeText(res.text);
    document.getElementById("confirmation").style.display = "block";
    setTimeout(() => document.getElementById("confirmation").style.display = "none", 1500);
  };
  if (!isFav) {
    const favBtn = document.createElement("button");
    favBtn.textContent = "♥";
    favBtn.onclick = e => {
      e.stopPropagation();
      favorites.push(res);
      localStorage.setItem("favorites", JSON.stringify(favorites));
    };
    div.appendChild(favBtn);
  }
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
  if (!title || !text) return;
  responses.push({ title, text });
  localStorage.setItem("responses", JSON.stringify(responses));
  closeModal();
  renderResponses();
}

function generateWithAI() {
  const prompt = document.getElementById("aiPrompt").value;
  if (!prompt) return alert("Décris la situation !");
  // Simule une réponse IA
  document.getElementById("newTitle").value = "Réponse IA";
  document.getElementById("newText").value = `Voici une réponse type générée pour : "${prompt}" (version démo)`;
}

document.addEventListener("DOMContentLoaded", () => {
  renderResponses();
});
