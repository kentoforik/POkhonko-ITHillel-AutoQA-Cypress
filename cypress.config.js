const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    video: true,
    defaultBrowser: 'chrome',
    chromeWebSecurity: false,
    retries: {
      runMode: 2,
      openMode: 1,
    },
    
    excludeSpecPattern: "./cypress/e2e/17_cypress_intro/**/*.js" //change this for each HW
  },

});
