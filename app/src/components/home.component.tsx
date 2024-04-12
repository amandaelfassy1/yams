import React, { useState, useEffect } from 'react';
import axios from 'axios';
import IWin from '../types/win.types';

const DiceGame: React.FC = () => {
  const [dice, setDice] = useState<number[]>([]);
  const [message, setMessage] = useState<string>('');
  const [wins, setWin] = useState<IWin[]>([])
  const token = localStorage.getItem('token');

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
      console.log(response.data)
    } catch (error) {
      console.error('Error rolling dice:', error);
    }
  };

  return (
    <div>
      <h1>Dice game</h1>
      <button onClick={rollDice}>Roll Dice</button>
      <div>
        <h2>Dice:</h2>
        <div>
          {dice && dice.map((value, index) => <DiceImage key={index} value={value}/>)}
        </div>
      </div>
      {message && <p>{message}</p>}
      {wins.length > 0 && wins.map((win, i)=> {
        return (
          <>
            <p>{win.name}</p>
            <img key={i} src={`/public/img/${win.image}`}/>
          </>
        );
      }
      )}
    </div>
  );
};

const DiceImage: React.FC<{ value: number }> = ({ value }) => {
  switch (value) {
    case 1:
      return <img src="../Dice-1.png" style={{ width: '50px', height: '50px', marginRight: '10px' }} alt="Dice 1"/>;
    case 2:
      return <img src="../Dice-2.png" style={{ width: '50px', height: '50px', marginRight: '10px' }} alt="Dice 2"/>;
    case 3:
      return <img src="../Dice-3.png" style={{ width: '50px', height: '50px', marginRight: '10px' }} alt="Dice 3"/>;
    case 4:
      return <img src="../Dice-4.png" style={{ width: '50px', height: '50px', marginRight: '10px' }} alt="Dice 4"/>;
    case 5:
      return <img src="../Dice-5.png" style={{ width: '50px', height: '50px', marginRight: '10px' }} alt="Dice 5"/>;
    case 6:
      return <img src="../Dice-6.png" style={{ width: '50px', height: '50px', marginRight: '10px' }} alt="Dice 6"/>;
    default:
      return null;
  }
};

export default DiceGame;
