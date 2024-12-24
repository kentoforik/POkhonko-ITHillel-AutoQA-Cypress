export const garagePageConstants = {
  path: 'panel/garage',

  header: 'Garage',
  addCarButton: 'Add car',
  
  carBrands: ['Audi', 'BMW', 'Ford', 'Porsche', 'Fiat'],
  carModels: {
    Audi: ['TT', 'R8', 'Q7', 'A6', 'A8'],
    BMW: ['3', '5', 'X5', 'X6', 'Z3'],
    Ford: ['Fiesta', 'Focus', 'Fusion', 'Mondeo', 'Sierra'],
    Porsche: ['911', 'Cayenne', 'Panamera'],
    Fiat: ['Palio', 'Ducato', 'Panda', 'Punto', 'Scudo']
  },

  errors: {
    emptyMilageOnAddCar: 'Mileage cost required',    //This text is invalid on it's own sense
    invalidMilageOnAddCar: 'Mileage has to be from 0 to 999999'
  }
}