// Star background using Canvas
const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');
let stars = [];

function initStars() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    stars = [];
    for (let i = 0; i < 150; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 1.2,
            alpha: Math.random(),
            delta: Math.random() * 0.02
        });
    }
}
function animateStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(s => {
        s.alpha += s.delta;
        if (s.alpha <= 0 || s.alpha >= 1) s.delta = -s.delta;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI*2);
        ctx.fillStyle = `rgba(255,255,255,${s.alpha})`;
        ctx.fill();
    });
    requestAnimationFrame(animateStars);
}
window.addEventListener('resize', initStars);
initStars();
animateStars();

// Modal logic
const startBtn = document.getElementById('start-btn');
const modal = document.getElementById('auth-modal');
const tabs = document.querySelectorAll('.tab');
const forms = document.querySelectorAll('.form');
const closeModalBtn = document.getElementById('close-modal');
const body = document.body;

// Open modal
startBtn.addEventListener('click', () => {
    modal.classList.add('show');
    body.classList.add('modal-active');
});

// Close modal
closeModalBtn.addEventListener('click', () => {
    modal.classList.remove('show');
    body.classList.remove('modal-active');
});

// Close modal by clicking outside modal content
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('show');
        body.classList.remove('modal-active');
    }
});

// Tab switching
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const target = tab.dataset.tab;
        forms.forEach(f => f.classList.remove('active'));
        document.getElementById(target === 'signin' ? 'signin-form' : 'signup-form').classList.add('active');
    });
});

// Fake submit
forms.forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        window.location.href = 'dashboard.html';
    });
});
// Upload logic
const uploadArea = document.getElementById('upload-area');
const fileInput = document.getElementById('file-input');
const fileName = document.getElementById('file-name');

function displayFile(file) {
    if (file) {
        fileName.textContent = file.name;
    } else {
        fileName.textContent = '';
    }
}

// Click to select
uploadArea.addEventListener('click', () => fileInput.click());

// File input change
fileInput.addEventListener('change', () => {
    const file = fileInput.files[0];
    displayFile(file);
});

// Drag over
uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.classList.add('dragover');
});
uploadArea.addEventListener('dragleave', () => {
    uploadArea.classList.remove('dragover');
});
uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.classList.remove('dragover');
    const file = e.dataTransfer.files[0];
    if (file) {
        fileInput.files = e.dataTransfer.files; // update the input element
        displayFile(file);
    }
});
