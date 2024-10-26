let capital = parseInt(localStorage.getItem('capital')) || 100;
let workers = parseInt(localStorage.getItem('workers')) || 1;
let incomePerClick = 10;
let managerHired = localStorage.getItem('managerHired') === 'true';
let companyLevel = parseInt(localStorage.getItem('companyLevel')) || 1;
let passiveIncomePerHour = workers * 5;
let hireCost = parseFloat(localStorage.getItem('hireCost')) || 50;

function updateDisplay() {
    document.getElementById("capital").innerText = capital.toFixed(2);
    document.getElementById("workers").innerText = workers;
    document.getElementById("company-level").innerText = companyLevels[companyLevel - 1].name;
    document.getElementById("passive-income").innerText = passiveIncomePerHour.toFixed(2);
    document.getElementById("hire-button").innerText = `Нанять (${hireCost.toFixed(2)} $)`;
}

function openShop() {
    document.getElementById("shop-modal").style.display = "block";
}

function closeShop() {
    document.getElementById("shop-modal").style.display = "none";
}

// Покупка монет через Telegram Stars
function buyCoins() {
    const data = { action: 'buy_1000_coins' };
    window.Telegram.WebApp.sendData(JSON.stringify(data)); // Отправка данных в бот
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
