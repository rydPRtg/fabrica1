let capital = parseInt(localStorage.getItem('capital')) || 100;
let workers = parseInt(localStorage.getItem('workers')) || 1;
let incomePerClick = 10;
let managerHired = localStorage.getItem('managerHired') === 'true';
let companyLevel = parseInt(localStorage.getItem('companyLevel')) || 1;
let passiveIncomePerHour = workers * 5;
let hireCost = parseFloat(localStorage.getItem('hireCost')) || 50;

// Обновление интерфейса
function updateDisplay() {
    document.getElementById("capital").innerText = capital.toFixed(2);
    document.getElementById("workers").innerText = workers;
    document.getElementById("company-level").innerText = companyLevels[companyLevel - 1].name;
    document.getElementById("passive-income").innerText = passiveIncomePerHour.toFixed(2);
    document.getElementById("hire-button").innerText = `Нанять (${hireCost.toFixed(2)} $)`;
}

// Открытие и закрытие магазина
function openShop() {
    document.getElementById("shop-modal").style.display = "block";
}

function closeShop() {
    document.getElementById("shop-modal").style.display = "none";
}

// Отправка запроса на покупку монет боту
function buyCoins() {
    const data = { action: 'buy', amount: 1000 };
    window.Telegram.WebApp.sendData(JSON.stringify(data)); // Отправляем данные в бот
}

// Успешная покупка
function onSuccessfulPayment() {
    capital += 1000;
    updateLocalStorage();
    updateDisplay();
    closeShop();
    alert("Покупка успешна! Вы получили 1000 монет.");
}

function updateLocalStorage() {
    localStorage.setItem('capital', capital);
    localStorage.setItem('workers', workers);
    localStorage.setItem('managerHired', managerHired);
    localStorage.setItem('companyLevel', companyLevel);
    localStorage.setItem('passiveIncomePerHour', passiveIncomePerHour);
    localStorage.setItem('hireCost', hireCost);
}

updateDisplay();
