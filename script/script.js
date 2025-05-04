// Scroll Animation
const sections = document.querySelectorAll('.scroll-section');

function checkInView() {
  const triggerBottom = window.innerHeight * 0.85;
  sections.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;
    if (sectionTop < triggerBottom) {
      section.classList.add('in-view');
    } else {
      section.classList.remove('in-view'); // so it re-animates
    }
  });
}

window.addEventListener('scroll', checkInView);
window.addEventListener('load', checkInView);

// Floating Doodles (Hearts, Stars, etc.)
function createDoodle() {
  const doodle = document.createElement('div');
  doodle.className = 'doodle';
  doodle.textContent = ['💖', '✨', '🎈', '🌸', '💕'][Math.floor(Math.random() * 5)];
  doodle.style.left = Math.random() * 100 + 'vw';
  doodle.style.top = Math.random() * 100 + 'vh';
  doodle.style.fontSize = (Math.random() * 24 + 16) + 'px';
  document.body.appendChild(doodle);

  setTimeout(() => doodle.remove(), 10000);
}

setInterval(createDoodle, 2500);

// Confetti Canvas
const canvas = document.getElementById('confetti-canvas');
const ctx = canvas.getContext('2d');
let width = (canvas.width = window.innerWidth);
let height = (canvas.height = window.innerHeight);
let confetti = [];

function random(min, max) {
  return Math.random() * (max - min) + min;
}

function ConfettiPiece() {
  this.x = random(0, width);
  this.y = random(0, height);
  this.radius = random(2, 6);
  this.color = `hsl(${random(0, 360)}, 100%, 70%)`;
  this.vx = random(-2, 2);
  this.vy = random(1, 4);
}

ConfettiPiece.prototype.draw = function () {
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
  ctx.fillStyle = this.color;
  ctx.fill();
};

ConfettiPiece.prototype.update = function () {
  this.x += this.vx;
  this.y += this.vy;
  if (this.y > height) {
    this.x = random(0, width);
    this.y = -10;
  }
};

function initConfetti() {
  confetti = [];
  for (let i = 0; i < 150; i++) {
    confetti.push(new ConfettiPiece());
  }
}

function animateConfetti() {
  ctx.clearRect(0, 0, width, height);
  confetti.forEach(c => {
    c.update();
    c.draw();
  });
  requestAnimationFrame(animateConfetti);
}

window.addEventListener('resize', () => {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
  initConfetti();
});

initConfetti();
animateConfetti();
