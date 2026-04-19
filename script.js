function enableNextBtn(stepIndex) {
    const btn = document.getElementById(`btn-next-${stepIndex}`);
    if (btn) {
        btn.disabled = false;
        btn.classList.remove('bg-stone-300', 'text-stone-500');
        btn.classList.add('bg-stone-900', 'text-white', 'hover:bg-stone-800');
    }
}

// Новая логика: блокировка размеров при выборе бокового входа
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

function nextStep(currentStep) {
    document.getElementById(`step-${currentStep}`).classList.add('opacity-0', 'pointer-events-none');
    const nextStepNum = currentStep + 1;
    document.getElementById(`step-${nextStepNum}`).classList.remove('opacity-0', 'pointer-events-none');
    updateProgress(nextStepNum);
}

function prevStep(currentStep) {
    document.getElementById(`step-${currentStep}`).classList.add('opacity-0', 'pointer-events-none');
    const prevStepNum = currentStep - 1;
    document.getElementById(`step-${prevStepNum}`).classList.remove('opacity-0', 'pointer-events-none');
    updateProgress(prevStepNum);
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
        // Галерея начинается с 8 фото (1-7 в каталоге)
        for (let i = 8; i <= 27; i++) {
            photosHTML += `
                <div class="snap-center shrink-0 w-[280px] h-[350px] md:w-[320px] md:h-[400px] rounded-2xl overflow-hidden shadow-md">
                    <img src="img/${i}_result.webp" class="w-full h-full object-cover hover:scale-110 transition-transform duration-500">
                </div>
            `;
        }
        galleryContainer.innerHTML = photosHTML;
    }
});
