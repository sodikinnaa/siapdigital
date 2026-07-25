// Dynamic JavaScript logic for LocalDev course interactions

function initApp() {
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

    // 3. Course Catalog Filtering & Search
    const filterPills = document.querySelectorAll('.filter-pill');
    const courseCards = document.querySelectorAll('.course-card-main');
    const searchInput = document.getElementById('course-search');

    function filterCourses() {
        const activeCategory = document.querySelector('.filter-pill.active')?.getAttribute('data-category') || 'all';
        const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : '';

        courseCards.forEach(card => {
            const category = card.getAttribute('data-category');
            const title = card.querySelector('.course-title')?.textContent.toLowerCase() || '';
            const desc = card.querySelector('.course-desc')?.textContent.toLowerCase() || '';

            const matchesCategory = (activeCategory === 'all' || category === activeCategory);
            const matchesSearch = title.includes(searchTerm) || desc.includes(searchTerm);

            if (matchesCategory && matchesSearch) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    }

    filterPills.forEach(pill => {
        pill.addEventListener('click', () => {
            filterPills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            filterCourses();
        });
    });

    if (searchInput) {
        searchInput.addEventListener('input', filterCourses);
    }

    // 4. Initialize Quiz & Simulator
    renderQuiz();
    if (document.getElementById('sim-result-card')) {
        runSimulation();
        
        // Auto-update simulator on control changes
        const simInputs = ['sim-bind', 'sim-port', 'sim-device', 'sim-guess'];
        simInputs.forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                el.addEventListener('change', runSimulation);
                el.addEventListener('input', runSimulation);
            }
        });
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}

