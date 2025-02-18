const amountInput = document.getElementById('amount');
const fromCurrency = document.getElementById('from-currency');
const toCurrency = document.getElementById('to-currency');
const resultInput = document.getElementById('result');
const convertBtn = document.getElementById('convert-btn');
const swapBtn = document.getElementById('swap-btn');
const themeSwitch = document.getElementById('theme-switch');

// Example exchange rates (you should use a real API for accurate rates)
const exchangeRates = {
    USD: { EUR: 0.84, GBP: 0.72, JPY: 109.64, INR: 74.5, AUD: 1.35, CAD: 1.25, CHF: 0.92, CNY: 6.45, SEK: 8.65, NZD: 1.45, KRW: 1180.0, SGD: 1.35, NOK: 8.85, MXN: 20.0, BRL: 5.25, RUB: 75.0, ZAR: 15.0, TRY: 8.5, AED: 3.67 },
    EUR: { USD: 1.19, GBP: 0.86, JPY: 130.55, INR: 88.2, AUD: 1.55, CAD: 1.45, CHF: 1.08, CNY: 7.55, SEK: 10.15, NZD: 1.65, KRW: 1350.0, SGD: 1.55, NOK: 10.25, MXN: 23.5, BRL: 6.15, RUB: 85.0, ZAR: 17.5, TRY: 9.8, AED: 4.25 },
    GBP: { USD: 1.39, EUR: 1.16, JPY: 151.59, INR: 102.5, AUD: 1.75, CAD: 1.65, CHF: 1.22, CNY: 8.75, SEK: 11.85, NZD: 1.85, KRW: 1550.0, SGD: 1.75, NOK: 11.85, MXN: 26.5, BRL: 7.25, RUB: 95.0, ZAR: 20.0, TRY: 11.5, AED: 5.0 },
    JPY: { USD: 0.0091, EUR: 0.0077, GBP: 0.0066, INR: 0.69, AUD: 0.012, CAD: 0.011, CHF: 0.0082, CNY: 0.059, SEK: 0.079, NZD: 0.012, KRW: 10.7, SGD: 0.012, NOK: 0.079, MXN: 0.18, BRL: 0.049, RUB: 0.67, ZAR: 0.14, TRY: 0.079, AED: 0.033 },
    INR: { USD: 0.013, EUR: 0.011, GBP: 0.0098, JPY: 1.45, AUD: 0.018, CAD: 0.017, CHF: 0.012, CNY: 0.092, SEK: 0.12, NZD: 0.019, KRW: 16.0, SGD: 0.018, NOK: 0.12, MXN: 0.27, BRL: 0.074, RUB: 1.0, ZAR: 0.21, TRY: 0.12, AED: 0.049 },
    AUD: { USD: 0.74, EUR: 0.65, GBP: 0.57, JPY: 82.0, INR: 55.0, CAD: 0.93, CHF: 0.68, CNY: 4.85, SEK: 6.55, NZD: 1.05, KRW: 870.0, SGD: 0.98, NOK: 6.55, MXN: 14.5, BRL: 3.95, RUB: 54.0, ZAR: 11.5, TRY: 6.55, AED: 2.7 },
    CAD: { USD: 0.8, EUR: 0.69, GBP: 0.61, JPY: 88.0, INR: 59.0, AUD: 1.07, CHF: 0.73, CNY: 5.2, SEK: 7.05, NZD: 1.13, KRW: 930.0, SGD: 1.05, NOK: 7.05, MXN: 15.5, BRL: 4.25, RUB: 58.0, ZAR: 12.5, TRY: 7.05, AED: 2.9 },
    CHF: { USD: 1.09, EUR: 0.93, GBP: 0.82, JPY: 120.0, INR: 80.0, AUD: 1.47, CAD: 1.37, CNY: 7.85, SEK: 10.65, NZD: 1.55, KRW: 1280.0, SGD: 1.45, NOK: 10.65, MXN: 23.5, BRL: 6.45, RUB: 88.0, ZAR: 18.5, TRY: 10.65, AED: 4.4 },
    CNY: { USD: 0.16, EUR: 0.13, GBP: 0.11, JPY: 16.5, INR: 11.0, AUD: 0.21, CAD: 0.19, CHF: 0.13, SEK: 1.35, NZD: 0.22, KRW: 180.0, SGD: 0.21, NOK: 1.35, MXN: 3.0, BRL: 0.82, RUB: 11.0, ZAR: 2.35, TRY: 1.35, AED: 0.56 },
    SEK: { USD: 0.12, EUR: 0.098, GBP: 0.085, JPY: 12.5, INR: 8.5, AUD: 0.15, CAD: 0.14, CHF: 0.094, CNY: 0.74, NZD: 0.16, KRW: 130.0, SGD: 0.15, NOK: 1.0, MXN: 2.25, BRL: 0.61, RUB: 8.5, ZAR: 1.8, TRY: 1.0, AED: 0.41 },
    NZD: { USD: 0.69, EUR: 0.61, GBP: 0.54, JPY: 78.0, INR: 52.0, AUD: 0.95, CAD: 0.89, CHF: 0.65, CNY: 4.55, SEK: 6.15, KRW: 810.0, SGD: 0.92, NOK: 6.15, MXN: 13.5, BRL: 3.75, RUB: 51.0, ZAR: 11.0, TRY: 6.15, AED: 2.55 },
    KRW: { USD: 0.00085, EUR: 0.00074, GBP: 0.00065, JPY: 0.093, INR: 0.063, AUD: 0.0011, CAD: 0.0011, CHF: 0.00078, CNY: 0.0056, SEK: 0.0077, NZD: 0.0012, SGD: 0.0011, NOK: 0.0077, MXN: 0.017, BRL: 0.0047, RUB: 0.064, ZAR: 0.014, TRY: 0.0077, AED: 0.0032 },
    SGD: { USD: 0.74, EUR: 0.65, GBP: 0.57, JPY: 82.0, INR: 55.0, AUD: 1.02, CAD: 0.95, CHF: 0.69, CNY: 4.85, SEK: 6.55, NZD: 1.08, KRW: 870.0, NOK: 6.55, MXN: 14.5, BRL: 3.95, RUB: 54.0, ZAR: 11.5, TRY: 6.55, AED: 2.7 },
    NOK: { USD: 0.11, EUR: 0.098, GBP: 0.085, JPY: 12.5, INR: 8.5, AUD: 0.15, CAD: 0.14, CHF: 0.094, CNY: 0.74, SEK: 1.0, NZD: 0.16, KRW: 130.0, SGD: 0.15, MXN: 2.25, BRL: 0.61, RUB: 8.5, ZAR: 1.8, TRY: 1.0, AED: 0.41 },
    MXN: { USD: 0.05, EUR: 0.043, GBP: 0.038, JPY: 5.5, INR: 3.7, AUD: 0.069, CAD: 0.065, CHF: 0.043, CNY: 0.33, SEK: 0.45, NZD: 0.074, KRW: 59.0, SGD: 0.069, NOK: 0.45, BRL: 0.27, RUB: 3.7, ZAR: 0.79, TRY: 0.45, AED: 0.19 },
    BRL: { USD: 0.19, EUR: 0.16, GBP: 0.14, JPY: 20.0, INR: 13.5, AUD: 0.25, CAD: 0.24, CHF: 0.16, CNY: 1.22, SEK: 1.65, NZD: 0.27, KRW: 210.0, SGD: 0.25, NOK: 1.65, MXN: 3.7, RUB: 13.5, ZAR: 2.9, TRY: 1.65, AED: 0.68 },
    RUB: { USD: 0.013, EUR: 0.011, GBP: 0.0098, JPY: 1.5, INR: 1.0, AUD: 0.019, CAD: 0.017, CHF: 0.011, CNY: 0.091, SEK: 0.12, NZD: 0.02, KRW: 16.0, SGD: 0.019, NOK: 0.12, MXN: 0.27, BRL: 0.074, ZAR: 0.16, TRY: 0.12, AED: 0.049 },
    ZAR: { USD: 0.067, EUR: 0.057, GBP: 0.05, JPY: 7.1, INR: 4.8, AUD: 0.087, CAD: 0.08, CHF: 0.054, CNY: 0.43, SEK: 0.56, NZD: 0.091, KRW: 71.0, SGD: 0.087, NOK: 0.56, MXN: 1.25, BRL: 0.34, RUB: 4.8, TRY: 0.56, AED: 0.23 },
    TRY: { USD: 0.12, EUR: 0.098, GBP: 0.085, JPY: 12.5, INR: 8.5, AUD: 0.15, CAD: 0.14, CHF: 0.094, CNY: 0.74, SEK: 1.0, NZD: 0.16, KRW: 130.0, SGD: 0.15, NOK: 1.0, MXN: 2.25, BRL: 0.61, RUB: 8.5, ZAR: 1.8, AED: 0.41 },
    AED: { USD: 0.27, EUR: 0.23, GBP: 0.2, JPY: 30.0, INR: 20.0, AUD: 0.37, CAD: 0.34, CHF: 0.23, CNY: 1.8, SEK: 2.45, NZD: 0.39, KRW: 310.0, SGD: 0.37, NOK: 2.45, MXN: 5.5, BRL: 1.5, RUB: 20.0, ZAR: 4.3, TRY: 2.45 },
};

function convertCurrency() {
    const amount = parseFloat(amountInput.value);
    const from = fromCurrency.value;
    const to = toCurrency.value;

    if (isNaN(amount)) {
        alert('Please enter a valid amount');
        return;
    }

    let rate;
    if (from === to) {
        rate = 1;
    } else {
        rate = exchangeRates[from][to];
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