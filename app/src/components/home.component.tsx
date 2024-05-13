import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../public/assets/style.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import { clearUser, setUser } from '../reducers/store';

const DiceGame: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [dice, setDice] = useState<number[]>([]);
  const [message, setMessage] = useState<string>('');
  const token = localStorage.getItem('token');
  const [showButton, setShowButton] = useState<boolean>(false); 
  const user = useSelector((state: RootState)=> state.user)
  console.log(user.wins);
  
  
  useEffect(() => {
    setDice([1, 2, 1, 2, 1]); 
  }, []); 

  const rollDice = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/game/play', {
        headers:{
          'Authorization': `Bearer ${token}`
        }
      });
      console.log(response.data)
      setDice(response.data.dice); 
      setMessage(response.data.message);
      dispatch(setUser(response.data.user))
      if(response.data.message == "felicitations"){
        console.log(response.data.data)
      }
      if(response.data.message == "Toutes les pâtisseries sont épuisées. Le jeu est terminé."){
        setShowButton(true)
      }
      console.log(response.data)
    } catch (error) {
      console.error('Error rolling dice:', error);
    }
  };
  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(clearUser())
    navigate("/login");
  };
    return (
      <div className="dice-game-container">
        <h1>Yummy Yams !</h1>
        <button onClick={handleLogout}>Déconnexion</button>
        {user.wins.length == 0 &&  (
          <button onClick={rollDice}>Lancer les dés</button>
        )}
        <div className="dice-container">
          <div>
            {dice && dice.map((value, index) => <DiceImage key={index} value={value}/>)}
          </div>
        </div>
        {message && <p className="message">{message}</p>}
        {showButton && <Link to="/winners" className="btn btn-primary">Voir le tableau des scores</Link>} {/* Afficher le bouton uniquement si showButton est vrai */}
        {user.wins.length > 0 && (
          <div className="winning-details">
            {user.wins.map((win, i)=> (
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
