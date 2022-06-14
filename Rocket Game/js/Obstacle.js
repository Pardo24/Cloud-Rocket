class obstacles {
  constructor(ctx, width, height, canvasSize, position, speed) {
    this.ctx = ctx;
    this.obstacleSize = { w: width, h: height };
    this.canvasSize = canvasSize;
    this.obstaclePosition = { x: position, y: -100 };
    this.randomImage = Math.trunc(Math.random() * (4) + 1);
    this.speed = speed;
    this.imageInstance = new Image();
    this.imageInstance.src = `img/nube/nube${this.randomImage}.png`;
  }

  draw() {
    this.ctx.drawImage(
      this.imageInstance,
      this.obstaclePosition.x,
      this.obstaclePosition.y,
      this.obstacleSize.w,
      this.obstacleSize.h
    );
    this.move();
  }

  move() {
    this.obstaclePosition.y += this.speed;
  }
}

