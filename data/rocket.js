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
      this.image = new Image();
      this.image.src = `../img/rocket.png`;
    }
  
    drawRocket() {
      //Primer parametro Image, posicion X, posicion Y, dimension cohete W, dimension cohete H
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
      //Esto esta hecho con ternarios, lo que va entre () es la condición, luego los ? sería lo que ha de hacer si pasa la condición y los : lo que si NO la pasa.
      //https://ed.team/comunidad/operador-ternario-vs-if-else-73308b2f-d3aa-46b6-a612-e1fdbaa590b5
      (this.rocketPosition.x <= this.canvasSize.w -50  && this.moveRight) ||
      (this.rocketPosition.x <= this.canvasSize.w -50  && this.moveRightGamer)
        ? (this.rocketPosition.x += 4)
        : null;
      (this.rocketPosition.x >= 10 && this.moveLeft) ||
      (this.rocketPosition.x >= 10 && this.moveLeftGamer)
        ? (this.rocketPosition.x -= 4)
        : null;
  
      //testing with up and down arrows
      (this.rocketPosition.y <= this.canvasSize.h - 50 && this.moveDown) ||
      (this.rocketPosition.y <= this.canvasSize.h - 50 && this.moveDownGamer)
        ? (this.rocketPosition.y += 4)
        : null;
      (this.rocketPosition.y >= 10 && this.moveUp) ||
      (this.rocketPosition.y >= 10 && this.moveUpGamer)
        ? (this.rocketPosition.y -= 4)
        : null;
    }
}