// Interactive Simulator Logic with Prediction / Guessing Game
function runSimulation() {
    const bindEl = document.getElementById('sim-bind');
    const portEl = document.getElementById('sim-port');
    const deviceEl = document.getElementById('sim-device');
    const guessEl = document.getElementById('sim-guess');

    if (!bindEl || !portEl || !deviceEl || !guessEl) return;

    const bindVal = bindEl.value;
    const portVal = portEl.value;
    const deviceVal = deviceEl.value;
    const guessVal = guessEl.value;

    const resultCard = document.getElementById('sim-result-card');
    const iconEl = document.getElementById('sim-icon');
    const titleEl = document.getElementById('sim-status-title');
    const descEl = document.getElementById('sim-status-desc');
    const flowLine = document.getElementById('flow-line');
    const guessFeedback = document.getElementById('sim-guess-feedback');
    const nodeDevice = document.getElementById('node-device');
    const nodeServer = document.getElementById('node-server');

    if (!resultCard || !iconEl || !titleEl || !descEl || !flowLine) return;

    // Reset Classes
    resultCard.className = "sim-status-card";

    let actualOutcome = "";
    let statusTitle = "";
    let statusDesc = "";
    let statusIcon = "";
    let flowText = "";
    let flowColor = "";

    // 1. Check Port Conflict (Server level failure)
    if (portVal === "3000") {
        actualOutcome = "conflict";
        statusIcon = "💥";
        statusTitle = "ERROR PORT BENTROK (Address Already in Use!)";
        statusDesc = `Server di laptop gagal dinyalakan karena Port 3000 sudah terpakai oleh aplikasi lain (seperti Node.js). Ubah port server ke Port 8000!`;
        flowText = "------ X (SERVER GAGAL: PORT 3000 BENTROK) ------>";
        flowColor = "#F59E0B";
    } 
    // 2. Localhost Access (Laptop itself)
    else if (deviceVal === "laptop-localhost") {
        actualOutcome = "success";
        statusIcon = "✅🎉";
        statusTitle = "Koneksi Berhasil (Akses Internal Laptop)";
        statusDesc = `Browser laptop berhasil membuka http://localhost:8000 karena diakses dari laptop itu sendiri (Loopback Interface).`;
        flowText = "====== (Localhost 127.0.0.1 OK) ======>";
        flowColor = "#10B981";
    } 
    // 3. HP with Cellular 4G/5G (Different Network)
    else if (deviceVal === "hp-cellular") {
        actualOutcome = "fail_net";
        statusIcon = "📡❌";
        statusTitle = "Koneksi Gagal (Beda Jaringan / Paket Data 4G)";
        statusDesc = `HP menggunakan Paket Data 4G/5G sehingga berada di jaringan luar internet dan terisolasi dari WiFi laptop. Hubungkan HP ke jaringan WiFi yang sama!`;
        flowText = "------ X (TERISOLASI: BEDA JARINGAN 4G) ------>";
        flowColor = "#EF4444";
    } 
    // 4. HP with Wrong IP Syntax (0.0.0.0 in HP Browser)
    else if (deviceVal === "hp-wifi-wrong-ip") {
        actualOutcome = "fail_net";
        statusIcon = "❓❌";
        statusTitle = "Koneksi Gagal (Salah Penulisan Alamat IP)";
        statusDesc = `Mengetik http://0.0.0.0:8000 di browser HP adalah kesalahan. IP 0.0.0.0 hanya untuk setting server laptop. Ketik IP Local laptopmu (seperti 192.168.1.15:8000) di HP!`;
        flowText = "------ X (SALAH TULIS IP 0.0.0.0 DI HP) ------>";
        flowColor = "#EF4444";
    } 
    // 5. HP with Correct WiFi Local IP (192.168.1.15)
    else if (deviceVal === "hp-wifi-correct") {
        if (bindVal === "127.0.0.1") {
            actualOutcome = "refused";
            statusIcon = "🔒❌";
            statusTitle = "Koneksi Ditolak! (Connection Refused)";
            statusDesc = `Server laptop dikunci hanya untuk internal laptop (Bind 127.0.0.1). Server menolak permintaan dari HP! Ubah Host Binding server ke 0.0.0.0 agar pintu terbuka untuk HP.`;
            flowText = "------ X (DIBLOKIR BINDING 127.0.0.1) ------>";
            flowColor = "#EF4444";
        } else {
            actualOutcome = "success";
            statusIcon = "🎉✅";
            statusTitle = "KONEKSI BERHASIL 100%!";
            statusDesc = `HP berhasil mengakses website di laptop! Semua syarat terpenuhi: 1 Jaringan WiFi, IP Local Benar (192.168.1.15:8000), & Server Bind ke 0.0.0.0!`;
            flowText = "====== (KONEKSI WIFI BERHASIL 100%) ======>";
            flowColor = "#10B981";
        }
    }

    // Check Guess correctness
    const isGuessCorrect = (guessVal === actualOutcome);

    if (guessFeedback) {
        if (isGuessCorrect) {
            guessFeedback.className = "guess-badge correct";
            guessFeedback.innerHTML = "🎯 <strong>TEBAKAN KAMU TEPAT SEKALI! 🎉</strong> Logika pemahaman jaringanmu sudah mantap!";
        } else {
            guessFeedback.className = "guess-badge wrong";
            guessFeedback.innerHTML = "❌ <strong>TEBAKAN KAMU KURANG TEPAT!</strong> Baca penjelasan analisis hasil di bawah ini untuk belajar!";
        }
    }

    // Update Visual Diagrams dynamically
    if (nodeDevice) {
        if (deviceVal === "laptop-localhost") {
            nodeDevice.innerHTML = "💻 Laptop (Browser Localhost)";
        } else if (deviceVal === "hp-cellular") {
            nodeDevice.innerHTML = "📱 HP Teman (Paket Data 4G/5G)";
        } else if (deviceVal === "hp-wifi-wrong-ip") {
            nodeDevice.innerHTML = "📱 HP Teman (Ketik 0.0.0.0)";
        } else {
            nodeDevice.innerHTML = "📱 HP Teman (WiFi 192.168.1.15)";
        }
    }

    if (nodeServer) {
        nodeServer.innerHTML = `💻 Laptop Server (${bindVal}:${portVal})`;
    }

    // Render outcome styling
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
