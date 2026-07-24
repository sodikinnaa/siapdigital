// Dynamic JavaScript logic for LocalDev course interactions

document.addEventListener('DOMContentLoaded', () => {
    // 1. Module Switching Tabs
    const tabs = document.querySelectorAll('.tab-btn');
    const modules = document.querySelectorAll('.module-card');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            modules.forEach(m => m.classList.remove('active'));

            tab.classList.add('active');
            const targetId = tab.getAttribute('data-target');
            if (document.getElementById(targetId)) {
                document.getElementById(targetId).classList.add('active');
            }
        });
    });

    // 2. Initialize FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(q => {
        q.addEventListener('click', () => {
            const item = q.parentElement;
            item.classList.toggle('active');
        });
    });

    // 3. Initialize Quiz & Simulator
    renderQuiz();
    if (document.getElementById('sim-result-card')) {
        runSimulation();
    }
});

// Interactive Simulator Logic with Prediction / Guessing Game
function runSimulation() {
    const bindVal = document.getElementById('sim-bind').value;
    const portVal = document.getElementById('sim-port').value;
    const deviceVal = document.getElementById('sim-device').value;
    const guessVal = document.getElementById('sim-guess').value;

    const resultCard = document.getElementById('sim-result-card');
    const iconEl = document.getElementById('sim-icon');
    const titleEl = document.getElementById('sim-status-title');
    const descEl = document.getElementById('sim-status-desc');
    const flowLine = document.getElementById('flow-line');
    const guessFeedback = document.getElementById('sim-guess-feedback');

    // Reset Classes
    resultCard.className = "sim-status-card";

    let actualOutcome = "";
    let statusTitle = "";
    let statusDesc = "";
    let statusIcon = "";
    let flowText = "";
    let flowColor = "";

    // Calculate actual outcome
    if (portVal === "3000") {
        actualOutcome = "conflict";
        statusIcon = "💥";
        statusTitle = "ERROR: Port Already in Use!";
        statusDesc = "Server gagal dinyalakan karena Port 3000 sudah dipakai oleh aplikasi lain (seperti Node.js). Ganti ke Port 8000!";
        flowText = "------ X (BENTROK PORT) ------>";
        flowColor = "#EF4444";
    } else if (deviceVal === "laptop-localhost") {
        actualOutcome = "success";
        statusIcon = "✅";
        statusTitle = "Koneksi Berhasil (Internal Laptop)";
        statusDesc = "Browser laptop berhasil membuka http://localhost:8000 karena diakses dari komputer itu sendiri.";
        flowText = "====== (Localhost 127.0.0.1) ======>";
        flowColor = "#10B981";
    } else if (deviceVal === "hp-cellular") {
        actualOutcome = "fail_net";
        statusIcon = "📡❌";
        statusTitle = "Koneksi Gagal (Beda Jaringan/4G)";
        statusDesc = "HP menggunakan paket data cellular 4G/5G sehingga terisolasi dari router WiFi laptop. Hubungkan HP ke WiFi yang sama!";
        flowText = "------ X (BEDA JARINGAN) ------>";
        flowColor = "#EF4444";
    } else if (deviceVal === "hp-wifi-wrong-ip") {
        actualOutcome = "fail_net";
        statusIcon = "❓❌";
        statusTitle = "Koneksi Gagal (Salah Penulisan IP)";
        statusDesc = "Memasukkan http://0.0.0.0:8000 di browser HP adalah kesalahan. Ketiklah IP Local laptopmu (seperti 192.168.1.15) di HP!";
        flowText = "------ X (SALAH WRITING IP) ------>";
        flowColor = "#EF4444";
    } else if (deviceVal === "hp-wifi-correct") {
        if (bindVal === "127.0.0.1") {
            actualOutcome = "refused";
            statusIcon = "🔒❌";
            statusTitle = "Koneksi Ditolak! (Connection Refused)";
            statusDesc = "Server di laptop dikunci dengan binding 127.0.0.1 (Loopback). Server menolak tamu dari luar! Ubah binding ke 0.0.0.0 agar HP bisa masuk.";
            flowText = "------ X (DIBLOKIR BINDING) ------>";
            flowColor = "#EF4444";
        } else {
            actualOutcome = "success";
            statusIcon = "🎉✅";
            statusTitle = "KONEKSI BERHASIL 100%!";
            statusDesc = "HP berhasil membuka website di laptop! Syarat terpenuhi: 1 Jaringan WiFi, IP Local Benar (192.168.1.15:8000), dan Server Bind 0.0.0.0.";
            flowText = "====== (SUKSES KONEKSI WIFI) ======>";
            flowColor = "#10B981";
        }
    }

    // Check Guess correctness
    let isGuessCorrect = false;
    if (guessVal === actualOutcome) {
        isGuessCorrect = true;
    }

    if (guessFeedback) {
        if (isGuessCorrect) {
            guessFeedback.className = "guess-badge correct";
            guessFeedback.innerHTML = "🎯 <strong>TEBAKAN KAMU BENAR! 🎉</strong> Kamu sudah paham logika jaringannya!";
        } else {
            guessFeedback.className = "guess-badge wrong";
            guessFeedback.innerHTML = "❌ <strong>TEBAKAN KAMU KURANG TEPAT!</strong> Lihat penjelasan hasil di bawah ini untuk belajar!";
        }
    }

    // Render outcome
    if (actualOutcome === "success") {
        resultCard.classList.add("success");
    } else if (actualOutcome === "conflict") {
        resultCard.classList.add("warning");
    } else {
        resultCard.classList.add("error");
    }

    iconEl.innerText = statusIcon;
    titleEl.innerText = statusTitle;
    descEl.innerText = statusDesc;
    flowLine.innerText = flowText;
    flowLine.style.color = flowColor;
}

