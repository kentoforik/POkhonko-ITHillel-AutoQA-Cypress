export const expansesPageSelectors = {
  header: 'div.panel-page > div > h1',
  addExpenseButton: 'button.btn-primary:contains(\'Add an expense\')',
  selectVehicleButton: '#carSelectDropdown',

  addExpenseModal: {
    header: '.modal-content .modal-header',
    vehicleSelector: 'select#addExpenseCar',
    reportDateInput: 'input#addExpenseDate',
    milageInput: 'input#addExpenseMileage',
    litresInput: 'input#addExpenseLiters',
    totalCostInput: 'input#addExpenseTotalCost',

    errors: {
      invalidMilage: 'div.form-group label[for="addExpenseMileage"] + div + div.invalid-feedback p',
      invalidLiters: 'div.form-group label[for="addExpenseLiters"] + div + div.invalid-feedback p',
      invalidTotalCost: 'div.form-group label[for="addExpenseTotalCost"] + div + div.invalid-feedback p',
    },

    addBtn: 'div.modal-footer > button.btn-primary:contains(\'Add\')',
    cancelBtn: 'div.modal-footer > button.btn-secondary:contains(\'Cancel\')',
  },

  expensesTable: 'div.panel-page_content div.expenses .table.expenses_table',
  expensesTableEmptyTitle: '.panel-page_content .h3.panel-empty_message'
}