const jpyFormatter = new Intl.NumberFormat('jp-JP', {
  style: 'currency',
  currency: 'JPY',
  minimumFractionDigits: 0,
})

const mmkFormatter = new Intl.NumberFormat('mm-MM', {
  style: 'currency',
  currency: 'MMK',
  minimumFractionDigits: 0,
})

export const formatJPY = (amount) => {
  return jpyFormatter.format(amount)
}

export const formatMMK = (amount) => {
  return mmkFormatter.format(amount)
}
