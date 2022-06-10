window.onload = () => {
    const placeHolderImg = document.getElementById("placeHolderImg");
    placeHolderImg.style.display = "initial";
  
    document.getElementById("start-btn").onclick = () => {
      const canvas = document.getElementById("main-canvas");
      const endGame = document.getElementById("endScreen");
      const scoreEndGame = document.getElementById("score");
      const restartButton = document.getElementById("restartButton");
      const audio = document.getElementById("backgroundMusic");
      const audio2 = document.getElementById("startingSound");
  
      placeHolderImg.style.display = "none";
  
      rocketApp.init(
        canvas,
        endGame,
        scoreEndGame,
        restartButton,
        audio,
        audio2
      );
    };
  };