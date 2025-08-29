// Import helper to map currency to country flags
import { currencyToFlagCode } from './currency-to-flag-code.js'

// Select elements from the DOM
const currencyConverterSelect = document.querySelectorAll('.currency-converter__select select')
const imageSourceCurrency = document.getElementById('imageSourceCurrency')
const imageTargetCurrency = document.getElementById('imageTargetCurrency')
// Swap source and target currencies

// Update exchange rate upon input

// Perform conversion when button is clicked

// Update exchange rate displayed

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
