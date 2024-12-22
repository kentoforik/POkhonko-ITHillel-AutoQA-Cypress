/// <reference types="cypress" />

import { authHandler } from '../helpers/auth_helper'
import HomePage from '../page-objects/homePage'
import { homePageSelectors } from '../selectors/homePage'

import GaragePage from '../page-objects/garage_page/garagePage'
import AddCarModal from '../page-objects/garage_page/addCarModal'
import { garagePageConstants } from '../constants/garagePage'

import leftMenu from '../page-objects/leftMenu'

import { milage } from './test_data'

describe('Garage page', () => {
  beforeEach(() => {
    const preLoginUserName = Cypress.env('preLoginUserName')
    const preLoginUserPassword = Cypress.env('preLoginUserPassword')
    authHandler('/', preLoginUserName, preLoginUserPassword)

    const userLoginData = {
      email: Cypress.env('username'),
      password: Cypress.env('password')
    }
    HomePage.UserSignIn(userLoginData, homePageSelectors)
  })

  after(() => {
    //cleaning up the garage after each test
    leftMenu.garage.click()
    GaragePage.removeAllCars()
  })

  it('is opened', () => {
    cy.url().should('eq', `${Cypress.config().baseUrl}\/${garagePageConstants.path}`)
    GaragePage.header.should('have.text', garagePageConstants.header)
    GaragePage.addCarBtn.should('have.text', garagePageConstants.addCarButton)
  })

  describe('Add car', () => {
    it('should add car to garage, showing it in the list top', () => {
      AddCarModal.open()
      AddCarModal.selectBrand(garagePageConstants.carBrands[1])
      AddCarModal.selectModel(garagePageConstants.carModels.BMW[1])
      AddCarModal.typeMilage(milage.tenMiles)
      AddCarModal.clickAddBtn()

      GaragePage.TopCarInList
        .name.should('have.text', `${garagePageConstants.carBrands[1]} ${garagePageConstants.carModels.BMW[1]}`)

      GaragePage.TopCarInList.milage.should('have.value', milage.tenMiles)

      GaragePage.TopCarInList.updateDate.should('contain.text', AddCarModal.creationDate)
    })

    it('should be forbidden for car with empty/invalid milage', () => {
      AddCarModal.open()
      AddCarModal.selectBrand(garagePageConstants.carBrands[2])
      AddCarModal.selectModel(garagePageConstants.carModels.Ford[2])

      //Empty milage
      AddCarModal.milageInput.focus().blur()
      AddCarModal.milageValidationError.should('have.text', garagePageConstants.errors.emptyMilageOnAddCar)

      //Invalid milage
      AddCarModal.typeMilage(milage.invalidMiles)
      AddCarModal.milageValidationError.should('have.text', garagePageConstants.errors.invalidMilageOnAddCar)

      //Modal is closed, brand input does not exist
      AddCarModal.clickCancelBtn()
      AddCarModal.brandInput.should('not.exist')
    })
  })
})