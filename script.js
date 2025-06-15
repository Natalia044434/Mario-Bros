const player = document.getElementById("player");
const coins = document.querySelectorAll(".coin");
const enemy = document.querySelector(".enemy");
const coinCounter = document.getElementById("coinCount");
const jumpSound = new Audio("assets/jump.wav");

let posX = 50;
let isJumping = false;
let coinsCollected = 0;

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") {
    posX += 10;
    if (posX > window.innerWidth - 60) posX = window.innerWidth - 60;
    player.style.left = posX + "px";
    checkCollisions();
  }
  if (e.key === "ArrowLeft") {
    posX -= 10;
    if (posX < 0) posX = 0;
    player.style.left = posX + "px";
    checkCollisions();
  }
  if ((e.key === " " || e.key === "ArrowUp") && !isJumping) {
    jumpSound.play();
    jump();
  }
});

function jump() {
  isJumping = true;
  let jumpHeight = 0;
  const upInterval = setInterval(() => {
    if (jumpHeight >= 100) {
      clearInterval(upInterval);
      const downInterval = setInterval(() => {
        if (jumpHeight <= 0) {
          clearInterval(downInterval);
          isJumping = false;
        } else {
          jumpHeight -= 5;
          player.style.bottom = 80 + jumpHeight + "px";
        }
      }, 20);
    } else {
      jumpHeight += 5;
      player.style.bottom = 80 + jumpHeight + "px";
    }
  }, 20);
}

function checkCollisions() {
  const playerRect = player.getBoundingClientRect();
  coins.forEach((coin) => {
    const coinRect = coin.getBoundingClientRect();
    if (
      coin.style.display !== "none" &&
      playerRect.left < coinRect.right &&
      playerRect.right > coinRect.left &&
      playerRect.top < coinRect.bottom &&
      playerRect.bottom > coinRect.top
    ) {
      coin.style.display = "none";
      coinsCollected += 1;
      coinCounter.textContent = coinsCollected;
    }
  });

  const enemyRect = enemy.getBoundingClientRect();
  if (
    playerRect.left < enemyRect.right &&
    playerRect.right > enemyRect.left &&
    playerRect.top < enemyRect.bottom &&
    playerRect.bottom > enemyRect.top
  ) {
    alert("¡Te atrapó el enemigo! Recargamos el juego.");
    location.reload();
  }
}
