const mario = document.getElementById("mario");
const jumpSound = new Audio("assets/jump.wav");

document.addEventListener("keydown", (e) => {
  if (e.code === "Space" || e.code === "ArrowUp") {
    if (!mario.classList.contains("jump")) {
      mario.classList.add("jump");
      jumpSound.play().catch(err => console.error(err));
      setTimeout(() => mario.classList.remove("jump"), 500);
    }
  }
});