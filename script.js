let responses = JSON.parse(localStorage.getItem("responses") || "[]");
let favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
let categories = JSON.parse(localStorage.getItem("categories") || "[]");
let comments = JSON.parse(localStorage.getItem("comments") || "[]");
let history = JSON.parse(localStorage.getItem("history") || "[]");
let translations = {
  en: {
    home: "Home",
    favorites: "Favorites",
    add: "+ Add",
    export: "Export JSON",
    search: "Search for a response...",
    newResponse: "New Response",
    title: "Title",
    content: "Content...",
    tags: "Tags (comma separated)",
    category: "Category",
    prompt: "AI Prompt",
    generate: "Generate with AI",
    save: "Save",
    cancel: "Cancel",
    copied: "Text copied!"
  },
  fr: {
    home: "Accueil",
    favorites: "Favoris",
    add: "+ Ajouter",
    export: "Exporter JSON",
    search: "Rechercher une réponse...",
    newResponse: "Nouvelle Réponse",
    title: "Titre",
    content: "Contenu...",
    tags: "Tags (séparés par des virgules)",
    category: "Catégorie",
    prompt: "Prompt IA",
    generate: "Générer avec l'IA",
    save: "Enregistrer",
    cancel: "Annuler",
    copied: "Texte copié !"
  }
};

function navigate(pageId) {
  document.querySelectorAll(".page").forEach(p => p.style.display = "none");
  document.getElementById(pageId).style.display = "block";
  if (pageId === "favoritesPage") renderFavorites();
 