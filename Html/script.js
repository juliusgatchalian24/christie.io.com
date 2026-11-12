const yesBtn = document.getElementById('yesBtn');
const thinkBtn = document.getElementById('thinkBtn');
const modal = document.getElementById('yesModal');
const closeModal = document.getElementById('closeModal');
const celebrateBtn = document.getElementById('celebrateBtn');
const toast = document.getElementById('toast');

function makeHearts(count = 28) {
  for (let i = 0; i < count; i++) {
    const heart = document.createElement('span');
    heart.className = 'floating-heart';
    heart.textContent = Math.random() > .25 ? '♥' : '✦';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.bottom = '-30px';
    heart.style.fontSize = (12 + Math.random() * 25) + 'px';
    heart.style.animationDelay = (Math.random() * .9) + 's';
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 4000);
  }
}
yesBtn.addEventListener('click', () => {
  modal.classList.add('show');
  makeHearts(38);
});
closeModal.addEventListener('click', () => modal.classList.remove('show'));
celebrateBtn.addEventListener('click', () => {
  makeHearts(65);
  modal.classList.remove('show');
});
modal.addEventListener('click', (event) => {
  if (event.target === modal) modal.classList.remove('show');
});
thinkBtn.addEventListener('click', () => {
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
});

// Gentle twinkling stars in the background.
const canvas = document.getElementById('sparkles');
const ctx = canvas.getContext('2d');
let stars = [];
function resizeCanvas() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = innerWidth * dpr;
  canvas.height = innerHeight * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  stars = Array.from({ length: Math.min(90, Math.floor(innerWidth / 12)) }, () => ({
    x: Math.random() * innerWidth, y: Math.random() * innerHeight,
    r: Math.random() * 1.4 + .25, a: Math.random(), speed: Math.random() * .012 + .003
  }));
}
function drawStars() {
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  for (const s of stars) {
    s.a += s.speed;
    const alpha = .2 + (Math.sin(s.a) + 1) * .28;
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 218, 233, ${alpha})`;
    ctx.fill();
  }
  requestAnimationFrame(drawStars);
}
resizeCanvas();
drawStars();
window.addEventListener('resize', resizeCanvas);
