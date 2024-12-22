import { milage } from '../20_cypress_cli_reports/test_data';

export const garagePageSelectors = {
  header: 'div.panel-page > div > h1',
  addCarButton: 'button.btn-primary:contains(\'Add car\')',

  addCarModal: {
    brandInput: 'select#addCarBrand',
    modelInput: 'select#addCarModel',
    milageInput: '#addCarMileage',
    addBtn: 'div.modal-footer > button.btn-primary:contains(\'Add\')',
    cancelBtn: 'div.modal-footer > button.btn-secondary:contains(\'Cancel\')',
    milageValidationError: 'div.invalid-feedback'
  },

  carsListItem: {
    container: 'div.car.jumbotron',
    carName: 'p.car_name.h2',
    milage: 'input[name="miles"]',
    milageUpdateDate: '.car_update-mileage',
    editBtn: 'span.icon.icon-edit'
  }
}