function openShop() {
    document.getElementById("shop-modal").style.display = "block";
}

function closeShop() {
    document.getElementById("shop-modal").style.display = "none";
}

function buyCoins() {
    const data = { action: "buy_1000_coins" };
    window.Telegram.WebApp.sendData(JSON.stringify(data));  // Отправка данных боту
}

function earnMoney() {
    capital += 10;
    updateDisplay();
}

function invest() {
    if (capital >= 50) {
        capital -= 50;
        workers++;
        updateDisplay();
    } else {
        alert("Недостаточно средств!");
    }
}

function hireManager() {
    if (capital >= 100) {
        alert("Менеджер нанят!");
    } else {
        alert("Недостаточно средств!");
    }
}

function updateDisplay() {
    document.getElementById("capital").innerText = capital;
    document.getElementById("workers").innerText = workers;
}

let capital = 100;
let workers = 1;
updateDisplay();
