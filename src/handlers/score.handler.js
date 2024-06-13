import { getScore, setScore } from '../models/score.model.js';
import { getStage, setStage } from '../models/stage.model.js';

export const addScoreHandler = (userId, payload) => {
  let currentStages = getStage(userId);
  const serverTime = Date.now();

  if (!currentStages.length) {
    return { status: 'fail', message: 'No stages found for user' };
  }
  
  currentStages.sort((a, b) => a.id - b.id);
  const currentStage = currentStages[currentStages.length - 1];
  console.log(currentStage.id);
  console.log(payload.itemId);

  if((currentStage.id % 1000) < payload.itemId){
    return { status: 'fail', message: 'item and Current stage mismatch' };
  }

  setScore(
    userId,
    payload.itemId,
    payload.addScore,
    payload.totalScore,
    payload.elapseScore,
    payload.diffScore,
    serverTime,
  );
  return { status: 'success' };
};
