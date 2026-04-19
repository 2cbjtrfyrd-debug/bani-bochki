let currentProduct = "";

function openModal(name, price) {
    currentProduct = name + " (" + price + ")";
    document.getElementById('modal-product-name').innerText = currentProduct;
    document.getElementById('lead-modal').classList.remove('opacity-0', 'pointer-events-none');
}

function closeModal() {
    document.getElementById('lead-modal').classList.add('opacity-0', 'pointer-events-none');
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

function submitModalLead() {
    const name = document.getElementById('modalName').value;
    const phone = document.getElementById('modalPhone').value;
    const message = `⚡️ *БЫСТРЫЙ ЗАКАЗ*\n\n*Баня:* ${currentProduct}\n*Имя:* ${name}\n*Телефон:* ${phone}`;
    sendToTelegram(message, () => { alert("Отправлено!"); closeModal(); });
}

function submitQuiz() {
    const name = document.getElementById('clientName').value;
    const phone = document.getElementById('clientPhone').value;
    const form = document.querySelector('input[name="form"]:checked')?.value || "-";
    const length = document.querySelector('input[name="length"]:checked')?.value || "-";
    const stove = document.querySelector('input[name="stove"]:checked')?.value || "-";

    const message = `🛠 *КВИЗ*\n\n*Модель:* ${form}\n*Длина:* ${length}\n*Печь:* ${stove}\n*Имя:* ${name}\n*Телефон:* ${phone}`;
    sendToTelegram(message, () => {
        document.getElementById('step-4').classList.add('hidden');
        document.getElementById('step-success').classList.remove('hidden');
    });
}

function sendToTelegram(message, callback) {
    fetch('/api/send-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: message })
    }).then(r => { 
        if (r.ok) { ym(2027115152, 'reachGoal', 'LEAD'); callback(); }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById('gallery-photos');
    let html = '';
    for (let i = 8; i <= 27; i++) {
        html += `<div class="snap-center shrink-0 w-[280px] md:w-[320px] h-64 bg-stone-200 rounded-3xl overflow-hidden shadow-sm">
                    <img src="img/${i}_result.webp" class="w-full h-full object-cover">
                 </div>`;
    }
    container.innerHTML = html;
});
