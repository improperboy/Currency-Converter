const amountInput = document.getElementById('amount');
const fromCurrency = document.getElementById('from-currency');
const toCurrency = document.getElementById('to-currency');
const resultInput = document.getElementById('result');
const convertBtn = document.getElementById('convert-btn');
const swapBtn = document.getElementById('swap-btn');
const themeSwitch = document.getElementById('theme-switch');

// Replace with your API key from ExchangeRate-API
const API_KEY = 'f5841862562a45bf576443f4';
const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/`;

async function fetchExchangeRates(baseCurrency) {
    try {
        const response = await fetch(`${API_URL}${baseCurrency}`);
        const data = await response.json();
        if (data.result === 'success') {
            return data.conversion_rates;
        } else {
            throw new Error('Failed to fetch exchange rates');
        }
    } catch (error) {
        console.error('Error fetching exchange rates:', error);
        alert('Failed to fetch exchange rates. Please try again later.');
        return null;
    }
}

async function convertCurrency() {
    const amount = parseFloat(amountInput.value);
    const from = fromCurrency.value;
    const to = toCurrency.value;

    if (isNaN(amount)) {
        alert('Please enter a valid amount');
        return;
    }

    const rates = await fetchExchangeRates(from);
    if (!rates) return;

    const rate = rates[to];
    if (!rate) {
        alert('Invalid currency selection');
        return;
    }

    const result = amount * rate;
    resultInput.value = result.toFixed(2);
}

function swapCurrencies() {
    const temp = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = temp;
    convertCurrency();
}

function toggleTheme() {
    document.body.classList.toggle('dark-theme');
}

convertBtn.addEventListener('click', convertCurrency);
swapBtn.addEventListener('click', swapCurrencies);
themeSwitch.addEventListener('change', toggleTheme);

// Add input event listeners for real-time conversion
amountInput.addEventListener('input', convertCurrency);
fromCurrency.addEventListener('change', convertCurrency);
toCurrency.addEventListener('change', convertCurrency);
