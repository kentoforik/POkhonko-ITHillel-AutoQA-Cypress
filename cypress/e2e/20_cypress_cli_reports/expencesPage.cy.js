/// <reference types="cypress" />

import { authHandler } from '../helpers/auth_helper'
import HomePage from '../page-objects/homePage'
import { homePageSelectors } from '../selectors/homePage'

import GaragePage from '../page-objects/garage_page/garagePage'
import AddCarModal from '../page-objects/garage_page/addCarModal'
import { garagePageConstants } from '../constants/garagePage'

import ExpensesPage from '../page-objects/expenses_page/expensesPage'
import AddExpenseModal from '../page-objects/expenses_page/addExpenseModal'
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
    
    //cleaning up the garage before each test
    leftMenu.garage.click()
    GaragePage.removeAllCars()
  })

  it('opens empty when NO expanses added', () => {
    //Adding a car to use them for expenses
    GaragePage.addCarBtn.click()
    AddCarModal.addCar(garagePageConstants.carBrands[3], garagePageConstants.carModels.Porsche[2], milage.oneMile)

    leftMenu.expenses.click()
    ExpensesPage.header.should('have.text', expensesConstants.header)
    ExpensesPage.addExpenseButton.should('have.text', expensesConstants.addExpenseBtn)
    ExpensesPage.expensesTable.should('not.exist')
    ExpensesPage.expensesTableEmptyTitle.should('have.text', expensesConstants.emptyExpensesTitle)
  })

  it('adds expenses to the selected from the list vehicle', () => {
    //Adding a car to use them for expenses
    GaragePage.addCarBtn.click()
    AddCarModal.addCar(garagePageConstants.carBrands[0], garagePageConstants.carModels.Audi[0], milage.oneMile)

    leftMenu.expenses.click()

    ExpensesPage.vehicleList.should('have.text', garagePageConstants.carBrands[0] + ' ' + garagePageConstants.carModels.Audi[0])

    ExpensesPage.addExpenseButton.click()
    AddExpenseModal.header.should('have.text', expensesConstants.addExpenseModal.header)

    //filling the Add expense modal
    AddExpenseModal.addExpenses(
      garagePageConstants.carBrands[0] + ' ' + garagePageConstants.carModels.Audi[0], 
      dates.currentDate, 
      milage.tenMiles, 
      litres.oneLitre, 
      costs.oneDollar
    )

    //Verifying the added expense in the table
    AddExpenseModal.header.should('not.exist')
    ExpensesPage.expensesTable.within(() => {
      cy.get('td').contains(dates.currentDate).should('exist')
      cy.get('td').contains(milage.tenMiles).should('exist')
      cy.get('td').contains(`${litres.oneLitre}L`).should('exist')
      cy.get('td').contains(`${costs.oneDollar}`).should('exist')
    })
  })


  it('forbids adding expenses with empty required fields', () => {
    GaragePage.addCarBtn.click()
    AddCarModal.addCar(garagePageConstants.carBrands[1], garagePageConstants.carModels.BMW[1], milage.oneMile)

    leftMenu.expenses.click()
    ExpensesPage.addExpenseButton.click()
    AddExpenseModal.milage.clear()
    AddExpenseModal.litres.clear()
    AddExpenseModal.totalCost.clear().blur()

    AddExpenseModal.milageError.should('have.text', expensesConstants.addExpenseModal.errors.emptyMilage)
    AddExpenseModal.litresError.should('have.text', expensesConstants.addExpenseModal.errors.emptyLiters)
    AddExpenseModal.totalCostError.should('have.text', expensesConstants.addExpenseModal.errors.emptyTotalCost)

    AddExpenseModal.submitBtn.should('be.disabled')
    AddExpenseModal.cancel()
  })

  it('forbids adding expenses with invalid required fields', () => {
    GaragePage.addCarBtn.click()
    AddCarModal.addCar(garagePageConstants.carBrands[2], garagePageConstants.carModels.Ford[2], milage.oneMile)

    leftMenu.expenses.click()
    ExpensesPage.addExpenseButton.click()
    AddExpenseModal.addExpenses(
      garagePageConstants.carBrands[2] + ' ' + garagePageConstants.carModels.Ford[2], 
      dates.currentDate, 
      milage.invalidMiles, 
      litres.invalidLitres, 
      costs.invalidCost
    )

    AddExpenseModal.submitBtn.should('be.disabled')
    AddExpenseModal.cancelBtn.focus()
    AddExpenseModal.milageError.should('have.text', expensesConstants.addExpenseModal.errors.invalidMilage)
    AddExpenseModal.litresError.should('have.text', expensesConstants.addExpenseModal.errors.invalidLiters)
    AddExpenseModal.totalCostError.should('have.text', expensesConstants.addExpenseModal.errors.invalidTotalCost)

    AddExpenseModal.cancel()
  })
})