// Функция разблокировки кнопки "Далее" в квизе
function enableNextBtn(stepIndex) {
    const btn = document.getElementById(`btn-next-${stepIndex}`);
    if (btn) {
        btn.disabled = false;
        btn.classList.remove('bg-stone-300', 'text-stone-500');
        btn.classList.add('bg-stone-900', 'text-white', 'hover:bg-stone-800');
    }
}

// Переход на следующий шаг квиза
function nextStep(currentStep) {
    const currentDiv = document.getElementById(`step-${currentStep}`);
    currentDiv.classList.add('opacity-0', 'pointer-events-none');
    
    const nextStepNum = currentStep + 1;
    const nextDiv = document.getElementById(`step-${nextStepNum}`);
    nextDiv.classList.remove('opacity-0', 'pointer-events-none');
    
    updateProgress(nextStepNum);
}

// Возврат на предыдущий шаг квиза
function prevStep(currentStep) {
    const currentDiv = document.getElementById(`step-${currentStep}`);
    currentDiv.classList.add('opacity-0', 'pointer-events-none');
    
    const prevStepNum = currentStep - 1;
    const prevDiv = document.getElementById(`step-${prevStepNum}`);
    prevDiv.classList.remove('opacity-0', 'pointer-events-none');
    
    updateProgress(prevStepNum);
}

// Обновление прогресс-бара
function updateProgress(step) {
    const progressBar = document.getElementById('progress-bar');
    const stepCounter = document.getElementById('step-counter');
    
    if (step <= 4) {
        stepCounter.innerText = `Шаг ${step} из 4`;
        progressBar.style.width = `${(step / 4) * 100}%`;
    }
}

// Безопасная отправка данных на наш сервер Vercel (Обход блокировок РФ)
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
    
    const message = `🔥 *Новая заявка с сайта!*\n\n*Имя:* ${name}\n*Телефон:* ${phone}\n\n*Ответы из квиза:*\n🪵 Форма: ${form}\n📏 Длина: ${length}\n🔥 Печь: ${stove}`;
    
    // Стучимся в нашу серверную функцию Vercel
    fetch('/api/send-lead', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: message })
    })
    .then(response => {
        if (response.ok) {
            // Успех! Прячем форму и показываем окно благодарности
            const currentDiv = document.getElementById(`step-4`);
            currentDiv.classList.add('opacity-0', 'pointer-events-none');
            
            const successDiv = document.getElementById('step-success');
            successDiv.classList.remove('opacity-0', 'pointer-events-none');
            
            document.getElementById('step-counter').innerText = "Готово!";
            document.getElementById('progress-bar').style.width = "100%";
        } else {
            alert("Ошибка при отправке заявки. Попробуйте позже.");
        }
    })
    .catch(error => {
        console.error("Ошибка:", error);
        alert("Ошибка сети. Проверьте подключение к интернету.");
    });
}

// Функция прокрутки каруселей (Каталог и Галерея)
function scrollCarousel(containerId, direction) {
    const container = document.getElementById(containerId);
    if(container) {
        // 350 - это примерная ширина карточки + отступ
        container.scrollBy({ left: direction * 350, behavior: 'smooth' });
    }
}

// Авто-генерация 18 карточек для галереи
document.addEventListener("DOMContentLoaded", () => {
    const galleryContainer = document.getElementById('gallery-photos');
    if (galleryContainer) {
        let photosHTML = '';
        for (let i = 1; i <= 18; i++) {
            // Чтобы показать свои фото, переименуй их в work1.webp, work2.webp и замени путь src на: img/work${i}.webp
            photosHTML += `
                <div class="snap-center shrink-0 w-[280px] h-[350px] md:w-[320px] md:h-[400px] rounded-2xl overflow-hidden shadow-md">
                    <img src="https://images.unsplash.com/photo-1542736667-069246bdf6d7?auto=format&fit=crop&q=80&w=400&random=${i}" alt="Пример работы ${i}" class="w-full h-full object-cover hover:scale-110 transition-transform duration-500 cursor-pointer">
                </div>
            `;
        }
        galleryContainer.innerHTML = photosHTML;
    }
});
