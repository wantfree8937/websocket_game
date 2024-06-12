// 스테이지 정보를 객체에 {key: uuid, value: array}의 형태로 uuid를 Key로 저장합니다.
// value:array 에는 stageId를 가진 객체가 들어갑니다.
const stages = {};

export const createStage = (uuid) => {
  stages[uuid] = []; // 초기 스테이지 배열 생성
};

export const getStage = (uuid) => {
  return stages[uuid];
};

// 기존에 stageId 만 저장하던 것에서
// stageId와 timestamp 2가지를 같이 저장
export const setStage = (uuid, id, scorePerSecond, timestamp) => {
  return stages[uuid].push({ id, scorePerSecond, timestamp });
};

export const clearStage = (uuid) => {
  return (stages[uuid] = []);
};
