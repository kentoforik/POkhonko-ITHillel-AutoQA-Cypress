import { expansesPageSelectors } from '../../selectors/expansesPage'

class ExpansesPage {
  get header() {
    return cy.get(expansesPageSelectors.header)
  }

  get vehicleList() {
    return cy.get(expansesPageSelectors.selectVehicleButton)
  }

  get addExpenseButton() {
    return cy.get(expansesPageSelectors.addExpenseButton)
  }

  get expensesTable() {
    return cy.get(expansesPageSelectors.expensesTable)
  }

  get expensesTableEmptyTitle() {
    return cy.get(expansesPageSelectors.expensesTableEmptyTitle)
  }

  selectVehicle(vehicle) {
    this.vehicleList.click()
    cy.contains(vehicle).click()
  }
}

export default new ExpansesPage()