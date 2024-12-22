import GaragePage from './garagePage'
import { garagePageSelectors } from '../../selectors/garagePage'

class AddCarModal {
  get brandInput() {
    return cy.get(garagePageSelectors.addCarModal.brandInput)
  }
  get modelInput() {
    return cy.get(garagePageSelectors.addCarModal.modelInput)
  }
  get milageInput() {
    return cy.get(garagePageSelectors.addCarModal.milageInput)
  }
  get addBtn() {
    return cy.get(garagePageSelectors.addCarModal.addBtn)
  }
  get cancelBtn() {
    return cy.get(garagePageSelectors.addCarModal.cancelBtn)
  }

  get creationDate() {
    const date = new Date()
    return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`
  }

  get milageValidationError() {
    return cy.get(garagePageSelectors.addCarModal.milageValidationError)
  }

  open() {
    GaragePage.clickAddCarBtn()
  }

  selectBrand(brand) {
    this.brandInput.select(brand)
  }
  selectModel(model) {
    this.modelInput.select(model)
  }
  typeMilage(milage) {
    this.milageInput.type(milage)
  }
  clickAddBtn() {
    this.addBtn.click()
  }
  clickCancelBtn() {
    this.cancelBtn.click()
  }
}

export default new AddCarModal()