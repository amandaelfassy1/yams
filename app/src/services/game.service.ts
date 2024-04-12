import axios from 'axios';

export const playGame = async (attempts: number): Promise<{ dice: number[], winningCombination: string | null }> => {
  try {
    const response = await axios.post('http://localhost:3001/api/game/play', { attempts });
    return response.data;
  } catch (error) {
    throw new Error('Error playing game: ' + error);
  }
};
