class Rocket {
  constructor(ctx, width, height, canvasSize) {
    this.ctx = ctx;
    this.rocketSize = { w: width, h: height };
    this.canvasSize = canvasSize;
    this.image = undefined;
    this.rocketPosition = {
      x: this.canvasSize.w / 2 - 50,
      y: this.canvasSize.h - 140,
    };
    this.moveLeft = false;
    this.moveRight = false;
    this.moveUp = false;
    this.moveDown = false;
    this.gravity= true
    this.image = new Image();
    this.image.src = `img/rocket.png`;
  }

  drawRocket() {
    //Primer parametro Image, posicion X, posicion Y, dimension coche W, dimension coche H
    this.ctx.drawImage(
      this.image,
      this.rocketPosition.x,
      this.rocketPosition.y,
      this.rocketSize.w,
      this.rocketSize.h
    );
    //console.log(this.ctx.drawImage(this.carImage, 20, 10, this.width, this.height));
  }

  move() {
            //Ternarios para moverse a los lados
    (this.rocketPosition.x <= this.canvasSize.w - 80 && this.moveRight)
      ? (this.rocketPosition.x += 2)
      : null;
    (this.rocketPosition.x >= 20 && this.moveLeft)
      ? (this.rocketPosition.x -= 2)
      : null;
            //Ternarios para moverse arriba y abajo
    (this.rocketPosition.y <= this.canvasSize.h - 90 && this.moveDown)
      ? (this.rocketPosition.y += 1)
      : null;
    (this.rocketPosition.y >= 30 && this.moveUp)
      ? (this.rocketPosition.y -= 3.5)
      : null;
    (this.rocketPosition.y<= this.canvasSize.h - 90 && !this.moveUp) 
    ? (this.rocketPosition.y +=1) : null;
  }
}
