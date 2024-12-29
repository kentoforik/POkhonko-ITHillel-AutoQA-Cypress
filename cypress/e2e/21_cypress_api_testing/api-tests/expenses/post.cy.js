/// <reference types="cypress" />

import { path } from '../../../apiPath'
import { car as carData, expenseInitial } from '../../test-data'
import { apiErrorMessages } from '../../../constants/api'

describe('POST /expenses', () => {
  let sidValueGlobal;
  let carId;
  const currentDate = new Date()
  const reportedDate = currentDate.toISOString().split('T')[0]

  before(() => {
    const loginData = {
      email: Cypress.env('username'),
      password: Cypress.env('password'),
      remember: false
    }

    // Authorizing and getting cookie for further requests
    cy.request({
      method: 'POST',
      url: path.auth.signin,
      body: loginData
    })
      .then(response => {
        sidValueGlobal = response.headers['set-cookie'][0].split(';')[0]
      })

    //creating a car to add expense for it
    cy.request({
      method: 'POST',
      url: path.cars.car,
      body: carData
    }).then(response => {
      carId = response.body.data.id
    })
  })

  after(() => {       //Cleaning up garage from test cars
    cy.request({
      method: 'DELETE',
      url: `${path.cars.car}/${carId}`,
      headers: { 'Cookie': sidValueGlobal },
    })
  })

  //creates a new expense with the valid data
  it('creates a new expense with the valid data', () => {
    const expenseData = {
      carId: carId,
      reportedAt: reportedDate,
      ...expenseInitial
    }

    cy.request({
      method: 'POST',
      url: path.expenses,
      headers: { 'Cookie': sidValueGlobal },
      body: expenseData
    })
      .then(response => {
        expect(response.status).to.eq(200)
        expect(response.body.data.id).to.be.greaterThan(0)
        expect(response.body.data.carId).to.eq(carId)
        expect(response.body.data.reportedAt).to.eq(reportedDate)
        expect(response.body.data.mileage).to.eq(expenseData.mileage)
        expect(response.body.data.liters).to.eq(expenseData.liters)
        expect(response.body.data.totalCost).to.eq(expenseData.totalCost)
      })
  })

  it('does not create expense for non-existing car', () => {
    const expenseData = {
      carId: -1,
      reportedAt: reportedDate,
      ...expenseInitial
    }
    cy.request({
      method: 'POST',
      url: path.expenses,
      headers: { 'Cookie': sidValueGlobal },
      body: expenseData,
      failOnStatusCode: false
    })
      .then(response => {
        expect(response.status).to.eq(404)
        expect(response.body.message).to.eq(apiErrorMessages.cars.notFound)
      })
  })

  it('does not create expense with date before car was created', () => {
    const expenseData = {
      carId: carId,
      reportedAt: 2023,
      ...expenseInitial
    }
    cy.request({
      method: 'POST',
      url: path.expenses,
      headers: { 'Cookie': sidValueGlobal },
      body: expenseData,
      failOnStatusCode: false
    })
      .then(response => {
        expect(response.status).to.eq(400)
        expect(response.body.message).to.contain(apiErrorMessages.expenses.invalidDate)
      })
  })
})