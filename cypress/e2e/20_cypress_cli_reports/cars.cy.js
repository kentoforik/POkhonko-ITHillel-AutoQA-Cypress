/// <reference types="cypress" />

import { authHandler } from '../helpers/auth_helper'
import HomePage from '../page-objects/homePage'
import { homePageSelectors } from '../selectors/homePage'

import GaragePage from '../page-objects/garage_page/garagePage'
import AddCarModal from '../page-objects/garage_page/addCarModal'
import { garagePageConstants } from '../constants/garagePage'

import expensesPage from '../page-objects/expenses_page/expensesPage'
import addExpenseModal from '../page-objects/expenses_page/addExpenseModal'
import { expensesConstants } from '../constants/expansesPage'

import leftMenu from '../page-objects/leftMenu'

import { milage, dates, litres, costs } from './test_data'

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


describe('Expenses page', () => {
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

  it('opens empty when NO expanses added', () => {
    leftMenu.expenses.click()
    expensesPage.header.should('have.text', expensesConstants.header)
    expensesPage.addExpenseButton.should('have.text', expensesConstants.addExpenseBtn)
    expensesPage.expensesTable.should('not.exist')
    expensesPage.expensesTableEmptyTitle.should('have.text', expensesConstants.emptyExpensesTitle)
  })

  it('adds expenses to the selected from the list vehicle', () => {
    //Adding a car to use them for expenses
    AddCarModal.open()
    AddCarModal.selectBrand(garagePageConstants.carBrands[3])
    AddCarModal.selectModel(garagePageConstants.carModels.Porsche[2])
    AddCarModal.typeMilage(milage.oneMile)
    AddCarModal.clickAddBtn()

    leftMenu.expenses.click()

    expensesPage.vehicleList.should('have.text', garagePageConstants.carBrands[3] + ' ' + garagePageConstants.carModels.Porsche[2])

    expensesPage.addExpenseButton.click()
    addExpenseModal.header.should('have.text', expensesConstants.addExpenseModal.header)

    //filling the Add expense modal
    addExpenseModal.selectVehicle(garagePageConstants.carBrands[3] + ' ' + garagePageConstants.carModels.Porsche[2])
    addExpenseModal.typeDate(dates.currentDate)
    addExpenseModal.typeMilage(milage.tenMiles)
    addExpenseModal.typeLitres(litres.oneLitre)
    addExpenseModal.typeTotalCost(costs.oneDollar)
    addExpenseModal.submit()

    //Verifying the added expense in the table
    addExpenseModal.header.should('not.exist')
    expensesPage.expensesTable.within(() => {
      cy.get('td').contains(dates.currentDate).should('exist')
      cy.get('td').contains(milage.tenMiles).should('exist')
      cy.get('td').contains(`${litres.oneLitre}L`).should('exist')
      cy.get('td').contains(`${costs.oneDollar} USD`).should('exist')
    })
  })


  it('forbids adding expenses with empty required fields', () => {
    AddCarModal.open()
    AddCarModal.selectBrand(garagePageConstants.carBrands[3])
    AddCarModal.selectModel(garagePageConstants.carModels.Porsche[2])
    AddCarModal.typeMilage(milage.oneMile)
    AddCarModal.clickAddBtn()

    leftMenu.expenses.click()
    expensesPage.addExpenseButton.click()
    addExpenseModal.milage.clear()
    addExpenseModal.litres.clear()
    addExpenseModal.totalCost.clear().blur()

    addExpenseModal.milageError.should('have.text', expensesConstants.addExpenseModal.errors.emptyMilage)
    addExpenseModal.litresError.should('have.text', expensesConstants.addExpenseModal.errors.emptyLiters)
    addExpenseModal.totalCostError.should('have.text', expensesConstants.addExpenseModal.errors.emptyTotalCost)

    addExpenseModal.submitBtn.should('be.disabled')
    addExpenseModal.cancel()
  })

  it.only('forbids adding expenses with invalid required fields', () => {
    AddCarModal.open()
    AddCarModal.selectBrand(garagePageConstants.carBrands[3])
    AddCarModal.selectModel(garagePageConstants.carModels.Porsche[2])
    AddCarModal.typeMilage(milage.oneMile)
    AddCarModal.clickAddBtn()

    leftMenu.expenses.click()
    expensesPage.addExpenseButton.click()
    addExpenseModal.typeMilage(milage.invalidMiles)
    addExpenseModal.typeLitres(litres.invalidLitres)
    addExpenseModal.typeTotalCost(costs.invalidCost)
    addExpenseModal.totalCost.blur()

    addExpenseModal.milageError.should('have.text', expensesConstants.addExpenseModal.errors.invalidMilage)
    addExpenseModal.litresError.should('have.text', expensesConstants.addExpenseModal.errors.invalidLiters)
    addExpenseModal.totalCostError.should('have.text', expensesConstants.addExpenseModal.errors.invalidTotalCost)

    addExpenseModal.submitBtn.should('be.disabled')
    addExpenseModal.cancel()
  })
})