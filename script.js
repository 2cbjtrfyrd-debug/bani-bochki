let selectedFromCatalog = false;

function enableNextBtn(stepIndex) {
    const btn = document.getElementById(`btn-next-${stepIndex}`);
    if (btn) {
        btn.disabled = false;
        btn.classList.remove('bg-stone-300', 'text-stone-500');
        btn.classList.add('bg-stone-900', 'text-white', 'hover:bg-stone-800');
    }
}

// Выбор из каталога
function selectModel(model, size) {
    selectedFromCatalog = true;
    
    // Подставляем данные в скрытые радиокнопки
    const modelRadio = document.querySelector(`input[name="form"][value="${model}"]`);
    if(modelRadio) modelRadio.checked = true;
    
    const sizeRadio = document.querySelector(`input[name="length"][value="${size}"]`);
    if(sizeRadio) sizeRadio.checked = true;

    // Скрываем все шаги и показываем Шаг 3 (печь)
    document.querySelectorAll('.quiz-step').forEach(s => s.classList.add('opacity-0', 'pointer-events-none'));
    document.getElementById('step-3').classList.remove('opacity-0', 'pointer-events-none');
    
    // Скрываем кнопку "Назад" на 3 шаге, чтобы не вернулись к выбору модели
    document.getElementById('btn-back-3').style.display = 'none';
    
    updateProgress(3);
}

// Если нажали "Рассчитать" в шапке - сбрасываем квиз на начало
function resetQuiz() {
    selectedFromCatalog = false;
    document.querySelectorAll('.quiz-step').forEach(s => s.classList.add('opacity-0', 'pointer-events-none'));
    document.getElementById('step-1').classList.remove('opacity-0', 'pointer-events-none');
    document.getElementById('btn-back-3').style.display = 'block';
    updateProgress(1);
}

function handleModelChange(type) {
    const lengthOptions = document.querySelectorAll('.length-opt');
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

function nextStep(currentStep) {
    document.getElementById(`step-${currentStep}`).classList.add('opacity-0', 'pointer-events-none');
    const next = currentStep + 1;
    document.getElementById(`step-${next}`).classList.remove('opacity-0', 'pointer-events-none');
    updateProgress(next);
}

function prevStep(currentStep) {
    document.getElementById(`step-${currentStep}`).classList.add('opacity-0', 'pointer-events-none');
    const prev = currentStep - 1;
    document.getElementById(`step-${prev}`).classList.remove('opacity-0', 'pointer-events-none');
    updateProgress(prev);
}

function updateProgress(step) {
    document.getElementById('step-counter').innerText = `Шаг ${step} из 4`;
    document.getElementById('progress-bar').style.width = `${(step / 4) * 100}%`;
}

function submitQuiz() {
    const name = document.getElementById('clientName').value;
    const phone = document.getElementById('clientPhone').value;
    if (phone.length < 5) { alert("Введите номер телефона"); return; }
    
    const form = document.querySelector('input[name="form"]:checked')?.value || "-";
    const length = document.querySelector('input[name="length"]:checked')?.value || "-";
    const stove = document.querySelector('input[name="stove"]:checked')?.value || "-";
    
    const message = `🔥 *Новая заявка!*\n\n*Имя:* ${name}\n*Телефон:* ${phone}\n\n*Ответы:*\n🪵 Модель: ${form}\n📏 Размер: ${length}\n🔥 Печь: ${stove}`;
    
    fetch('/api/send-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: message })
    }).then(r => {
        if (r.ok) {
            // ФИКСИРУЕМ ЦЕЛЬ В ЯНДЕКС.МЕТРИКЕ
            if (typeof ym !== 'undefined') {
                ym(НОМЕР_СЧЕТЧИКА, 'reachGoal', 'LEAD');
            }
            document.getElementById('step-4').classList.add('opacity-0', 'pointer-events-none');
            document.getElementById('step-success').classList.remove('opacity-0', 'pointer-events-none');
            document.getElementById('step-counter').innerText = "Готово!";
        }
    });
}

function scrollCarousel(containerId, direction) {
    document.getElementById(containerId).scrollBy({ left: direction * 350, behavior: 'smooth' });
}

document.addEventListener("DOMContentLoaded", () => {
    const galleryContainer = document.getElementById('gallery-photos');
    if (galleryContainer) {
        let photosHTML = '';
        for (let i = 8; i <= 27; i++) {
            photosHTML += `
                <div class="snap-center shrink-0 w-[280px] h-[350px] md:w-[320px] md:h-[400px] rounded-2xl overflow-hidden shadow-md">
                    <img src="img/${i}_result.webp" class="w-full h-full object-cover">
                </div>
            `;
        }
        galleryContainer.innerHTML = photosHTML;
    }
});