// Cheat Sheet Live Command Emulator (Zero-Code Execution)
function executeCheatCode(framework) {
    const termBox = document.getElementById(`term-output-${framework}`);
    if (!termBox) return;

    termBox.classList.remove('hidden');
    termBox.innerHTML = `<p class="cmd"><span class="prompt">$</span> Memproses perintah ${framework}...</p>`;

    setTimeout(() => {
        let outputHtml = "";
        if (framework === 'php') {
            outputHtml = `
                <p class="cmd"><span class="prompt">$</span> php artisan serve --host=0.0.0.0 --port=8000</p>
                <p class="output success">INFO Server running on [http://0.0.0.0:8000].</p>
                <p class="output highlight-net">➔ Press Ctrl+C to stop the server</p>
                <div class="sim-live-link">
                    <span class="status-indicator online"></span> Server PHP Berhasil Berjalan! 
                    <a href="http://localhost:8080/pertemuan-1/contoh-code/index.html" target="_blank" class="btn btn-primary btn-sm">Buka Output Web Live 🚀</a>
                </div>
            `;
        } else if (framework === 'node') {
            outputHtml = `
                <p class="cmd"><span class="prompt">$</span> npm run dev -- --host 0.0.0.0</p>
                <p class="output success">  VITE v5.0.0  ready in 240 ms</p>
                <p class="output info">  ➜  Local:   http://localhost:5173/</p>
                <p class="output highlight-net">  ➜  Network: http://192.168.1.15:5173/ (Bisa diakses dari HP! 🎉)</p>
                <div class="sim-live-link">
                    <span class="status-indicator online"></span> Server Node/Vite Berhasil Berjalan! 
                    <a href="http://localhost:8080/pertemuan-1/contoh-code/index.html" target="_blank" class="btn btn-primary btn-sm">Buka Output Web Live 🚀</a>
                </div>
            `;
        } else if (framework === 'python') {
            outputHtml = `
                <p class="cmd"><span class="prompt">$</span> python -m http.server 8000 --bind 0.0.0.0</p>
                <p class="output success">Serving HTTP on 0.0.0.0 port 8000 (http://0.0.0.0:8000/)...</p>
                <p class="output highlight-net">➔ Localhost: http://127.0.0.1:8000 | WiFi HP: http://192.168.1.15:8000</p>
                <div class="sim-live-link">
                    <span class="status-indicator online"></span> Server Python Berhasil Berjalan! 
                    <a href="http://localhost:8080/pertemuan-1/contoh-code/index.html" target="_blank" class="btn btn-primary btn-sm">Buka Output Web Live 🚀</a>
                </div>
            `;
        }
        termBox.innerHTML = outputHtml;
    }, 600);
}

