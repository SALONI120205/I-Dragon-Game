let dragon = document.getElementById("dragon");
let obstacle = document.getElementById("obstacle");
let scoreEl = document.getElementById("score");
let highScoreEl = document.getElementById("highScore");
let gameOverScreen = document.getElementById("gameOver");

let score = 0;
let highScore = localStorage.getItem("highScore") || 0;
highScoreEl.innerText = highScore;

let gameRunning = true;

let bgMusic = new Audio("assets/music.mp3");
let gameOverSound = new Audio("assets/gameover.mp3");

bgMusic.loop = true;
bgMusic.volume = 0.4;

function jump() {
  if (!dragon.classList.contains("jump")) {

    if (bgMusic.paused) {
      bgMusic.play();
    }

    dragon.classList.add("jump");
    setTimeout(() => dragon.classList.remove("jump"), 600);
  }
}


document.addEventListener("keydown", (e) => {
  if (
    e.code === "Space" ||
    e.code === "ArrowUp" ||
    e.key === " "
  ) {
    jump();
  }
});

document.addEventListener("touchstart", jump);

function checkCollision() {
  if (!gameRunning) return;

  let dragonRect = dragon.getBoundingClientRect();
  let obstacleRect = obstacle.getBoundingClientRect();

  let padding = 25;   // adjust hitbox softness

  if (
    dragonRect.right - padding > obstacleRect.left &&
    dragonRect.left + padding < obstacleRect.right &&
    dragonRect.bottom - padding > obstacleRect.top
  ) {
    gameOver();
  }
}

function gameOver() {
  gameRunning = false;
  obstacle.style.animation = "none";
  gameOverScreen.style.display = "block";
  bgMusic.pause();
  gameOverSound.play();

  if (score > highScore) {
    localStorage.setItem("highScore", score);
  }
}

function restartGame() {
  score = 0;
  scoreEl.innerText = score;
  obstacle.style.animation = "move 2s linear infinite";
  gameOverScreen.style.display = "none";
  gameRunning = true;
  bgMusic.play();
}

setInterval(() => {
  if (gameRunning) {
    score++;
    scoreEl.innerText = score;

    if (score % 300 === 0) {
      let currentDuration = parseFloat(
        getComputedStyle(obstacle).animationDuration
      );
      if (currentDuration >1.2){
      obstacle.style.animationDuration = currentDuration - 0.1 + "s";
    }
  }
}

  checkCollision();
}, 100);