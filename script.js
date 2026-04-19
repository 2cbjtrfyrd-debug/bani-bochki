// --- ВАЛИДАЦИЯ ТЕЛЕФОНА ---
function isValidPhone(phone) {
    // Оставляем только цифры
    const digits = phone.replace(/\D/g, '');
    // Проверяем, что цифр от 10 до 15 (хватит для любых номеров)
    return digits.length >= 10 && digits.length <= 15;
}

// --- ЛОГИКА МОДАЛЬНОГО ОКНА (КАТАЛОГ) ---
let currentProduct = "";

function openModal(name, price) {
    currentProduct = name + " (" + price + ")";
    document.getElementById('modal-product-name').innerText = currentProduct;
    document.getElementById('lead-modal').classList.remove('opacity-0', 'pointer-events-none');
}

function closeModal() {
    document.getElementById('lead-modal').classList.add('opacity-0', 'pointer-events-none');
    // Сбрасываем форму через 300мс (пока модалка плавно исчезает)
    setTimeout(() => {
        document.getElementById('modal-form-content').classList.remove('hidden');
        document.getElementById('modal-success-content').classList.add('hidden');
        document.getElementById('modalName').value = '';
        document.getElementById('modalPhone').value = '';
    }, 300);
}

function submitModalLead() {
    const name = document.getElementById('modalName').value;
    const phone = document.getElementById('modalPhone').value;
    
    if (!isValidPhone(phone)) { 
        alert("Пожалуйста, введите корректный номер телефона (минимум 10 цифр)"); 
        return; 
    }
    
    const message = `⚡️ *БЫСТРЫЙ ЗАКАЗ*\n\n*Баня:* ${currentProduct}\n*Имя:* ${name}\n*Телефон:* ${phone}`;
    
    sendToTelegram(message, () => {
        // Прячем форму, показываем галочку успеха
        document.getElementById('modal-form-content').classList.add('hidden');
        document.getElementById('modal-success-content').classList.remove('hidden');
    });
}


// --- ЛОГИКА КВИЗА ---
function handleModelChange(type) {
    const lengthOptions = document.querySelectorAll('.length-opt');
    const lengthRadios = document.querySelectorAll('input[name="length"]');
    
    // Сбрасываем выбор размера при смене типа бани
    lengthRadios.forEach(radio => radio.checked = false);
    document.getElementById('btn-next-2').disabled = true;
    document.getElementById('btn-next-2').classList.replace('bg-stone-900', 'bg-stone-300');

    lengthOptions.forEach(opt => {
        const size = parseFloat(opt.getAttribute('data-size'));
        const radio = opt.querySelector('input');

        if (type === 'side' && size < 4.5) {
            opt.classList.add('opacity-30', 'pointer-events-none', 'grayscale');
            radio.disabled = true;
        } else {
            opt.classList.remove('opacity-30', 'pointer-events-none', 'grayscale');
            radio.disabled = false;
        }
    });

    enableNextBtn(1);
}

function enableNextBtn(step) {
    const btn = document.getElementById(`btn-next-${step}`);
    btn.disabled = false;
    btn.classList.remove('bg-stone-300', 'text-stone-500');
    btn.classList.add('bg-stone-900', 'text-white');
}

function nextStep(step) {
    document.getElementById(`step-${step}`).classList.add('hidden');
    document.getElementById(`step-${step + 1}`).classList.remove('hidden');
    document.getElementById('step-counter').innerText = `Шаг ${step + 1} из 4`;
}

function prevStep(step) {
    document.getElementById(`step-${step}`).classList.add('hidden');
    document.getElementById(`step-${step - 1}`).classList.remove('hidden');
    document.getElementById('step-counter').innerText = `Шаг ${step - 1} из 4`;
}

function submitQuiz() {
    const name = document.getElementById('clientName').value;
    const phone = document.getElementById('clientPhone').value;
    
    if (!isValidPhone(phone)) { 
        alert("Пожалуйста, введите корректный номер телефона (минимум 10 цифр)"); 
        return; 
    }

    const form = document.querySelector('input[name="form"]:checked')?.value || "-";
    const length = document.querySelector('input[name="length"]:checked')?.value || "-";
    const stove = document.querySelector('input[name="stove"]:checked')?.value || "-";

    const message = `🛠 *ЗАЯВКА ИЗ КВИЗА*\n\n*Модель:* ${form}\n*Длина:* ${length}\n*Печь:* ${stove}\n*Имя:* ${name}\n*Телефон:* ${phone}`;
    
    sendToTelegram(message, () => {
        document.getElementById('step-4').classList.add('hidden');
        document.getElementById('step-success').classList.remove('hidden');
    });
}

// --- ОТПРАВКА В ТЕЛЕГРАМ (Vercel API) ---
function sendToTelegram(message, callback) {
    fetch('/api/send-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: message })
    }).then(r => { 
        if (r.ok) { 
            if (typeof ym !== 'undefined') { ym(2027115152, 'reachGoal', 'LEAD'); }
            callback(); 
        } else {
            alert("Ошибка отправки. Попробуйте еще раз.");
        }
    }).catch(() => alert("Ошибка сети."));
}

// --- КАРУСЕЛИ ---
function scrollCarousel(containerId, direction) {
    const container = document.getElementById(containerId);
    if(container) container.scrollBy({ left: direction * 350, behavior: 'smooth' });
}

// Генерация галереи (с 8 по 27)
document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById('gallery-photos');
    let html = '';
    for (let i = 8; i <= 27; i++) {
        html += `<div class="snap-center shrink-0 w-[280px] md:w-[320px] h-64 bg-stone-200 rounded-3xl overflow-hidden shadow-sm">
                    <img src="img/${i}_result.webp" class="w-full h-full object-cover">
                 </div>`;
    }
    if(container) container.innerHTML = html;
});
