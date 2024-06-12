import { moveStageHandler } from './stage.handler.js';
import { gameEnd, gameStart } from './game.handler.js';
import { addScoreHandler } from './score.handler.js'

const handlerMappings = {
  2: gameStart,
  3: gameEnd,
  11: moveStageHandler,
  12: addScoreHandler,
};

export default handlerMappings;
