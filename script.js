/* =========================================================
   Atelier Noir — Luxury Digital Experience
   Arquivo: script.js
   Função: header dinâmico, reveal on scroll, cursor customizado
   e efeito magnetic suave.
   ========================================================= */

// Elementos principais usados pelas interações da página.
const header = document.getElementById('siteHeader');
const reveals = document.querySelectorAll('.reveal');
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');
const magneticItems = document.querySelectorAll('.magnetic');

// Posições do mouse usadas para suavizar o cursor customizado.
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let followerX = mouseX;
let followerY = mouseY;
let cursorX = mouseX;
let cursorY = mouseY;

// Detecta telas touch e preferências de movimento.
const isTouch = window.matchMedia('(pointer: coarse)').matches;
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Aplica o fundo com blur no header após o início da rolagem.
function updateHeader() {
  if (!header) return;

  if (window.scrollY > 20) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}

// Revela elementos quando entram na área visível da tela.
function revealOnView() {
  const trigger = window.innerHeight * 0.9;

  reveals.forEach((element) => {
    const rect = element.getBoundingClientRect();

    if (rect.top < trigger) {
      element.classList.add('visible');
    }
  });
}

// Anima o cursor customizado com atraso suave para efeito premium.
function animateCursor() {
  if (isTouch || reduceMotion || !cursor || !follower) return;

  cursorX += (mouseX - cursorX) * 0.35;
  cursorY += (mouseY - cursorY) * 0.35;
  followerX += (mouseX - followerX) * 0.12;
  followerY += (mouseY - followerY) * 0.12;

  cursor.style.transform = `translate(${cursorX}px, ${cursorY}px) translate(-50%, -50%)`;
  follower.style.transform = `translate(${followerX}px, ${followerY}px) translate(-50%, -50%)`;

  requestAnimationFrame(animateCursor);
}

// Interações exclusivas para dispositivos com mouse/trackpad.
if (!isTouch && !reduceMotion) {
  window.addEventListener('mousemove', (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
  });

  document.addEventListener('mouseleave', () => {
    if (!cursor || !follower) return;

    cursor.style.opacity = '0';
    follower.style.opacity = '0';
  });

  document.addEventListener('mouseenter', () => {
    if (!cursor || !follower) return;

    cursor.style.opacity = '1';
    follower.style.opacity = '1';
  });

  magneticItems.forEach((item) => {
    item.addEventListener('mousemove', (event) => {
      const rect = item.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;

      item.style.transform = `translate(${x * 0.04}px, ${y * 0.04}px)`;
    });

    item.addEventListener('mouseleave', () => {
      item.style.transform = 'translate(0, 0)';
    });
  });

  animateCursor();
}

// Atualiza header e reveals durante o scroll.
window.addEventListener('scroll', () => {
  updateHeader();
  revealOnView();
}, { passive: true });

// Recalcula estados ao mudar o tamanho da tela.
window.addEventListener('resize', () => {
  updateHeader();
  revealOnView();
}, { passive: true });

// Estado inicial da interface ao carregar a página.
updateHeader();
revealOnView();
