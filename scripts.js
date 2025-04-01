document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  const usernameElement = document.getElementById('username');
  const emailElement = document.getElementById('email');
  const favoritesElement = document.getElementById('favorites');
  const rtsContainer = document.getElementById('rtsContainer');

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = loginForm.email.value;
      const password = loginForm.password.value;
      // Simulate a login request
      alert('Connexion réussie');
    });
  }

  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const username = registerForm.username.value;
      const email = registerForm.email.value;
      const password = registerForm.password.value;
      // Simulate a register request
      alert('Inscription réussie');
    });
  }

  if (usernameElement && emailElement && favoritesElement) {
    // Simulate fetching user data
    usernameElement.textContent = 'Utilisateur';
    emailElement.textContent = 'utilisateur@example.com';
    favoritesElement.textContent = '3';
  }

  if (rtsContainer) {
    // Simulate fetching RTs
    const rts = [
      { title: 'RT 1', content: 'Contenu de la RT 1' },
      { title: 'RT 2', content: 'Contenu de la RT 2' },
      { title: 'RT 3', content: 'Contenu de la RT 3' },
    ];
    rts.forEach(rt => {
      const rtElement = document.createElement('div');
      rtElement.innerHTML = `
        <h2>${rt.title}</h2>
        <p>${rt.content}</p>
        <button onclick="copyToClipboard('${rt.content}')">Copier</button>
      `;
      rtsContainer.appendChild(rtElement);
    });
  }
});

function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    alert('RT copiée dans le presse-papiers');
  });
}