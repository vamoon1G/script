var hostA = ['localhost', 'sitename.ru']; // массив доменов

function hostOK(){
	const changeNumberButton = document.getElementById("changeNumber");
const notification = document.getElementById("notification");
const notificationText = document.getElementById("notification-text");
const numberElement = document.querySelector(".number");
const spinnerAnimation = document.getElementById("spinner-animation");


const numbersList = [
    "2.13x", "1.94x", "1.68x", "2.47x", "8.92x", "1.56x", "2.26x", "1.89x", "2.34x", "6.43x",
    "2.72x", "1.58x", "2.28x", "1.99x", "10.47x", "4.23x", "2.67x", "1.73x", "2.21x", "1.86x",
    "3.12x", "2.89x", "9.26x", "1.69x", "2.53x", "1.77x", "2.31x", "11.78x", "5.13x", "1.92x", "2.47x",
    "1.94x", "12.24x", "3.36x", "1.76x", "1.88x", "2.09x", "1.68x", "9.41x", "2.64x", "2.52x", "1.74x",
    "2.03x", "15.57x", "1.81x", "2.27x", "1.98x", "1.69x", "2.46x", "1.79x", "8.39x", "2.84x", "4.89x",
    "1.93x", "13.11x", "1.96x", "2.35x", "2.72x", "2.23x", "1.87x", "2.16x", "10.32x", "2.29x", "2.54x",
    "3.85x", "1.91x", "2.08x", "14.45x", "2.04x", "2.67x", "1.12x", "1.76x", "2.32x", "9.89x", "2.43x", "2 59x",
    "4.97x", "1.78x", "2.06x", "1.98x", "2.22x", "11.87x", "2.54x", "1.67x", "2.14x", "1.72x", "2.38x", "8.63x",
    "3.86x", "1.85x", "2.17x", "1.74x", "12.19x", "2.52x", "3.36x", "1.90x", "2.25x", "1.80x", "2.42x", "9.56x"
];

let currentNumberIndex = 0;
let buttonDisabled = false;
let remainingTime = 0;
let timerInterval = null;
let buttonClicked = false;


const correctPasswords = ["A1B2C3", "X4Y5Z6", "D7E8F9", "G0H1I2", "J3K4L5"];

function verifyPassword() {
    const input1 = document.getElementById("square1").value.toUpperCase();
    const input2 = document.getElementById("square2").value.toUpperCase();
    const input3 = document.getElementById("square3").value.toUpperCase();
    const combinedInput = input1 + input2 + input3;
    const errorMessage = document.getElementById("error-message");
    const mainContent = document.getElementById('mainContent');
    const passwordModal = document.getElementById('passwordModal');
    const passwordContainer = document.getElementById('passwordContainer');
    mainContent.style.display = 'flex';


    if (correctPasswords.includes(combinedInput)) {
        passwordContainer.style.display = 'none';
            passwordModal.style.display = 'none';
          document.addEventListener('DOMContentLoaded',   mainContent.style.display = 'block');
    } else {
        errorMessage.textContent = "Неверный пароль. Попробуйте еще раз."; // Отображение сообщения об ошибке
    }
}





// Проверяем, было ли уже выполнено первое нажатие и восстанавливаем последнее число
let isFirstClick = sessionStorage.getItem("isFirstClick") === "true";

if (isFirstClick) {
    const lastNumber = sessionStorage.getItem("lastNumber");
    if (lastNumber) {
        currentNumberIndex = numbersList.indexOf(lastNumber);
        if (currentNumberIndex !== -1) { // проверка, что lastNumber находится в numbersList
            numberElement.textContent = lastNumber;
        }
    }
}

changeNumberButton.addEventListener("mouseenter", () => {
    if (!buttonClicked) {
      changeNumberButton.classList.add("grayed");
      setTimeout(() => {
        changeNumberButton.classList.remove("grayed");
      }, 50000); // Убрать класс "grayed" через 80 секунд
    }
  });
  
  changeNumberButton.addEventListener("click", () => {
    buttonClicked = true;
    changeNumberButton.classList.add("grayed");
  });

changeNumberButton.addEventListener("click", () => {
    if (!isFirstClick) {
        // Для первого нажатия, выполняем анимацию в течение 5 секунд
        isFirstClick = true;
        sessionStorage.setItem("isFirstClick", "true");
        buttonDisabled = true;
        numberElement.style.visibility = "hidden";
        spinnerAnimation.style.display = "block";

        setTimeout(() => {
            spinnerAnimation.style.display = "none";
            numberElement.style.visibility = "visible";
            currentNumberIndex = (currentNumberIndex + 5) % numbersList.length;
            const nextNumber = numbersList[currentNumberIndex];
            numberElement.textContent = nextNumber;
            sessionStorage.setItem("lastNumber", nextNumber);

            // После анимации первого нажатия, разрешаем обычную логику
            buttonDisabled = false;
            changeNumberButton.style.backgroundColor = "#dd003b";
        }, 3500); // 3,5 секунд задержка для анимации первого нажатия
    } else if (buttonDisabled) {
        showNotification(`Подождите ещё ${remainingTime} секунд для получения следующего коэффициента!`);
    } else {
        // Обычное нажатие кнопки
        buttonDisabled = true;
        remainingTime = 35;
        startTimer();

        numberElement.style.visibility = "hidden";
        spinnerAnimation.style.display = "block";

        setTimeout(() => {
            spinnerAnimation.style.display = "none";
            numberElement.style.visibility = "visible";
            currentNumberIndex = (currentNumberIndex + 1) % numbersList.length;
            const nextNumber = numbersList[currentNumberIndex];
            numberElement.textContent = nextNumber;
            sessionStorage.setItem("lastNumber", nextNumber);

            changeNumberButton.classList.remove("grayed");
            
            // Добавляем стиль background-color для изменения цвета кнопки
            changeNumberButton.style.backgroundColor = "#dd003b";

            disableScreenFor20Seconds();
          }, 35000); // Таймер на 60 секунд
      }
});


function disableScreenFor20Seconds() {
    const blocker = document.createElement('div');
    blocker.style.position = 'fixed';
    blocker.style.top = '0';
    blocker.style.left = '0';
    blocker.style.width = '100%';
    blocker.style.height = '100%';
    blocker.style.background = 'transparent'; // Изменить цвет фона на полностью прозрачный
    blocker.style.zIndex = '9999';
  
    document.body.appendChild(blocker);
  
    setTimeout(() => {
      blocker.remove();
    }, 15000);
  }
  


  function startTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
    }

    timerInterval = setInterval(() => {
        remainingTime--;
        if (remainingTime <= 0) {
            clearInterval(timerInterval);
            buttonDisabled = false;
            showNotification("Подождите 15 секунд, платформа синхронизируется!");
        }
        if (remainingTime <= 0) {
            clearInterval(timerInterval);
            buttonDisabled = false;
            setTimeout(() => {
                showNotification("Теперь вы можете нажать на кнопку!");
            }, 15000); // Добавляем задержку в 15 секунд после окончания 60-секундного таймера
        }
    }, 1000);
}


