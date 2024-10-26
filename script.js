// Изначальные данные
let capital = parseInt(localStorage.getItem('capital')) || 100;
let workers = parseInt(localStorage.getItem('workers')) || 1;
let incomePerClick = 10;
let managerHired = localStorage.getItem('managerHired') === 'true';
let companyLevel = parseInt(localStorage.getItem('companyLevel')) || 1;
let passiveIncomePerHour = workers * 5;  // Пассивный доход в час зависит от количества сотрудников

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

// Обновление интерфейса
function updateDisplay() {
    document.getElementById("capital").innerText = capital.toFixed(2);
    document.getElementById("workers").innerText = workers;
    document.getElementById("company-level").innerText = companyLevels[companyLevel - 1].name;
    document.getElementById("passive-income").innerText = passiveIncomePerHour.toFixed(2);
}

// Заработок за клик
function earnMoney() {
    capital += incomePerClick;
    updateLocalStorage();
    updateDisplay();
}

// Инвестировать в бизнес (нанимает сотрудника)
function invest() {
    if (capital >= 50) {
        capital -= 50;
        workers += 1;
        incomePerClick += 5;
        updatePassiveIncome();  // Обновляем пассивный доход при найме
        checkCompanyLevel();
        updateLocalStorage();
        updateDisplay();
    } else {
        showMessage("Недостаточно капитала для инвестиций!");
    }
}

// Нанять менеджера (автоматизация)
function hireManager() {
    if (!managerHired && capital >= 100) {
        capital -= 100;
        managerHired = true;
        showMessage("Менеджер нанят! Доход увеличен.");
        autoIncome();
    } else if (managerHired) {
        showMessage("Менеджер уже нанят.");
    } else {
        showMessage("Недостаточно капитала для найма менеджера!");
    }
}

// Расчет пассивного дохода на основе сотрудников
function updatePassiveIncome() {
    passiveIncomePerHour = workers * 5;  // Пассивный доход: каждый сотрудник приносит 5 $ в час
    updateLocalStorage();
}

// Пассивный доход от сотрудников (добавляет капитал каждую секунду)
function autoIncome() {
    setInterval(() => {
        capital += (passiveIncomePerHour / 3600);  // Пассивный доход каждую секунду
        updateLocalStorage();
        updateDisplay();
    }, 1000);  // Запускаем каждую секунду
}

// Проверка уровня компании
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

// Сообщение пользователю
function showMessage(message) {
    const status = document.getElementById("business-status");
    status.innerText = message;
    setTimeout(() => status.innerText = '', 3000);
}

// Сохранение данных в localStorage
function updateLocalStorage() {
    localStorage.setItem('capital', capital);
    localStorage.setItem('workers', workers);
    localStorage.setItem('managerHired', managerHired);
    localStorage.setItem('companyLevel', companyLevel);
    localStorage.setItem('passiveIncomePerHour', passiveIncomePerHour);
}

// Инициализация
updateDisplay();
if (managerHired) autoIncome();
checkCompanyLevel();
updatePassiveIncome();
