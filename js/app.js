const rocketApp = {
  ctx: undefined,
  canvasSize: { w: undefined, h: undefined },
  intervalId: undefined,
  framesCounter: 0,
  obstacles: [],
  powerUpArr: [],
  speed: 1.2,
  score: 0,
  y: 0,

  init(canvas, endgame, scoreEnd, buttonRestart, audio, audio2) {
    this.setContext(canvas);
    this.setCanvasDimensions(canvas);
    this.playStartingSound(audio2);
    this.imageBackground = new Image();
    this.imageBackground.src = "img/background.jpg";
    this.endgame = endgame;
    this.scoreEnd = scoreEnd;
    this.buttonRestart = buttonRestart;
    this.createNewRocket();


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

    if (this.framesCounter % 100 === 0) {
      this.createObstacle();
    }
    if (this.framesCounter % 2000===0){
      this.createPowerUp();
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
      this.obstacles[i].draw()
    }
    this.showScores();
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

  // createAnimal() {
  // 	//const randomWidth = Math.trunc(Math.random() * (300 - 100) + 100);
  // 	//const randomHeight = Math.trunc(Math.random() * (100 - 70) + 70);
  // 	const randomWidth = 80;
  // 	const randomHeight = 100;
  // 	const xRandomPosition = Math.trunc(Math.random() * (this.canvasSize.w - 100));

  // 	const newAnimal = new Animal(this.ctx, randomWidth, randomHeight, this.canvasSize, xRandomPosition, this.speed);

  // 	this.animals.push(newAnimal);
  // },

  drawBackground() {
    //this.ctx.drawImage(this.imageBackground, 0, 0, this.canvasSize.w, this.canvasSize.h);

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
    this.y += this.speed*0.8;
    this.y %= this.canvasSize.h;
  },

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h);
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

  powerUp(){
this.score+=2000
this.powerUpArr.pop();
this.obstacles.pop();
this.obstacles.pop();
this.obstacles.pop();
},

  stopGame() {
    window.cancelAnimationFrame(this.intervalId);
    this.endgame.style.display = "initial";
    this.scoreEnd.innerHTML = this.score;

    //Hacer un refresh
    this.buttonRestart.setAttribute("onclick", "window.location.reload()");
    //llamamos a parar el audio
    this.audioPause()
    //Limpiamos el score ya que lo mostramos por pantalla al finalizar
    this.stopScore();
  },
};
