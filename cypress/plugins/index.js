// / <reference types="cypress" />
const moviesApi =require('../../models/movies') 
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
  on('task', {
    checkMovie () {
      console.log(moviesApi.getAllMovie())
      return moviesApi.getAllMovie()
    }
  })
  on('task', {
    deleteMovies () {
      console.log(moviesApi.deleteAllMovies())
      return moviesApi.deleteAllMovies()
    }
  })
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
}
