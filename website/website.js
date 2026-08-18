const cursor = document.getElementById('cursor');
const cursorText = document.getElementById('cursor-text');
const interactiveCards = document.querySelectorAll('.interactive-hover');

// Modal Elements
const modal = document.getElementById('cert-modal');
const modalImg = document.getElementById('modal-img');
const modalTitle = document.getElementById('modal-title');
const modalIssuer = document.getElementById('modal-issuer');
const closeModalBtn = document.getElementById('close-modal');

let mouseX = -100;
let mouseY = -100;
let cursorX = -100;
let cursorY = -100;

window.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animate() {
  cursorX += (mouseX - cursorX) * 0.15;
  cursorY += (mouseY - cursorY) * 0.15;

  cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`;

  requestAnimationFrame(animate);
}
animate();

// Cursor Hover Interactions
interactiveCards.forEach((item) => {
  item.addEventListener('mouseenter', () => {
    cursor.style.width = '90px';
    cursor.style.height = '90px';
    cursor.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
    cursorText.classList.remove('hidden');
  });

  item.addEventListener('mouseleave', () => {
    cursor.style.width = '20px';
    cursor.style.height = '20px';
    cursor.style.backgroundColor = 'transparent';
    cursorText.classList.add('hidden');
  });

  // Open Modal on Certificate Click
  item.addEventListener('click', () => {
    const title = item.getAttribute('data-title');
    const issuer = item.getAttribute('data-issuer');
    const imgSrc = item.getAttribute('data-img');

    modalTitle.textContent = title;
    modalIssuer.textContent = issuer;
    modalImg.src = imgSrc;

    modal.classList.remove('hidden');
    modal.classList.add('flex');
  });
});

// Close Modal
const closeModal = () => {
  modal.classList.add('hidden');
  modal.classList.remove('flex');
};

closeModalBtn.addEventListener('click', closeModal);
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});