function showNotification(message) {
    notificationText.textContent = message;
    notification.style.display = "block";

    // Задержка перед добавлением класса "show" для анимации
    setTimeout(() => {
        notification.classList.add("show");
    }, 100);

    setTimeout(() => {
        notification.style.display = "none";
        notification.classList.remove("show");
    }, 4000);
}
}

function hostNO(){
	// здесь, можно разместить блок кода,
	// который выполнится, если домен не совпал.
}








const changeNumberButton = document.getElementById("changeNumber");
const notification = document.getElementById("notification");
const notificationText = document.getElementById("notification-text");
const numberElement = document.querySelector(".number");
const spinnerAnimation = document.getElementById("spinner-animation");


const numbersList = [
    "2.13x", "1.94x", "1.68x", "2.47x", "8.92x", "1.56x", "2.26x", "1.89x", "2.34x", "6.43x",
    "2.72x", "1.58x", "2.28x", "1.99x", "10.47x", "4.23x", "2.67x", "1.73x", "2.21x", "1.86x",
    "3.12x", "2.89x", "9.26x", "1.69x", "2.53x", "1.77x", "2.31x", "11.78x", "5.13x", "1.92x", "2.47x",
    "1.94x", "12.24x", "3.36x", "1.76x", "1.88x", "2.09x", "1.68x", "9.41x", "2.64x", "2.52x", "1.74x",
    "2.03x", "15.57x", "1.81x", "2.27x", "1.98x", "1.69x", "2.46x", "1.79x", "8.39x", "2.84x", "4.89x",
    "1.93x", "13.11x", "1.96x", "2.35x", "2.72x", "2.23x", "1.87x", "2.16x", "10.32x", "2.29x", "2.54x",
    "3.85x", "1.91x", "2.08x", "14.45x", "2.04x", "2.67x", "1.12x", "1.76x", "2.32x", "9.89x", "2.43x", "2 59x",
    "4.97x", "1.78x", "2.06x", "1.98x", "2.22x", "11.87x", "2.54x", "1.67x", "2.14x", "1.72x", "2.38x", "8.63x",
    "3.86x", "1.85x", "2.17x", "1.74x", "12.19x", "2.52x", "3.36x", "1.90x", "2.25x", "1.80x", "2.42x", "9.56x"
];

let currentNumberIndex = 0;
let buttonDisabled = false;
let remainingTime = 0;
let timerInterval = null;
let buttonClicked = false;


const correctPasswords = ["A1B2C3", "X4Y5Z6", "D7E8F9", "G0H1I2", "J3K4L5"];

