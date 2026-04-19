// --- ЛОГИКА МОДАЛЬНОГО ОКНА ---
let currentProduct = "";

function openModal(name, price) {
    currentProduct = name;
    document.getElementById('modal-product-name').innerText = name + " — " + price;
    const modal = document.getElementById('lead-modal');
    modal.classList.remove('opacity-0', 'pointer-events-none');
}

function closeModal() {
    const modal = document.getElementById('lead-modal');
    modal.classList.add('opacity-0', 'pointer-events-none');
}

function submitModalLead() {
    const name = document.getElementById('modalName').value;
    const phone = document.getElementById('modalPhone').value;
    
    if (phone.length < 5) { alert("Введите номер телефона"); return; }
    
    const message = `⚡️ *БЫСТРЫЙ ЗАКАЗ ИЗ КАТАЛОГА*\n\n*Товар:* ${currentProduct}\n*Имя:* ${name}\n*Телефон:* ${phone}`;
    
    sendToTelegram(message, () => {
        alert("Спасибо! Мы свяжемся с вами для уточнения деталей.");
        closeModal();
    });
}

// --- ОБЩАЯ ОТПРАВКА ---
function sendToTelegram(message, onSuccess) {
    fetch('/api/send-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: message })
    }).then(r => {
        if (r.ok) {
            if (typeof ym !== 'undefined') { ym(2027115152, 'reachGoal', 'LEAD'); }
            onSuccess();
        } else {
            alert("Ошибка сервера. Попробуйте еще раз.");
        }
    });
}

// --- ЛОГИКА КВИЗА (КАСТОМ) ---
function enableNextBtn(stepIndex) {
    const btn = document.getElementById(`btn-next-${stepIndex}`);
    if (btn) {
        btn.disabled = false;
        btn.classList.remove('bg-stone-300', 'text-stone-500');
        btn.classList.add('bg-stone-900', 'text-white');
    }
}

function nextStep(step) {
    document.getElementById(`step-${step}`).classList.add('hidden');
    document.getElementById(`step-${step + 1}`).classList.remove('hidden');
    updateProgress(step + 1);
}

function updateProgress(step) {
    document.getElementById('step-counter').innerText = `Шаг ${step} из 4`;
}

function submitQuiz() {
    const name = document.getElementById('clientName').value;
    const phone = document.getElementById('clientPhone').value;
    
    const form = document.querySelector('input[name="form"]:checked')?.value || "-";
    const length = document.querySelector('input[name="length"]:checked')?.value || "-";
    const stove = document.querySelector('input[name="stove"]:checked')?.value || "-";

    const message = `🛠 *КАСТОМНЫЙ РАСЧЕТ (КВИЗ)*\n\n*Имя:* ${name}\n*Телефон:* ${phone}\n*Модель:* ${form}\n*Размер:* ${length}\n*Печь:* ${stove}`;
    
    sendToTelegram(message, () => {
        document.getElementById('step-4').classList.add('hidden');
        document.getElementById('step-success').classList.remove('hidden');
    });
}
