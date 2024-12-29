/// <reference types="cypress" />

import { path } from '../../../apiPath'
import { car as carData, expenseInitial } from '../../test-data'

describe('DELETE /expenses', () => {
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

        //chaining this request because of Cy asynchronous
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

  it('deletes the expense by id', () => {
    cy.request({
      method: 'DELETE',
      url: `${path.expenses}/${expenseId}`,
      headers: { 'Cookie': sidValueGlobal }
    })
  })
})