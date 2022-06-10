window.onload = () => {
    const placeHolderImage = document.getElementById("placeHolderImg");
    placeHolderImg.style.display = "initial";
  
    document.getElementById("start-button").onclick = () => {
      const canvas = document.querySelector("#canvas");
      const endGame = document.getElementById("endScreen");
      const scoreEndGame = document.getElementById("score");
      const restartButton = document.getElementById("restartButton");
      const audio = document.getElementById("backgroundMusic");
      const audio2 = document.getElementById("startingSound");
  
      placeHolderImg.style.display = "none";
  
      raceCarApp.init(
        canvas,
        endGame,
        scoreEndGame,
        restartButton,
        audio,
        audio2
      );
    };
  };