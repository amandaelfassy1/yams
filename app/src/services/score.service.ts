// score.service.ts

import axios from 'axios';

class ScoreService {
  async getScore(): Promise<number> {
    try {
      const response = await axios.get<number>('/api/score'); // Endpoint pour récupérer le score
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch score: ' + error);
    }
  }

  async updateScore(score: number): Promise<void> {
    try {
      await axios.post('/api/score', { score }); // Endpoint pour mettre à jour le score
    } catch (error) {
      throw new Error('Failed to update score: ' + error);
    }
  }
}

export default new ScoreService();
