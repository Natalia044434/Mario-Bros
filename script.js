const player = document.getElementById("player");
let posX = 50;
let isJumping = false;

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") {
    posX += 10;
    if (posX > window.innerWidth - 50) posX = window.innerWidth - 50;
    player.style.left = posX + "px";
  }
  if (e.key === "ArrowLeft") {
    posX -= 10;
    if (posX < 0) posX = 0;
    player.style.left = posX + "px";
  }
  if ((e.key === " " || e.key === "ArrowUp") && !isJumping) {
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
