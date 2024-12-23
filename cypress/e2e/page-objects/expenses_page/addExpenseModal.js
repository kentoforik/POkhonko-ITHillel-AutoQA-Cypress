import { expansesPageSelectors } from '../../selectors/expansesPage'
const { addExpenseModal: addExpenseModalSelectors } = expansesPageSelectors

class AddExpenseModal {
  get header() {
    return cy.get(addExpenseModalSelectors.header)
  }

  get vehicleSelector() {
    return cy.get(addExpenseModalSelectors.vehicleSelector)
  }

  get date() {
    return cy.get(addExpenseModalSelectors.reportDateInput)
  }

  get milage() {
    return cy.get(addExpenseModalSelectors.milageInput)
  }

  get litres() {
    return cy.get(addExpenseModalSelectors.litresInput)
  }

  get totalCost() {
    return cy.get(addExpenseModalSelectors.totalCostInput)
  }

  get milageError() {
    return cy.get(addExpenseModalSelectors.errors.invalidMilage)
  }

  get litresError() {
    return cy.get(addExpenseModalSelectors.errors.invalidLiters)
  }

  get totalCostError() {
    return cy.get(addExpenseModalSelectors.errors.invalidTotalCost)
  }

  get submitBtn() {
    return cy.get(addExpenseModalSelectors.addBtn)
  }

  selectVehicle(vehicle) {
    this.vehicleSelector.select(vehicle)
  }

  typeDate(date) {
    cy.get(addExpenseModalSelectors.reportDateInput)
      .clear()
      .type(date)
  }

  typeMilage(milage) {
    cy.get(addExpenseModalSelectors.milageInput)
      .clear()
      .type(milage)
  }

  typeLitres(litres) {
    cy.get(addExpenseModalSelectors.litresInput)
      .clear()
      .type(litres)
  }

  typeTotalCost(cost) {
    cy.get(addExpenseModalSelectors.totalCostInput)
      .clear()
      .type(cost)
  }

  submit() {
    cy.get(addExpenseModalSelectors.addBtn)
      .click()
  }

  cancel() {
    cy.get(addExpenseModalSelectors.cancelBtn)
      .click()
  }
}

export default new AddExpenseModal()