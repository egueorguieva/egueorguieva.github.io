const cursor = document.querySelector('.cursor');
let mouseX = 0, mouseY = 0;
let currentX = 0, currentY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateCursor() {
  currentX += (mouseX - currentX) * 0.1;
  currentY += (mouseY - currentY) * 0.1;
  cursor.style.transform = `translate(${currentX - 20}px, ${currentY - 20}px)`;
  requestAnimationFrame(animateCursor);
}

animateCursor();
