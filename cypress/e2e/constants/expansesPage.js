export const expensesConstants = {
  path: 'panel/expenses',

  header: 'Fuel expenses',
  addExpenseBtn: 'Add an expense',

  addExpenseModal: {
    header: 'Add an expense×',
    errors: {
      emptyMilage: 'Mileage required',
      emptyLiters: 'Liters required',
      emptyTotalCost: 'Total cost required',
      invalidMilage: 'Mileage has to be from 0 to 999999',
      invalidLiters: 'Liters has to be from 0.01 to 9999',
      invalidTotalCost: 'Total cost has to be from 0.01 to 1000000'
    }
  },

  tableHeader: {
    date: 'Date',
    milage: 'Milage',
    litersUser: 'Liters used',
    totalCost: 'Total cost'
  },

  emptyExpensesTitle: 'You don’t have any fuel expenses filed in' //Error in filed word (filled)
}