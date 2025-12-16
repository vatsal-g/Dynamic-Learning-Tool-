// ==================== STAR BACKGROUND ====================
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
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${s.alpha})`;
        ctx.fill();
    });
    requestAnimationFrame(animateStars);
}

window.addEventListener('resize', initStars);
initStars();
animateStars();

// ==================== UPLOAD AREA ====================
const uploadArea = document.getElementById('upload-area');
const fileInput = document.getElementById('file-input');
const fileName = document.getElementById('file-name');
const uploadText = document.getElementById('upload-text');

function displayFile(file) {
    if (file) {
        fileName.textContent = file.name;
        uploadText.style.display = 'none';
    } else {
        fileName.textContent = '';
        uploadText.style.display = 'block';
    }
}

uploadArea.addEventListener('click', () => fileInput.click());

fileInput.addEventListener('change', () => {
    const file = fileInput.files[0];

    if (file && file.type !== "text/plain") {
        alert("Only .txt files are allowed");
        fileInput.value = "";
        displayFile(null);
        return;
    }

    displayFile(file);
});

uploadArea.addEventListener('dragover', e => {
    e.preventDefault();
    uploadArea.classList.add('dragover');
});

uploadArea.addEventListener('dragleave', () => {
    uploadArea.classList.remove('dragover');
});

uploadArea.addEventListener('drop', e => {
    e.preventDefault();
    uploadArea.classList.remove('dragover');

    const file = e.dataTransfer.files[0];
    if (file && file.type !== "text/plain") {
        alert("Only .txt files are allowed");
        return;
    }

    fileInput.files = e.dataTransfer.files;
    displayFile(file);
});

// ==================== ANALYZE BUTTON + AXIOS ====================
const analyzeBtn = document.getElementById('analyze-btn');
const loader = document.getElementById('loader');
const result = document.getElementById('result');
const resultText = document.getElementById('result-text');
const refineBtn = document.getElementById('refine-btn');
const topicText = document.getElementById('topic-text');

analyzeBtn.addEventListener('click', async () => {
    if (!topicText.value && !fileInput.files.length) {
        alert("Please enter a topic or upload a .txt file!");
        return;
    }

    loader.classList.remove('hidden');
    result.classList.add('hidden');

    const formData = new FormData();

    if (fileInput.files.length) {
        formData.append("file", fileInput.files[0]);
    }

    if (topicText.value) {
        formData.append("topic", topicText.value);
    }

    try {
        const response = await axios.post(
            "http://localhost:5000/analyze",
            formData,
            { headers: { "Content-Type": "multipart/form-data" } }
        );

        const questions = response.data.questions;

        if (!questions || questions.length === 0) {
            resultText.textContent = "No questions returned.";
        } else {
            let html = "<ol>";
            questions.forEach(q => {
                html += `<li>${q}</li>`;
            });
            html += "</ol>";
            resultText.innerHTML = html;
        }

        result.classList.remove('hidden');

    } catch (error) {
        console.error(error);
        resultText.textContent = "Something went wrong while analyzing.";
        result.classList.remove('hidden');
    } finally {
        loader.classList.add('hidden');
    }
});

// ==================== REFINE BUTTON ====================
refineBtn.addEventListener('click', () => {
    resultText.innerHTML += "<p><em>Refined explanation generated.</em></p>";
});

// ==================== ENTER KEY SUBMIT ====================
topicText.addEventListener('keydown', (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        analyzeBtn.click();
    }
});
