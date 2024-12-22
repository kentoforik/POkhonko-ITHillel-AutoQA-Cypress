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

  after(() => {
    //cleaning up the garage after each test
    leftMenu.garage.click()
    GaragePage.removeAllCars()
  })

  it('opens empty when NO expanses added', () => {
    //Adding a car to use them for expenses
    AddCarModal.open()
    AddCarModal.selectBrand(garagePageConstants.carBrands[3])
    AddCarModal.selectModel(garagePageConstants.carModels.Porsche[2])
    AddCarModal.typeMilage(milage.oneMile)
    AddCarModal.clickAddBtn()

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
      cy.get('td').contains(`${costs.oneDollar}`).should('exist')
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

  it('forbids adding expenses with invalid required fields', () => {
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