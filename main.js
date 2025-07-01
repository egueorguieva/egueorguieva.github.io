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
    const speed = 0.25 - i * 0.015; 
    pos.x += (target.x - pos.x) * speed;
    pos.y += (target.y - pos.y) * speed;

    trails[i].style.transform = `translate(${pos.x - 75}px, ${pos.y - 75}px)`; 
  });

  requestAnimationFrame(animateTrails);
}

animateTrails();
