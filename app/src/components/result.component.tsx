import { useState, useEffect } from 'react';
import axios from 'axios';
import '../../public/assets/style.css';

const ResultsPage = () => {
  const [wins, setWins] = useState<any[]>([]);

  useEffect(() => {
    const fetchWinnersData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3001/api/game/winners', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        console.log(response);
        setWins(response.data);
      } catch (error) {
        console.error('Error fetching winners data:', error);
      }
    };

    fetchWinnersData();
  }, []);

  return (
    <div className="results-container">
      <h1 className="results-title">Résultats du jeu</h1>
      <div>
        {wins.map((data, index) => (
          <div key={index} className="winner-card">
            <h2 className="winner-name">Gagnant : {data.username}</h2>
            <div className="winner-details">
              <p className="winner-text">Pâtisserie associée : {data.wins[0].name}</p>
              <p className="winner-text">Date et heure de la victoire : {new Date(data.wins[0].date).toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultsPage;
