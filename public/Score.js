import { sendEvent } from './Socket.js';
import stageJson from './assets/stage.json' with { type: "json" };
import itemJson from './assets/item.json' with { type: 'json' };

class Score {
  score = 0;
  HIGH_SCORE_KEY = 'highScore';
  stage = stageJson.data;
  itemJson = itemJson.data;
  totalScore = 0;
  currentStageIndex = 0;
  scorePerSecond = this.stage[this.currentStageIndex].scorePerSecond;

  constructor(ctx, scaleRatio) {
    this.ctx = ctx;
    this.canvas = ctx.canvas;
    this.scaleRatio = scaleRatio;
  }

  update(deltaTime) {
    this.scorePerSecond = this.stage[this.currentStageIndex].scorePerSecond;
    this.score += deltaTime * 0.001 * this.scorePerSecond;
    this.totalScore = this.score;

    if (this.score >= 600) {
      this.score = 600; 
      return;
    }

    // 스테이지 전환 확인
    if (this.currentStageIndex < this.stage.length - 1 && this.score >= this.stage[this.currentStageIndex + 1].score) {
      this.currentStageIndex++;
      this.scorePerSecond = this.stage[this.currentStageIndex].scorePerSecond;
      sendEvent(11, {
        currentStage: this.stage[this.currentStageIndex - 1].id,
        targetStage: this.stage[this.currentStageIndex].id,
        targetPerSecond: this.stage[this.currentStageIndex].scorePerSecond
      });
    }
  }

  getItem(itemId) {
    this.score += this.itemJson[itemId - 1].score;
    this.totalScore += this.itemJson[itemId - 1].score;

    
    if (this.score >= 600) {
      this.score = 600;
      return;
    }

    // 스테이지 전환 확인
    if (this.currentStageIndex < this.stage.length - 1 && this.score >= this.stage[this.currentStageIndex + 1].score) {
      this.currentStageIndex++;
      this.scorePerSecond = this.stage[this.currentStageIndex].scorePerSecond;
      sendEvent(11, {
        currentStage: this.stage[this.currentStageIndex - 1].id,
        targetStage: this.stage[this.currentStageIndex].id,
        targetPerSecond: this.stage[this.currentStageIndex].scorePerSecond
      });
    }

    sendEvent(12, {
      addScore: this.itemJson[itemId - 1].score,
      totalScore: this.totalScore
    });
  }

  isGameClear() {
    return this.score >= 600; // 600점 이상이면 게임 클리어
  }

  reset() {
    this.score = 0;
    this.currentStageIndex = 0;
    this.scorePerSecond = this.stage[this.currentStageIndex].scorePerSecond;
    this.totalScore = 0;
  }

  setHighScore() {
    const highScore = Number(localStorage.getItem(this.HIGH_SCORE_KEY));
    if (this.score > highScore) {
      localStorage.setItem(this.HIGH_SCORE_KEY, Math.floor(this.score));
    }
  }

  getScore() {
    return this.score;
  }

  getStageId() {
    return this.stage[this.currentStageIndex].id;
  }

  draw() {
    const highScore = Number(localStorage.getItem(this.HIGH_SCORE_KEY));
    const y = 20 * this.scaleRatio;

    const fontSize = 20 * this.scaleRatio;
    this.ctx.font = `${fontSize}px serif`;
    this.ctx.fillStyle = '#525250';

    const scoreX = this.canvas.width - 75 * this.scaleRatio;
    const highScoreX = scoreX - 125 * this.scaleRatio;
    const stageX = highScoreX - 250 * this.scaleRatio;

    const scorePadded = Math.floor(this.score).toString().padStart(6, 0);
    const highScorePadded = highScore.toString().padStart(6, 0);
    const stagePadded = (this.stage[this.currentStageIndex].id % 1000).toString().padStart(3, '0');

    this.ctx.fillText(`stage: ${stagePadded}`, stageX, y);
    this.ctx.fillText(scorePadded, scoreX, y);
    this.ctx.fillText(`HI ${highScorePadded}`, highScoreX, y);
  }
}

export default Score;