function verifyPassword() {
    const input1 = document.getElementById("square1").value.toUpperCase();
    const input2 = document.getElementById("square2").value.toUpperCase();
    const input3 = document.getElementById("square3").value.toUpperCase();
    const combinedInput = input1 + input2 + input3;
    const errorMessage = document.getElementById("error-message");
    const mainContent = document.getElementById('mainContent');
    const passwordModal = document.getElementById('passwordModal');
    const passwordContainer = document.getElementById('passwordContainer');
    mainContent.style.display = 'flex';


    if (correctPasswords.includes(combinedInput)) {
        passwordContainer.style.display = 'none';
            passwordModal.style.display = 'none';
          document.addEventListener('DOMContentLoaded',   mainContent.style.display = 'block');
    } else {
        errorMessage.textContent = "Неверный пароль. Попробуйте еще раз."; // Отображение сообщения об ошибке
    }
}





// Проверяем, было ли уже выполнено первое нажатие и восстанавливаем последнее число
let isFirstClick = sessionStorage.getItem("isFirstClick") === "true";

if (isFirstClick) {
    const lastNumber = sessionStorage.getItem("lastNumber");
    if (lastNumber) {
        currentNumberIndex = numbersList.indexOf(lastNumber);
        if (currentNumberIndex !== -1) { // проверка, что lastNumber находится в numbersList
            numberElement.textContent = lastNumber;
        }
    }
}

changeNumberButton.addEventListener("mouseenter", () => {
    if (!buttonClicked) {
      changeNumberButton.classList.add("grayed");
      setTimeout(() => {
        changeNumberButton.classList.remove("grayed");
      }, 50000); // Убрать класс "grayed" через 80 секунд
    }
  });
  
  changeNumberButton.addEventListener("click", () => {
    buttonClicked = true;
    changeNumberButton.classList.add("grayed");
  });

changeNumberButton.addEventListener("click", () => {
    if (!isFirstClick) {
        // Для первого нажатия, выполняем анимацию в течение 5 секунд
        isFirstClick = true;
        sessionStorage.setItem("isFirstClick", "true");
        buttonDisabled = true;
        numberElement.style.visibility = "hidden";
        spinnerAnimation.style.display = "block";

        setTimeout(() => {
            spinnerAnimation.style.display = "none";
            numberElement.style.visibility = "visible";
            currentNumberIndex = (currentNumberIndex + 5) % numbersList.length;
            const nextNumber = numbersList[currentNumberIndex];
            numberElement.textContent = nextNumber;
            sessionStorage.setItem("lastNumber", nextNumber);

            // После анимации первого нажатия, разрешаем обычную логику
            buttonDisabled = false;
            changeNumberButton.style.backgroundColor = "#dd003b";
        }, 3500); // 3,5 секунд задержка для анимации первого нажатия
    } else if (buttonDisabled) {
        showNotification(`Подождите ещё ${remainingTime} секунд для получения следующего коэффициента!`);
    } else {
        // Обычное нажатие кнопки
        buttonDisabled = true;
        remainingTime = 35;
        startTimer();

        numberElement.style.visibility = "hidden";
        spinnerAnimation.style.display = "block";

        setTimeout(() => {
            spinnerAnimation.style.display = "none";
            numberElement.style.visibility = "visible";
            currentNumberIndex = (currentNumberIndex + 1) % numbersList.length;
            const nextNumber = numbersList[currentNumberIndex];
            numberElement.textContent = nextNumber;
            sessionStorage.setItem("lastNumber", nextNumber);

            changeNumberButton.classList.remove("grayed");
            
            // Добавляем стиль background-color для изменения цвета кнопки
            changeNumberButton.style.backgroundColor = "#dd003b";

            disableScreenFor20Seconds();
          }, 35000); // Таймер на 60 секунд
      }
});


function disableScreenFor20Seconds() {
    const blocker = document.createElement('div');
    blocker.style.position = 'fixed';
    blocker.style.top = '0';
    blocker.style.left = '0';
    blocker.style.width = '100%';
    blocker.style.height = '100%';
    blocker.style.background = 'transparent'; // Изменить цвет фона на полностью прозрачный
    blocker.style.zIndex = '9999';
  
    document.body.appendChild(blocker);
  
    setTimeout(() => {
      blocker.remove();
    }, 15000);
  }
  


  function startTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
    }

    timerInterval = setInterval(() => {
        remainingTime--;
        if (remainingTime <= 0) {
            clearInterval(timerInterval);
            buttonDisabled = false;
            showNotification("Подождите 15 секунд, платформа синхронизируется!");
        }
        if (remainingTime <= 0) {
            clearInterval(timerInterval);
            buttonDisabled = false;
            setTimeout(() => {
                showNotification("Теперь вы можете нажать на кнопку!");
            }, 15000); // Добавляем задержку в 15 секунд после окончания 60-секундного таймера
        }
    }, 1000);
}


function showNotification(message) {
    notificationText.textContent = message;
    notification.style.display = "block";

    // Задержка перед добавлением класса "show" для анимации
    setTimeout(() => {
        notification.classList.add("show");
    }, 100);

    setTimeout(() => {
        notification.style.display = "none";
        notification.classList.remove("show");
    }, 4000);
}
