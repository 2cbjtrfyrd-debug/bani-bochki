function enableNextBtn(stepIndex) {
    const btn = document.getElementById(`btn-next-${stepIndex}`);
    if (btn) {
        btn.disabled = false;
        btn.classList.remove('bg-stone-300', 'text-stone-500');
        btn.classList.add('bg-stone-900', 'text-white', 'hover:bg-stone-800');
    }
}

function nextStep(currentStep) {
    const currentDiv = document.getElementById(`step-${currentStep}`);
    currentDiv.classList.add('opacity-0', 'pointer-events-none');
    const nextStepNum = currentStep + 1;
    const nextDiv = document.getElementById(`step-${nextStepNum}`);
    nextDiv.classList.remove('opacity-0', 'pointer-events-none');
    updateProgress(nextStepNum);
}

function prevStep(currentStep) {
    const currentDiv = document.getElementById(`step-${currentStep}`);
    currentDiv.classList.add('opacity-0', 'pointer-events-none');
    const prevStepNum = currentStep - 1;
    const prevDiv = document.getElementById(`step-${prevStepNum}`);
    prevDiv.classList.remove('opacity-0', 'pointer-events-none');
    updateProgress(prevStepNum);
}

function updateProgress(step) {
    const progressBar = document.getElementById('progress-bar');
    const stepCounter = document.getElementById('step-counter');
    if (step <= 4) {
        stepCounter.innerText = `Шаг ${step} из 4`;
        progressBar.style.width = `${(step / 4) * 100}%`;
    }
}

function submitQuiz() {
    const name = document.getElementById('clientName').value;
    const phone = document.getElementById('clientPhone').value;
    if (phone.length < 5) {
        alert("Пожалуйста, введите корректный номер телефона");
        return;
    }
    const form = document.querySelector('input[name="form"]:checked')?.value || "Не выбрано";
    const length = document.querySelector('input[name="length"]:checked')?.value || "Не выбрано";
    const stove = document.querySelector('input[name="stove"]:checked')?.value || "Не выбрано";
    const message = `🔥 *Новая заявка с сайта!*\n\n*Имя:* ${name}\n*Телефон:* ${phone}\n\n*Ответы из квиза:*\n🪵 Модель: ${form}\n📏 Размер: ${length}\n🔥 Печь: ${stove}`;
    
    fetch('/api/send-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: message })
    })
    .then(response => {
        if (response.ok) {
            document.getElementById(`step-4`).classList.add('opacity-0', 'pointer-events-none');
            document.getElementById('step-success').classList.remove('opacity-0', 'pointer-events-none');
            document.getElementById('step-counter').innerText = "Готово!";
            document.getElementById('progress-bar').style.width = "100%";
        } else {
            alert("Ошибка при отправке заявки.");
        }
    });
}

function scrollCarousel(containerId, direction) {
    const container = document.getElementById(containerId);
    if(container) container.scrollBy({ left: direction * 350, behavior: 'smooth' });
}

// ГЕНЕРАЦИЯ ГАЛЕРЕИ (Начиная с 8 фото)
document.addEventListener("DOMContentLoaded", () => {
    const galleryContainer = document.getElementById('gallery-photos');
    if (galleryContainer) {
        let photosHTML = '';
        // В папке 27 файлов. Каталог забрал 1-7. Значит галерея с 8 по 27.
        for (let i = 8; i <= 27; i++) {
            photosHTML += `
                <div class="snap-center shrink-0 w-[280px] h-[350px] md:w-[320px] md:h-[400px] rounded-2xl overflow-hidden shadow-md">
                    <img src="img/${i}_result.webp" alt="Пример работы ${i}" class="w-full h-full object-cover hover:scale-110 transition-transform duration-500 cursor-pointer">
                </div>
            `;
        }
        galleryContainer.innerHTML = photosHTML;
    }
});
