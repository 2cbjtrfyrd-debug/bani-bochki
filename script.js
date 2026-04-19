// Функция разблокировки кнопки "Далее", если выбран ответ
function enableNextBtn(stepIndex) {
    const btn = document.getElementById(`btn-next-${stepIndex}`);
    if (btn) {
        btn.disabled = false;
        btn.classList.remove('bg-stone-300', 'text-stone-500');
        btn.classList.add('bg-stone-900', 'text-white', 'hover:bg-stone-800');
    }
}

// Переход на следующий шаг
function nextStep(currentStep) {
    const currentDiv = document.getElementById(`step-${currentStep}`);
    currentDiv.classList.add('opacity-0', 'pointer-events-none');
    
    const nextStepNum = currentStep + 1;
    const nextDiv = document.getElementById(`step-${nextStepNum}`);
    nextDiv.classList.remove('opacity-0', 'pointer-events-none');
    
    updateProgress(nextStepNum);
}

// Возврат на предыдущий шаг
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

// Отправка данных в Telegram
function submitQuiz() {
    const name = document.getElementById('clientName').value;
    const phone = document.getElementById('clientPhone').value;
    
    if (phone.length < 5) {
        alert("Пожалуйста, введите корректный номер телефона");
        return;
    }
    
    // ВАЖНО: ВСТАВЬ СВОИ ДАННЫЕ ИЗ ТЕЛЕГРАМА СЮДА:
    const BOT_TOKEN = "ТВОЙ_ТОКЕН_ОТ_BOTFATHER";
    const CHAT_ID = "ТВОЙ_CHAT_ID";
    
    const form = document.querySelector('input[name="form"]:checked')?.value || "Не выбрано";
    const length = document.querySelector('input[name="length"]:checked')?.value || "Не выбрано";
    const stove = document.querySelector('input[name="stove"]:checked')?.value || "Не выбрано";
    
    const message = `🔥 *Новая заявка с сайта!*\n\n*Имя:* ${name}\n*Телефон:* ${phone}\n\n*Ответы из квиза:*\n🪵 Форма: ${form}\n📏 Длина: ${length}\n🔥 Печь: ${stove}`;
    
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${encodeURIComponent(message)}&parse_mode=Markdown`;

    fetch(url)
        .then(response => {
            if (response.ok) {
                const currentDiv = document.getElementById(`step-4`);
                currentDiv.classList.add('opacity-0', 'pointer-events-none');
                
                const successDiv = document.getElementById('step-success');
                successDiv.classList.remove('opacity-0', 'pointer-events-none');
                
                document.getElementById('step-counter').innerText = "Готово!";
                document.getElementById('progress-bar').style.width = "100%";
            } else {
                alert("Ошибка при отправке заявки. Проверьте настройки бота.");
            }
        })
        .catch(error => {
            console.error("Ошибка:", error);
            alert("Ошибка сети. Проверьте подключение.");
        });
}
