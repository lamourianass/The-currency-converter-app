// Import helper to map currency to country flags
import { currencyToFlagCode } from './currency-to-flag-code.js'

// Select elements from the DOM
const currencyConverterSelect = document.querySelectorAll('.currency-converter__select select')
const imageSourceCurrency = document.getElementById('imageSourceCurrency')
const imageTargetCurrency = document.getElementById('imageTargetCurrency')
const inputSourceCurrency = document.getElementById('inputSourceCurrency')
const exchangeRateText = document.getElementById('exchangeRateText')
const selectSourceCurrency = document.getElementById('selectSourceCurrency')
const selectTargetCurrency = document.getElementById('selectTargetCurrency')
const btnConvert = document.getElementById('btnConvert')

let conversionRate = 0
let sourceCurrencyValue = 0
let targetCurrencyValue = 0
// Swap source and target currencies

// Update exchange rate upon input

// Perform conversion when button is clicked
btnConvert.addEventListener('click', async () => {
  if (inputSourceCurrency.value <= 0) {
    alert('Please enter a valid amount!')
    return
  }
  exchangeRateText.textContent = 'Fetching exchange rate, please wait...'
  const selectSourceCurrencyValue = selectSourceCurrency.value
  const selectTargetCurrencyValue = selectTargetCurrency.value
  try {
    const response = await fetch(`https://v6.exchangerate-api.com/v6/858cce0852ca7c1d95758db5/pair/${selectSourceCurrencyValue}/${selectTargetCurrencyValue}`)
    const data = await response.json()
    conversionRate = data.conversion_rate
    updateExchangeRate()

  } catch (error) {
    console.log('Error fetching exchange rate!', error)
    exchangeRateText.textContent = 'Error fetching exchange rate!'
  }


})

// Update exchange rate displayed
function updateExchangeRate() {
  sourceCurrencyValue = parseFloat(inputSourceCurrency.value).toFixed(2)
  targetCurrencyValue = (sourceCurrencyValue * conversionRate)
  exchangeRateText.textContent = `
  ${formatCurrency(sourceCurrencyValue)} ${selectSourceCurrency.value}
  = ${formatCurrency(targetCurrencyValue)} ${selectTargetCurrency.value}
  `
}

// Change country flags upon select

// Initialize select menus and flags
currencyConverterSelect.forEach(selectElement => {
  for (const [currency, flagCode] of Object.entries(currencyToFlagCode)) {
    const newOptionElement = document.createElement('option')
    newOptionElement.value = currency
    newOptionElement.textContent = currency
    selectElement.appendChild(newOptionElement)
  }
  selectElement.addEventListener('change', () => {
    changeFlag(selectElement)
  })
  if (selectElement.id === 'selectSourceCurrency') {
    selectElement.value = 'MAD'
  }
  if (selectElement.id === 'selectTargetCurrency') {
    selectElement.value = 'MYR'
  }
})

function changeFlag(selectElement) {
  const selectValue = selectElement.value
  const selectId = selectElement.id
  const flagCode = currencyToFlagCode[selectValue]

  if (selectId === 'selectSourceCurrency') {
    imageSourceCurrency.src = `https://flagcdn.com/w640/${flagCode}.png`
  } else {
    imageTargetCurrency.src = `https://flagcdn.com/w640/${flagCode}.png`
  }
}
// Format currency
function formatCurrency(number) {
return new Intl.NumberFormat().format(number)
}
