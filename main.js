const trails = document.querySelectorAll('.trail');
let positions = Array.from(trails).map(() => ({ x: 0, y: 0 }));
let mouse = { x: 0, y: 0 };

document.addEventListener('mousemove', e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

function animateTrails() {
  positions.forEach((pos, i) => {
    const target = i === 0 ? mouse : positions[i - 1];
    pos.x += (target.x - pos.x) * 0.2;
    pos.y += (target.y - pos.y) * 0.2;

    trails[i].style.transform = `translate(${pos.x - 10}px, ${pos.y - 10}px)`;
  });

  requestAnimationFrame(animateTrails);
}

animateTrails();
