/// <reference types="cypress" />

import { path } from '../../../apiPath'
import { car as carData, expenseInitial } from '../../test-data'
import { apiErrorMessages } from '../../../constants/api'

describe('GET /expenses', () => {
  let sidValueGlobal;
  let carId;
  let expenseId;

  const currentDate = new Date();
  const reportedDate = currentDate.toISOString().split('T')[0];


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

    //creating a car and adding expense for it
    cy.request({
      method: 'POST',
      url: path.cars.car,
      body: carData
    })
      .then(carResponse => {
        carId = carResponse.body.data.id

        const expenseData = {
          carId: carId,
          reportedAt: reportedDate,
          ...expenseInitial
        }

        //chaining this 'create expense' request because of Cy asynchronous
        cy.request({
          method: 'POST',
          url: path.expenses,
          body: expenseData
        })
          .then(expenseResponse => {
            expenseId = expenseResponse.body.data.id
          })
      })
  })

  after(() => {
    //Cleaning up garage from test cars
    cy.request({
      method: 'DELETE',
      url: `${path.cars.car}/${carId}`,
      headers: { 'Cookie': sidValueGlobal },
    })
  })

  it('returns expense by id', () => {
    cy.request({
      method: 'GET',
      url: `${path.expenses}/${expenseId}`,
      headers: { 'Cookie': sidValueGlobal },
    })
      .then(response => {
        expect(response.status).to.eq(200)
        expect(response.body.data.id).to.eq(expenseId)
        expect(response.body.data.carId).to.eq(carId)
        expect(response.body.data.reportedAt).to.eq(reportedDate)
        expect(response.body.data.mileage).to.eq(expenseInitial.mileage)
        expect(response.body.data.liters).to.eq(expenseInitial.liters)
        expect(response.body.data.totalCost).to.eq(expenseInitial.totalCost)
      })
  })

  it('does not return expense for non-existing id', () => {
    cy.request({
      method: 'GET',
      url: `${path.expenses}/-1`,
      headers: { 'Cookie': sidValueGlobal },
      failOnStatusCode: false
    })
      .then(response => {
        expect(response.status).to.eq(404)
        expect(response.body.message).to.eq(apiErrorMessages.expenses.notFound)
      })
  })
})