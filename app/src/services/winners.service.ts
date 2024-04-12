import axios from 'axios';
const token = localStorage.getItem('token');

// Fonction pour récupérer les données des gagnants depuis le back-end
export const getWinnersData = async () => {
  try {
    const response = await axios.get('http://localhost:3001/api/game/winners', {
        headers:{
          'Authorization': `Bearer ${token}`
        }
    });
    console.log(response);
    
  } catch (error) {
    console.error('Error fetching winners data:', error);
    return [];
}
};

