// Изначальные данные
let capital = parseInt(localStorage.getItem('capital')) || 100;
let workers = parseInt(localStorage.getItem('workers')) || 1;
let incomePerClick = 10;
let managerHired = localStorage.getItem('managerHired') === 'true';
let companyLevel = parseInt(localStorage.getItem('companyLevel')) || 1;
let passiveIncomePerHour = workers * 5;
let hireCost = parseFloat(localStorage.getItem('hireCost')) || 50;

// Таблица уровней компании
const companyLevels = [
    { level: 1, name: "Стартап", minWorkers: 1, maxWorkers: 10 },
    { level: 2, name: "Малый бизнес", minWorkers: 10, maxWorkers: 30 },
    { level: 3, name: "Средний бизнес", minWorkers: 30, maxWorkers: 70 },
    { level: 4, name: "Региональная компания", minWorkers: 70, maxWorkers: 150 },
    { level: 5, name: "Национальная компания", minWorkers: 150, maxWorkers: 300 },
    { level: 6, name: "Корпорация", minWorkers: 300, maxWorkers: 600 },
    { level: 7, name: "Международная корпорация", minWorkers: 600, maxWorkers: 1200 }
];

// Функция для обновления отображения данных
function updateDisplay() {
    document.getElementById("capital").innerText = capital.toFixed(2);
    document.getElementById("workers").innerText = workers;
    document.getElementById("company-level").innerText = companyLevels[companyLevel - 1].name;
    document.getElementById("passive-income").innerText = passiveIncomePerHour.toFixed(2);
    document.getElementById("hire-button").innerText = `Нанять (${hireCost.toFixed(2)} $)`;
}

// Функция заработка за клик
function earnMoney() {
    capital += incomePerClick;
    updateLocalStorage();
    updateDisplay();
}

// Функция для найма сотрудника
function invest() {
    if (capital >= hireCost) {
        capital -= hireCost;
        workers += 1;
        incomePerClick += 5;
        hireCost += 200;  // Увеличиваем стоимость найма на 200
        updatePassiveIncome();
        checkCompanyLevel();
        updateLocalStorage();
        updateDisplay();
    } else {
        showMessage("Недостаточно капитала для инвестиций!");
    }
}

// Функция для найма менеджера
function hireManager() {
    if (!managerHired && capital >= 100) {
        capital -= 100;
        managerHired = true;
        showMessage("Менеджер нанят! Доход увеличен.");
        autoIncome();
        updateLocalStorage();
    } else if (managerHired) {
        showMessage("Менеджер уже нанят.");
    } else {
        showMessage("Недостаточно капитала для найма менеджера!");
    }
}

// Функция для открытия магазина и создания инвойса через Telegram Bot API
function openShop() {
    const apiUrl = `https://api.telegram.org/bot<7471596204:AAHajSvhuxZBKwOZhu1BLDOL-6WpJsL8J6c>/sendInvoice`;
    const chatId = '<YOUR_CHAT_ID>';
    const payload = {
        chat_id: chatId,
        title: "Покупка капитала",
        description: "Пожертвование для компании",
        payload: "donate",
        provider_token: "<YOUR_PROVIDER_TOKEN>",
        currency: "XTR",
        prices: JSON.stringify([{ label: "Поддержка компании", amount: 50000 }])  // 500 р.
    };

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    })
    .then(response => response.json())
    .then(data => {
        if (data.ok) {
            showMessage("Инвойс создан! Проверьте Telegram для оплаты.");
        } else {
            showMessage("Ошибка при создании инвойса.");
        }
    })
    .catch(error => {
        console.error("Ошибка:", error);
        showMessage("Ошибка сети. Повторите попытку позже.");
    });
}

// Функция для расчета пассивного дохода
function updatePassiveIncome() {
    passiveIncomePerHour = workers * 5;
    updateLocalStorage();
}

// Функция для начисления пассивного дохода
function autoIncome() {
    setInterval(() => {
        capital += (passiveIncomePerHour / 3600);  // Пассивный доход начисляется каждую секунду
        updateLocalStorage();
        updateDisplay();
    }, 1000);
}

// Функция проверки и обновления уровня компании
function checkCompanyLevel() {
    for (let i = companyLevels.length - 1; i >= 0; i--) {
        if (workers >= companyLevels[i].minWorkers) {
            if (companyLevel !== companyLevels[i].level) {
                companyLevel = companyLevels[i].level;
                showMessage(`Поздравляем! Ваша компания теперь: ${companyLevels[i].name}`);
            }
            break;
        }
    }
}

// Функция для отображения сообщений
function showMessage(message) {
    const status = document.getElementById("business-status");
    status.innerText = message;
    setTimeout(() => status.innerText = '', 3000);
}

// Функция для сохранения данных в localStorage
function updateLocalStorage() {
    localStorage.setItem('capital', capital);
    localStorage.setItem('workers', workers);
    localStorage.setItem('managerHired', managerHired);
    localStorage.setItem('companyLevel', companyLevel);
    localStorage.setItem('passiveIncomePerHour', passiveIncomePerHour);
    localStorage.setItem('hireCost', hireCost);
}

// Инициализация и запуск начальных функций
updateDisplay();
if (managerHired) autoIncome();
checkCompanyLevel();
updatePassiveIncome();
