const date = new Date()

export const dates = {
  currentDate: `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`,
  yesterday: `${date.getDate() - 1}.${date.getMonth() + 1}.${date.getFullYear()}`,
  tomorrow: `${date.getDate() + 1}.${date.getMonth() + 1}.${date.getFullYear()}`
}

export const milage = {
  oneMile: '1',
  tenMiles: '10',
  invalidMiles: '-1'
}

export const litres = {
  oneLitre: '1',
  tenLitres: '10',
  invalidLitres: '-1'
}

export const costs = {
  oneDollar: '1.00',
  tenCost: '10.00',
  invalidCost: '-1'
}