import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RTs = () => {
  const [rts, setRTs] = useState([]);

  useEffect(() => {
    const fetchRTs = async () => {
      const response = await axios.get('/api/rts');
      setRTs(response.data);
    };

    fetchRTs();
  }, []);

  const copyToClipboard = (content) => {
    navigator.clipboard.writeText(content);
    alert('RT copiée dans le presse-papiers');
  };

  return (
    <div className="container">
      <h1>Réponses Types (RT)</h1>
      {rts.map(rt => (
        <div key={rt._id}>
          <h2>{rt.title}</h2>
          <p>{rt.content}</p>
          <button onClick={() => copyToClipboard(rt.content)}>Copier</button>
        </div>
      ))}
    </div>
  );
};

export default RTs;