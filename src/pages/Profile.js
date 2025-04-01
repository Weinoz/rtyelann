import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        const response = await axios.get('/api/users/profile', {
          headers: { Authorization: token }
        });
        setProfile(response.data);
      }
    };

    fetchProfile();
  }, []);

  if (!profile) {
    return <div className="container">Chargement...</div>;
  }

  return (
    <div className="container">
      <h1>Profil</h1>
      <p>Nom d'utilisateur: {profile.username}</p>
      <p>Email: {profile.email}</p>
      <p>Favoris: {profile.favorites.length}</p>
    </div>
  );
};

export default Profile;