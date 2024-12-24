import { garagePageSelectors } from '../../selectors/garagePage';
import AddCarModal from './addCarModal';
class GaragePage {
  get header() {
    return cy.get(garagePageSelectors.header)
  }

  get addCarBtn() {
    return cy.get(garagePageSelectors.addCarButton)
  }

  clickAddCarBtn() {
    this.addCarBtn.click()
  }

  get topCarInList() {
    const topItemContainer = cy.get(garagePageSelectors.carsListItem.container).first()
    return {
      get name() {
        return topItemContainer.find(garagePageSelectors.carsListItem.carName)
      },

      get milage() {
        return topItemContainer.find(garagePageSelectors.carsListItem.milage)
      },

      get updateDate() {
        return topItemContainer.find(garagePageSelectors.carsListItem.milageUpdateDate)
      }
    }
  }

  removeAllCars() {                             //Maybe I should put it to the helpers folder???   
    cy.get('body').then($body => {
      if ($body.find(garagePageSelectors.carsListItem.container).length > 0) {
        cy.get(garagePageSelectors.carsListItem.editBtn)
        cy.get(garagePageSelectors.carsListItem.editBtn).first().click()
        cy.contains('Remove car').click()
        cy.contains(/^Remove$/).click()

        this.removeAllCars()
      } else {
        cy.log('No cars in garage')
      }
    })
  }
}

export default new GaragePage()
