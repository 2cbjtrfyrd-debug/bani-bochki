// Функция разблокировки кнопки "Далее", если выбран ответ
function enableNextBtn(stepIndex) {
    const btn = document.getElementById(`btn-next-${stepIndex}`);
    btn.disabled = false;
    btn.classList.remove('bg-stone-300', 'text-stone-500');
    btn.classList.add('bg-stone-900', 'text-white', 'hover:bg-stone-800');
}

// Функция перехода на следующий шаг
function nextStep(currentStep) {
    // Прячем текущий шаг
    const currentDiv = document.getElementById(`step-${currentStep}`);
    currentDiv.classList.add('opacity-0', 'pointer-events-none');
    
    // Показываем следующий
    const nextStep = currentStep + 1;
    const nextDiv = document.getElementById(`step-${nextStep}`);
    nextDiv.classList.remove('opacity-0', 'pointer-events-none');
    
    updateProgress(nextStep);
}

// Функция возврата на предыдущий шаг
function prevStep(currentStep) {
    const currentDiv = document.getElementById(`step-${currentStep}`);
    currentDiv.classList.add('opacity-0', 'pointer-events-none');
    
    const prevStep = currentStep - 1;
    const prevDiv = document.getElementById(`step-${prevStep}`);
    prevDiv.classList.remove('opacity-0', 'pointer-events-none');
    
    updateProgress(prevStep);
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

// Отправка заявки
function submitQuiz() {
    const name = document.getElementById('clientName').value;
    const phone = document.getElementById('clientPhone').value;
    
    if (phone.length < 5) {
        alert("Пожалуйста, введите корректный номер телефона");
        return;
    }
    
    // Здесь мы прячем форму и показываем экран успеха
    const currentDiv = document.getElementById(`step-4`);
    currentDiv.classList.add('opacity-0', 'pointer-events-none');
    
    const successDiv = document.getElementById('step-success');
    successDiv.classList.remove('opacity-0', 'pointer-events-none');
    
    document.getElementById('step-counter').innerText = "Готово!";
    document.getElementById('progress-bar').style.width = "100%";
    
    // Собираем все ответы
    const form = document.querySelector('input[name="form"]:checked')?.value;
    const length = document.querySelector('input[name="length"]:checked')?.value;
    const stove = document.querySelector('input[name="stove"]:checked')?.value;
    
    console.log("=== НОВАЯ ЗАЯВКА (ЛИД) ===");
    console.log(`Имя: ${name}`);
    console.log(`Телефон: ${phone}`);
    console.log(`Форма: ${form}, Длина: ${length}, Печь: ${stove}`);
    
    // В будущем мы добавим сюда код для отправки этих данных в Telegram бота!
}
