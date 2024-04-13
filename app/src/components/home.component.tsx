import React, { useState, useEffect } from 'react';
import axios from 'axios';
import IWin from '../types/win.types';
import '../../public/assets/style.css';
import { Link } from 'react-router-dom';

const DiceGame: React.FC = () => {
  const [dice, setDice] = useState<number[]>([]);
  const [message, setMessage] = useState<string>('');
  const [wins, setWin] = useState<IWin[]>([])
  const token = localStorage.getItem('token');
  const [showButton, setShowButton] = useState<boolean>(false); // État pour afficher le bouton

  useEffect(() => {
    setDice([1, 2, 1, 2, 1]); // Mettre à jour les dés avec une valeur par défaut seulement au montage du composant
  }, []); 

  const rollDice = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/game/play', {
        headers:{
          'Authorization': `Bearer ${token}`
        }
      });
      setDice(response.data.dice); // Mettre à jour les dés avec les valeurs récupérées
      setMessage(response.data.message);
      if(response.data.message == "felicitations"){
        console.log(response.data.data)
        setWin(response.data.data.wins)
      }
      if(response.data.message == "Toutes les pâtisseries sont épuisées. Le jeu est terminé."){
        setShowButton(true)
      }
      console.log(response.data)
    } catch (error) {
      console.error('Error rolling dice:', error);
    }
  };

    return (
      <div className="dice-game-container">
        <h1>Yummy Yams !</h1>
        <button onClick={rollDice}>Lancer les dés</button>
        <div className="dice-container">
          <div>
            {dice && dice.map((value, index) => <DiceImage key={index} value={value}/>)}
          </div>
        </div>
        {message && <p className="message">{message}</p>}
        {showButton && <Link to="/winners" className="btn btn-primary">Voir le tableau des scores</Link>} {/* Afficher le bouton uniquement si showButton est vrai */}
        {wins.length > 0 && (
          <div className="winning-details">
            {wins.map((win, i)=> (
              <div key={i}>
                <p>{win.name}</p>
                <img src={`/public/img/${win.image}`} alt={win.name} className="winning-image" />
              </div>
            ))}
          </div>
        )}
      </div>
    );
};

const DiceImage: React.FC<{ value: number }> = ({ value }) => {
  switch (value) {
    case 1:
      return <img src="../Dice-1.png" className='dice-image'  alt="Dice 1"/>;
    case 2:
      return <img src="../Dice-2.png" className='dice-image'  alt="Dice 2"/>;
    case 3:
      return <img src="../Dice-3.png" className='dice-image'  alt="Dice 3"/>;
    case 4:
      return <img src="../Dice-4.png" className='dice-image'  alt="Dice 4"/>;
    case 5:
      return <img src="../Dice-5.png" className='dice-image' alt="Dice 5"/>;
    case 6:
      return <img src="../Dice-6.png" className='dice-image'  alt="Dice 6"/>;
    default:
      return null;
  }
};

export default DiceGame;
