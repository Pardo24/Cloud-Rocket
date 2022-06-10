const img = new Image();
 img.src = '../img/background.png';

let canvas, ctx, mainCanvas, mainCtx;

img.onload = function() {
  // Create background canvas
  backgroundCanvas = document.getElementById('background-canvas');
  ctx = backgroundCanvas.getContext('2d');
  
  // Create main canvas
  mainCanvas = document.getElementById('main-canvas');
  mainCtx = mainCanvas.getContext('2d');
  
  // start calling updateCanvas once the image is loaded
  updateBackgroundCanvas()
};

const backgroundImage = {
  img: img,
  x:0,
  y:0,
  speed: 0.2,

  move: function() {
    this.y += this.speed;
    this.y %= backgroundCanvas.height;
  },

  draw: function() {
    ctx.drawImage(this.img, 0, this.y);
    if (this.speed < 0) {
      ctx.drawImage(this.img, 0, this.y + this.img.height);
    } else {
      ctx.drawImage(this.img, 0, this.y - backgroundCanvas.height);
    }
  },
};

function renderMainCanvas() {
  mainCtx.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
  mainCtx.fillStyle = "black";
  mainCtx.font = "50px monospace";
  mainCtx.fillText('Rocket Launch', 100, 200);
}

function updateBackgroundCanvas() {
  backgroundImage.move();
  renderMainCanvas();
  ctx.clearRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);
  backgroundImage.draw();
  
  requestAnimationFrame(updateBackgroundCanvas);
}