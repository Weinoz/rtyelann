import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <nav>
        <ul>
          <li><Link to="/">Accueil</Link></li>
          <li><Link to="/login">Connexion</Link></li>
          <li><Link to="/register">Inscription</Link></li>
          <li><Link to="/profile">Profil</Link></li>
          <li><Link to="/rts">Réponses Types</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;