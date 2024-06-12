const scores = {};

export const createScore = (uuid) => {
    scores[uuid] = []; // 초기 스테이지 배열 생성
};

export const getScore = (uuid) => {
  return scores[uuid];
};

export const setScore = (uuid, score, totalScore, timestamp) => {
  return scores[uuid].push({ score, totalScore, timestamp });
};

export const clearScore = (uuid) => {
  return (scores[uuid] = []);
};