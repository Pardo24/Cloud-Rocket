const rocketApp = {
  ctx: undefined,
  canvasSize: { w: undefined, h: undefined },
  intervalId: undefined,
  framesCounter: 0,
  obstacles: [],
  powerUpArr: [],
  speed: 0.6,
  score: 0,
  y: 0,
  level: 0,

  init(canvas, endgame, scoreEnd, endLvl, buttonRestart, audio, audio2, audio3) {
    this.setContext(canvas);
    this.setCanvasDimensions(canvas);
    this.playStartingSound(audio2);
    this.imageBackground = new Image();
    this.imageBackground.src = "img/background.jpg";
    this.endgame = endgame;
    this.scoreEnd = scoreEnd;
    this.endLvl = endLvl
    this.buttonRestart = buttonRestart;
    this.createNewRocket();
    this.audio3= audio3


    setTimeout(() => {
      this.playBackgroundSong(audio, audio2);
    }, 1500);

    //Que el coche se mueva
    this.setListeners();
    this.refreshScreen();
  },
  setContext(canvas) {
    this.ctx = canvas.getContext("2d");
    this.ctx.globalCompositeOperation = "source-over";
    this.ctx2 = canvas.getContext("2d");
    this.ctx2.globalCompositeOperation = "destination-out";
  },

  setCanvasDimensions(canvas) {
    this.canvasSize.w = 700;
    this.canvasSize.h = 700;
    canvas.setAttribute("width", this.canvasSize.w);
    canvas.setAttribute("height", this.canvasSize.h);
  },

  createNewRocket() {
    //creamos objeto rocket
    this.newRocket = new Rocket(this.ctx, 70, 100, this.canvasSize);
  },

  setListeners() {
    document.addEventListener("keydown", (e) => {
      e.key === "ArrowUp" ? (this.newRocket.moveUp = true) : null;
      e.key === "ArrowDown" ? (this.newRocket.moveDown = true) : null;
      e.key === "ArrowLeft" ? (this.newRocket.moveLeft = true) : null;
      e.key === "ArrowRight" ? (this.newRocket.moveRight = true) : null;
    });
   
    document.addEventListener("keyup", (e) => {
      e.key === "ArrowUp" ? (this.newRocket.moveUp = false) : null;
      e.key === "ArrowDown" ? (this.newRocket.moveDown = false) : null;
      e.key === "ArrowLeft" ? (this.newRocket.moveLeft = false) : null;
      e.key === "ArrowRight" ? (this.newRocket.moveRight = false) : null;
    });
  },

  //refrescamos screen
  refreshScreen() {
    this.intervalId = requestAnimationFrame(() => this.refreshScreen());

    this.checkIfCollision();
    this.clearCanvas();
    this.drawAll();


    //pintamos rocket moviendose
    this.newRocket.move();

    this.framesCounter++;
    
    if (this.level <= 3 && this.framesCounter % 100 === 0  ) {
      this.createObstacle();
    }

    else if(3<this.level && this.framesCounter % 60===0 ){
      this.createObstacle();
    }

    else if(5<this.level && this.framesCounter % 50===0 ){
      this.createObstacle();
    }

    if (this.framesCounter % 2000===0){
      this.speed+= 0.2;
      this.level+=1;
      this.createPowerUp();
      this.levelUp();
    }
  },

  playStartingSound(audio2) {
    //starting sound
    this.audio2 = audio2;
    this.audio2.src = "sounds/ignition.mp3";
    this.audio2.play();
  },

  playBackgroundSong(audio, audio2) {
    //background song
    this.audio = audio;
    this.audio.src = "sounds/antitaxi.mp3";
    this.audio.play();
  },

  audioPause() {
    this.audio = document.getElementById("backgroundMusic");
    this.audio2 = document.getElementById("startingSound");
    this.audio.pause();
    this.audio2.pause();
  },

  drawAll() {
    this.drawBackground();
    this.moveBackground();
    this.newRocket.drawRocket();
    this.powerUpArr.forEach((pow)=> pow.draw());

    for(let i = 0; i<this.obstacles.length; i++){
      this.obstacles[i].draw();
    }
    this.showScores();
    this.showLevel();

  },

  createObstacle() {
    //const randomWidth = Math.trunc(Math.random() * (300 - 100) + 100);
    //const randomHeight = Math.trunc(Math.random() * (100 - 70) + 70);
    const randomWidth = 90;
    const randomHeight = 80;
    const xRandomPosition = Math.trunc(
      Math.random() * (this.canvasSize.w - 100)
    );

    const newObstacle = new obstacles(
      this.ctx,
      randomWidth,
      randomHeight,
      this.canvasSize,
      xRandomPosition,
      this.speed
    );

    this.obstacles.push(newObstacle);
  },

  createPowerUp() {
    const Width = 50;
    const Height = 50;
    const RandomPosition = Math.trunc(
      Math.random() * (this.canvasSize.w - 50)
    );

    const newPowerUp = new powerUps(
      this.ctx,
      Width,
      Height,
      this.canvasSize,
      RandomPosition,
      this.speed
    );

    this.powerUpArr.push(newPowerUp);
  },

  drawBackground() {

    this.ctx.drawImage(
      this.imageBackground,
      0,
      this.y,
      this.canvasSize.w,
      this.canvasSize.h
    );

    if (this.speed < 0) {
      this.ctx.drawImage(
        this.imageBackground,
        0,
        this.y + this.canvasSize.h,
        this.canvasSize.w,
        this.canvasSize.h
      );
    } else {
      this.ctx.drawImage(
        this.imageBackground,
        0,
        this.y - this.canvasSize.h,
        this.canvasSize.w,
        this.canvasSize.h
      );
    }
  },

  moveBackground() {
    this.y += this.speed*0.7;
    this.y %= this.canvasSize.h;
  },

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h);
  },

  showLevel() {
    // show level
    this.ctx.font = "35px Verdana";
    this.ctx.fillStyle = "yellow";
    this.ctx.fillText("Level " + this.level, 550, 90);
  },

  showScores() {
    // show scores
    this.ctx.font = "35px Verdana";
    this.ctx.fillStyle = "white";
    this.ctx.fillText("Score: " + this.score++, 50, 90);
  },

  stopScore() {
    this.ctx.font = "0px Verdana";
    this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h);
    this.ctx.globalCompositeOperation = "destination-over";
  },

  checkIfCollision() {
    if (this.obstacles.length) {
      this.obstacles.forEach((elem) => {
        elem.draw();

        if (
          this.newRocket.rocketPosition.x <
            elem.obstaclePosition.x + elem.obstacleSize.w - 10 &&
          this.newRocket.rocketPosition.x + this.newRocket.rocketSize.w - 10 >
            elem.obstaclePosition.x &&
          this.newRocket.rocketPosition.y <
            elem.obstaclePosition.y + elem.obstacleSize.h - 10 &&
          this.newRocket.rocketSize.h - 10 + this.newRocket.rocketPosition.y >
            elem.obstaclePosition.y
        ) {
          this.stopGame();
        }
      });
    }
    if (this.powerUpArr.length) {
      this.powerUpArr.forEach((elem) => {
        elem.draw();

        if (
          this.newRocket.rocketPosition.x <
            elem.powerUpPosition.x + elem.powerUpSize.w - 10 &&
          this.newRocket.rocketPosition.x + this.newRocket.rocketSize.w - 10 >
            elem.powerUpPosition.x &&
          this.newRocket.rocketPosition.y <
            elem.powerUpPosition.y + elem.powerUpSize.h - 10 &&
          this.newRocket.rocketSize.h - 10 + this.newRocket.rocketPosition.y >
            elem.powerUpPosition.y
        ) {
         this.powerUp();
         
        }
      });
    }
  },
  playPowerUp(audio3) {
    this.audio3 = audio3;
    this.audio3.src = "../sounds/powerUp.mp3";
    this.audio3.play();
  },

  powerUp(){
this.score+=5000
this.powerUpArr.pop();
this.obstacles.pop();
this.obstacles.pop();
this.obstacles.pop();
this.playPowerUp(this.audio3);
},

  stopGame() {
    window.cancelAnimationFrame(this.intervalId);
    this.endgame.style.display = "initial";
    this.scoreEnd.innerHTML = this.score;
    this.endLvl.innerHTML = this.level

    //Hacer un refresh
    this.buttonRestart.setAttribute("onclick", "window.location.reload()");
    //llamamos a parar el audio
    this.audioPause()
    //Limpiamos el score ya que lo mostramos por pantalla al finalizar
    this.stopScore();
  },
};
