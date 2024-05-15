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

  useEffect(() => {
    if (user.email == "" ){
      navigate('/register')
    }
    setDice([1, 2, 1, 2, 1]); 
    checkStock(); 
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
     
      if(response.data.message == "Toutes les pâtisseries sont épuisées. Le jeu est terminé."){
        setShowButton(true)
      }
    } catch (error) {
      console.error('Error rolling dice:', error);
    }
  };
  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(clearUser())
    navigate("/login");
  };
  const checkStock = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/game/check', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.data.message === "Toutes les pâtisseries sont épuisées. Le jeu est terminé.") {
        setShowButton(true);
      }
    } catch (error) {
      console.error('Error checking stock:', error);
    }
  };
  
    return (
      <div className="dice-game-container">
        <h1>Yummy Yams !</h1>
        {user.wins.length == 0 &&  (
          <button onClick={rollDice}>Lancer les dés</button>
        )}
        <div className="dice-container">
          <div>
            {dice && dice.map((value, index) => <DiceImage key={index} value={value}/>)}
          </div>
        </div>
        {message && <p className="message">{message}</p>}
        {showButton && <Link to="/winners" className="btn btn-primary mt-4">Voir le tableau des scores</Link>} {/* Afficher le bouton uniquement si showButton est vrai */}
        {user.wins.length > 0 && (
          <div className="winning-details">
            <h3 className='p-2'>Voici ce que vous avez gagné !</h3>
            <div  className='d-flex justify-content-center align-center'>
            {user.wins.map((win, i)=> (
                <div key={i}>
                  <img src={`/public/img/${win.image}`} alt={win.name} className="winning-image" />
                  <p className='mt-4'>{win.name}</p>
                </div>
            ))}
              </div>
          </div>
        )}
        <button className="btndisconnect" onClick={handleLogout}>Déconnexion</button>
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
