class powerUps {
    constructor(ctx, width, height, canvasSize, position, speed) {
      this.ctx = ctx;
      this.powerUpSize = { w: width, h: height };
      this.canvasSize = canvasSize;
      this.powerUpPosition = { x: position, y: -100 };
      this.speed = speed;
      this.imageInstance = new Image();
      this.imageInstance.src = "../img/powerUp.png";
    }
  
    draw() {
      this.ctx.drawImage(
        this.imageInstance,
        this.powerUpPosition.x,
        this.powerUpPosition.y,
        this.powerUpSize.w,
        this.powerUpSize.h
      );
      this.move();
    }
  
    move() {
      this.powerUpPosition.y += this.speed/1.5;
    }
  }
  