/// <reference types="cypress" />

import { path } from '../../../apiPath'
import { car as carData, expenseInitial, expenseEdited } from '../../test-data'
import { apiErrorMessages } from '../../../constants/api'

describe('PUT /expenses', () => {
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

  it('changes expense with valid data', () => {
    const expenseChangingData = {
      carId: carId,
      reportedAt: reportedDate,
      ...expenseEdited
    }

    cy.request({
      method: 'PUT',
      url: `${path.expenses}/${expenseId}`,
      headers: { 'Cookie': sidValueGlobal },
      body: expenseChangingData
    })
      .then(response => {
        expect(response.status).to.eq(200)
        expect(response.body.data.id).to.eq(`${expenseId}`)
        expect(response.body.data.carId).to.eq(carId)
        expect(response.body.data.reportedAt).to.eq(reportedDate)
        expect(response.body.data.mileage).to.eq(expenseEdited.mileage)
        expect(response.body.data.liters).to.eq(expenseEdited.liters)
        expect(response.body.data.totalCost).to.eq(expenseEdited.totalCost)
      })
  })


  it('does not update the expense for non-existing expense id', () => {
    const expenseChangingData = {
      carId: carId,
      reportedAt: reportedDate,
      ...expenseEdited
    }

    cy.request({
      method: 'PUT',
      url: `${path.expenses}/-1`,
      headers: { 'Cookie': sidValueGlobal },
      body: expenseChangingData,
      failOnStatusCode: false
    })
      .then(response => {
        expect(response.status).to.eq(404)
        expect(response.body.message).to.eq(apiErrorMessages.expenses.notFound)
      })
  })

  //does not update the expense for non-existing carId
  it('does not update the expense for non-existing carId id', () => {
    const expenseChangingData = {
      carId: -1,
      reportedAt: reportedDate,
      ...expenseEdited
    }

    cy.request({
      method: 'PUT',
      url: `${path.expenses}/${expenseId}`,
      headers: { 'Cookie': sidValueGlobal },
      body: expenseChangingData,
      failOnStatusCode: false
    })
      .then(response => {
        expect(response.status).to.eq(404)
        expect(response.body.message).to.eq(apiErrorMessages.cars.notFound)
      })
  })
})