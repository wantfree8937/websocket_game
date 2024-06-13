import Item from './Item.js';
import item_json from './assets/item.json' with { type: 'json' };
import item_unlock from './assets/item_unlock.json' with { type: 'json' };

class ItemController {
  INTERVAL_MIN = 0;
  INTERVAL_MAX = 12000;
  itemJson = item_json.data;
  itemUnlock = item_unlock.data;
  currentItemIndex = 0;
  currentUnlockIndex = 0;
  nextInterval = null;
  items = [];

  constructor(ctx, itemImages, scaleRatio, speed, stage) {
    this.ctx = ctx;
    this.canvas = ctx.canvas;
    this.itemImages = itemImages;
    this.scaleRatio = scaleRatio;
    this.speed = speed;
    this.stage = stage;

    this.setNextItemTime();
  }

  setNextItemTime() {
    this.nextInterval = this.getRandomNumber(this.INTERVAL_MIN, this.INTERVAL_MAX);
  }

  getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  createItem() {
    const currentStageId = this.stage.getStageId();
    if(currentStageId > this.itemUnlock[this.currentUnlockIndex].stage_id){
        this.currentUnlockIndex++;
        this.currentItemIndex++;
    }
    
    const index = this.getRandomNumber(0, this.currentItemIndex);
    const itemInfo = this.itemImages[index];
    const x = this.canvas.width * 1.5;
    const y = this.getRandomNumber(10, this.canvas.height - itemInfo.height);

    const item = new Item(
      this.ctx,
      itemInfo.id,
      x,
      y,
      itemInfo.width,
      itemInfo.height,
      itemInfo.image,
    );

    this.items.push(item);
  }

  update(gameSpeed, deltaTime) {
    if (this.nextInterval <= 0) {
      this.createItem();
      this.setNextItemTime();
    }

    this.nextInterval -= deltaTime;

    this.items.forEach((item) => {
      item.update(this.speed, gameSpeed, deltaTime, this.scaleRatio);
    });

    this.items = this.items.filter((item) => item.x > -item.width);
  }

  draw() {
    this.items.forEach((item) => item.draw());
  }

  collideWith(sprite) {
    const collidedItem = this.items.find((item) => item.collideWith(sprite));
    if (collidedItem) {
      this.ctx.clearRect(collidedItem.x, collidedItem.y, collidedItem.width, collidedItem.height);
      return {
        itemId: collidedItem.id,
      };
    }
  }

  reset() {
    this.items = [];
    this.scurrentItemIndex = 0;
    this.currentUnlockIndex = 0;
  }
}

export default ItemController;