// Copy Code Helper
function copyCode(button) {
    const codeBlock = button.previousElementSibling;
    const textToCopy = codeBlock.innerText;

    navigator.clipboard.writeText(textToCopy).then(() => {
        const originalText = button.innerText;
        button.innerText = 'Copied! ✓';
        button.style.background = '#10B981';
        setTimeout(() => {
            button.innerText = originalText;
            button.style.background = '';
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
}

// Framework Switcher
function switchLang(lang) {
    const buttons = document.querySelectorAll('.lang-btn');
    const cards = document.querySelectorAll('.lang-card');

    buttons.forEach(btn => btn.classList.remove('active'));
    cards.forEach(card => card.classList.remove('active'));

    event.target.classList.add('active');
    if (document.getElementById(`lang-${lang}`)) {
        document.getElementById(`lang-${lang}`).classList.add('active');
    }
}

// Troubleshooting Filter
function filterTrouble() {
    const query = document.getElementById('trouble-search').value.toLowerCase();
    const cards = document.querySelectorAll('#trouble-list .trouble-card');

    cards.forEach(card => {
        const text = card.innerText.toLowerCase();
        if (text.includes(query)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Interactive Checklist Progress
function updateChecklistProgress() {
    const checkboxes = document.querySelectorAll('.interactive-checklist input[type="checkbox"]');
    const total = checkboxes.length;
    let checkedCount = 0;

    checkboxes.forEach(cb => {
        if (cb.checked) checkedCount++;
    });

    const percentage = Math.round((checkedCount / total) * 100);
    document.getElementById('progress-fill').style.width = `${percentage}%`;
    document.getElementById('progress-text').innerText = `${checkedCount} / ${total} Langkah Selesai`;
}

// Quiz Data & Engine
const quizQuestions = [
    {
        question: "1. Jika kamu mengetik `localhost` di browser HP, di manakah aplikasi server itu dicari?",
        options: [
            "Di Server Google Cloud",
            "Di HP itu sendiri (bukan laptop)",
            "Di Router WiFi Rumah",
            "Di Internet Publik"
        ],
        answer: 1,
        explanation: "Localhost selalu merujuk pada perangkat tempat kamu mengetik alamat tersebut."
    },
    {
        question: "2. IP manakah yang disebut 'Loopback Address' (khusus internal laptop sendiri)?",
        options: [
            "192.168.1.1",
            "0.0.0.0",
            "127.0.0.1",
            "8.8.8.8"
        ],
        answer: 2,
        explanation: "127.0.0.1 adalah IP Loopback khusus untuk komunikasi internal laptop sendiri."
    },
    {
        question: "3. Agar aplikasi web buatanmu bisa dibuka dari HP via WiFi local, server harus di-bind ke IP apa?",
        options: [
            "127.0.0.1",
            "0.0.0.0",
            "255.255.255.0",
            "1.1.1.1"
        ],
        answer: 1,
        explanation: "Binding ke 0.0.0.0 memerintahkan server mendengarkan lalu lintas dari seluruh antarmuka jaringan termasuk WiFi."
    },
    {
        question: "4. Apa arti error 'Address already in use / Port in use'?",
        options: [
            "Laptop kamu tidak ada internet",
            "Kodingan HTML kamu salah sintaks",
            "Port tersebut sudah dipakai oleh aplikasi server lain",
            "Router WiFi kamu rusak"
        ],
        answer: 2,
        explanation: "Error tersebut menandakan nomor port yang ingin kamu gunakan sedang ditempati aplikasi lain."
    },
    {
        question: "5. Manakah format URL yang BENAR saat mengakses server laptop dari HP?",
        options: [
            "http://0.0.0.0:8000",
            "http://localhost:8000",
            "http://192.168.1.15:8000 (sesuai IP Local laptop)",
            "http://127.0.0.1:8000"
        ],
        answer: 2,
        explanation: "HP memerlukan IP Local Laptop dalam jaringan WiFi (seperti 192.168.x.x) beserta nomor portnya."
    }
];

let currentQuestion = 0;
let userScore = 0;

function renderQuiz() {
    const wrapper = document.getElementById('quiz-wrapper');
    if (!wrapper) return;

    if (currentQuestion >= quizQuestions.length) {
        showQuizResult();
        return;
    }

    const q = quizQuestions[currentQuestion];
    let html = `
        <div class="quiz-question-box">
            <span class="badge">Pertanyaan ${currentQuestion + 1} dari ${quizQuestions.length}</span>
            <h3 style="margin-bottom: 20px; font-size: 1.25rem;">${q.question}</h3>
            <div class="quiz-options">
    `;

    q.options.forEach((opt, idx) => {
        html += `
            <button class="quiz-option" onclick="submitAnswer(${idx})">${opt}</button>
        `;
    });

    html += `
            </div>
        </div>
    `;

    wrapper.innerHTML = html;
}

function submitAnswer(selectedIndex) {
    const q = quizQuestions[currentQuestion];
    const options = document.querySelectorAll('.quiz-option');

    options.forEach((optBtn, idx) => {
        optBtn.disabled = true;
        if (idx === q.answer) {
            optBtn.classList.add('correct');
        } else if (idx === selectedIndex) {
            optBtn.classList.add('wrong');
        }
    });

    if (selectedIndex === q.answer) {
        userScore++;
    }

    setTimeout(() => {
        currentQuestion++;
        renderQuiz();
    }, 1500);
}

function showQuizResult() {
    document.getElementById('quiz-wrapper').classList.add('hidden');
    const resultDiv = document.getElementById('quiz-result');
    resultDiv.classList.remove('hidden');

    document.getElementById('score-text').innerText = `${userScore} / ${quizQuestions.length}`;
    
    let feedback = "";
    if (userScore === 5) {
        feedback = "🏆 LUAR BIASA! Pemahamanmu sudah 100% matang!";
    } else if (userScore >= 3) {
        feedback = "👍 KEREN! Pemahamanmu sudah bagus. Coba baca ulang modul yang tadi masih ragu!";
    } else {
        feedback = "💪 Tetap semangat! Silakan baca kembali Modul 1-5 dan coba praktiknya di terminalmu!";
    }
    
    document.getElementById('feedback-text').innerText = feedback;
}

function resetQuiz() {
    currentQuestion = 0;
    userScore = 0;
    document.getElementById('quiz-result').classList.add('hidden');
    document.getElementById('quiz-wrapper').classList.remove('hidden');
    renderQuiz();
}
