window.onload = () => {
  const placeHolderImage = document.getElementById("placeHolderImg");
  placeHolderImage.style.display = "initial";
  const gameMenu = document.getElementById("gameMenu");
  

  document.getElementById("start-button").onclick = () => {
    const canvas = document.querySelector("#canvas");
    const endGame = document.getElementById("endScreen");
    const scoreEndGame = document.getElementById("score");
    const restartButton = document.getElementById("restartButton");
    const audio = document.getElementById("backgroundMusic");
    const audio2 = document.getElementById("startingSound");

    placeHolderImage.style.display = "none";
    gameMenu.style.display = "none";

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
