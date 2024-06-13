// https://api.exchangeratesapi.net/v1/exchange-rates/latest?access_key=IS5CQu6w7ZZUKtpa

let amount = document.querySelector("input");
let fromCurr = document.querySelector(".sel-from");
let toCurr = document.querySelector(".sel-to");
let date = document.querySelector(".data-api");
let button = document.querySelector("button");
let result = document.querySelector(".result");

fetch('https://api.exchangeratesapi.net/v1/exchange-rates/latest?access_key=IS5CQu6w7ZZUKtpa')
    .then((result) => result.json())
    .then((data) => {
        date.textContent = data['date']
        let caurrencName = Object.keys(data['rates']);
        for (let i = 0; i < caurrencName.length; i++) {
            let option1 = document.createElement('option');
            let option2 = document.createElement('option');
            option1.textContent = caurrencName[i];
            option2.textContent = caurrencName[i];
            if (option1.textContent === 'USD')
                option1.setAttribute('selected', true);
            if (option2.textContent === 'EGP')
                option2.setAttribute('selected', true);
            fromCurr.append(option1)
            toCurr.append(option2)
        }
    })
amount.onclick = () => {
    amount.select();
}

button.onclick = function () {
    let amountValue = +amount.value;
    if (amountValue === 0 || isNaN(amountValue)) {
        amount.style.border = '2px solid red';
        amount.style.fontSize = '16px';
        amount.style.color = 'red';
        amount.value = 'Enter An Amount';
        return false;
    } else {
        amount.style.border = 'none';
        amount.style.fontSize = '20px';
        amount.style.color = 'black';
    }
    let fromCurrValue = fromCurr.value;
    let toCurrValue = toCurr.value;
    fetch('https://api.exchangeratesapi.net/v1/exchange-rates/latest?access_key=IS5CQu6w7ZZUKtpa')
        .then((result) => result.json())
        .then((data) => {
            let fromValue = data['rates'][fromCurrValue];
            let toValue = data['rates'][toCurrValue];
            result.textContent = Math.ceil((toValue / fromValue) * amountValue);
        });
}