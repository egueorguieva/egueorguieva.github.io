/* ============================================================
   SHARED JS — fairy lights, sparkle cursor, pixel cat, nav
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  createFairyLights();
  setActiveNav();
  initSparkle();
  initCat();
});

/* --- Fairy Lights ------------------------------------------ */
function createFairyLights() {
  const bar = document.getElementById('fairy-lights-bar');
  if (!bar) return;

  const W = bar.offsetWidth || window.innerWidth;
  const H = 36;
  const COLORS = ['#ff9eb5','#ff6b9d','#ffb347','#c084fc','#7ecac0','#ffe066','#a0d8ef','#ff9eb5'];
  const count = Math.max(10, Math.floor(W / 38));
  const step = W / (count - 1);

  // Build wire polyline points (alternating y for sag)
  const wireY = (i) => (i % 2 === 0 ? 6 : 13);
  let pts = '';
  for (let i = 0; i < count; i++) pts += `${(i * step).toFixed(1)},${wireY(i)} `;

  let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">`;
  svg += `<polyline points="${pts.trim()}" fill="none" stroke="#5a4070" stroke-width="1.5"/>`;

  for (let i = 0; i < count; i++) {
    const x = (i * step).toFixed(1);
    const y = wireY(i);
    const col = COLORS[i % COLORS.length];
    const fc = ['bulb-flicker','bulb-flicker2','bulb-flicker3','','',''][i % 6];

    // Connector cap
    svg += `<rect x="${x - 3}" y="${y}" width="6" height="3" fill="#6a5080" rx="1"/>`;
    // Bulb
    svg += `<rect x="${x - 4}" y="${y + 3}" width="8" height="11" rx="2" fill="${col}" class="${fc}"/>`;
    // Glow
    svg += `<ellipse cx="${x}" cy="${y + 14}" rx="7" ry="5" fill="${col}" opacity="0.25" class="${fc}"/>`;
  }
  svg += '</svg>';
  bar.innerHTML = svg;
}

/* --- Active nav ------------------------------------------- */
function setActiveNav() {
  const path = window.location.pathname;
  const slug = path.replace(/\.html$/, '').split('/').pop() || 'index';
  document.querySelectorAll('.pixel-nav a').forEach(a => {
    const href = a.getAttribute('href') || '';
    const page = href.replace(/\.html$/, '').split('/').pop() || 'index';
    if (page === slug || (slug === '' && page === 'index')) {
      a.classList.add('active');
    }
  });
}

/* --- Sparkle cursor trail ---------------------------------- */
function initSparkle() {
  const COLORS = ['#ff9eb5','#ff6b9d','#ffb347','#c084fc','#ffe066','#7ecac0'];
  const SIZES  = [3, 4, 5, 6, 7];
  let last = 0;

  document.addEventListener('mousemove', e => {
    const now = Date.now();
    if (now - last < 55) return;
    last = now;

    const p = document.createElement('div');
    p.className = 'sparkle-particle';
    const sz  = SIZES[Math.floor(Math.random() * SIZES.length)];
    const col = COLORS[Math.floor(Math.random() * COLORS.length)];
    p.style.cssText = `left:${e.clientX}px;top:${e.clientY}px;width:${sz}px;height:${sz}px;background:${col};border-radius:${Math.random()>.5?'50%':'0'};`;
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 500);
  });
}

/* --- Pixel Cat -------------------------------------------- */
function initCat() {
  const cat = document.getElementById('pixel-cat');
  if (!cat) return;

  cat.addEventListener('click', e => {
    const h = document.createElement('div');
    h.className = 'cat-heart';
    h.textContent = '♥';
    h.style.cssText = `left:${e.clientX - 9}px;top:${e.clientY - 9}px;`;
    document.body.appendChild(h);
    setTimeout(() => h.remove(), 1000);
  });

  // Wander only on home page
  const slug = window.location.pathname.replace(/\.html$/,'').split('/').pop() || 'index';
  if (slug !== 'index' && slug !== '') return;

  const SPOTS = [
    { left: '28px',  bottom: '22px'  },
    { left: '90px',  bottom: '100px' },
    { left: '220px', bottom: '70px'  },
    { left: '380px', bottom: '180px' },
    { left: '500px', bottom: '50px'  },
  ];

  function wander() {
    const s = SPOTS[Math.floor(Math.random() * SPOTS.length)];
    cat.style.left   = s.left;
    cat.style.bottom = s.bottom;
  }

  wander();
  (function tick() {
    setTimeout(() => { wander(); tick(); }, 8000 + Math.random() * 4000);
  })();
}

/* --- Photo carousel (index.html corkboard) ---------------- */
window.carouselState = { idx: 0 };
window.carouselNav = function(dir) {
  const slides = document.querySelectorAll('.car-slide');
  if (!slides.length) return;
  slides[window.carouselState.idx].classList.remove('active');
  window.carouselState.idx = (window.carouselState.idx + dir + slides.length) % slides.length;
  slides[window.carouselState.idx].classList.add('active');
};
