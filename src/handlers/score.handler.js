import { getScore, setScore } from '../models/score.model.js';

export const addScoreHandler = (userId, payload) => {
  const serverTime = Date.now();
  setScore(userId, payload.addScore, payload.totalScore, serverTime);
  
  return { status: 'get item' };
};
