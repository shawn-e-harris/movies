/* Step 1 import express
 *
 */
const express = require('express')

/* Step 2
 *
 * Import the api files from the models
 *
 * TODO: change the file path to the models file you'll need to use.
 * TODO: rename this from `seriesApi` to something more sensible (e.g:
 * `shopsAPI`)
 *
 * NOTE: You may need to import more than one API to create the 
 * controller you need.
 * 
 */
const seriesApi = require('../models/series.js')

/* Step 3 
 * 
 * Create a new router.
 *
 * the router will "contain" all the request handlers that you define in this file.
 * TODO: rename this from templateRouter to something that makes sense. (e.g:
 * `shopRouter`)
 */
const seriesRouter = express.Router()

/* Step 4
 * 
 * TODO: Put all request handlers here
 */

// get all franchises
seriesRouter.get("/", function (req, res) {
  seriesApi.getAllSeries()
    .then((allProductions) => {
      res.render("franchises/allFranchises", { allProductions })
    })
    .catch((error) => {
      console.log(error) //will show error in console
    })
})



// create new company
seriesRouter.get("/new", function (req, res) {
  seriesApi.addSeries(req.params.seriesId)
    .then((getSeries) => {
      res.send({ getSeries })
    })
    .catch((error) => {
      console.log(error) //will show error in console
    })
})

// render createForm
seriesRouter.get("/add", function (req, res) {
    res.render("franchises/createFranchises", {})
})

// get one company by seriesId
seriesRouter.get("/:seriesId", function (req, res) {
  seriesApi.getOneSeries(req.params.seriesId)
    .then((seriesFromDb) => {
      res.render("franchises/oneFranchise", {_id: req.params.seriesId, seriesFromDb})
    })
    .catch((error) => {
      console.log(error) //will show error in console
    })
})

seriesRouter.post("/", function (req, res) {
  seriesApi.addSeries(req.body)
  .then(() => {
    res.redirect("/")
  })
  .catch((error) => {
    console.log(error) //will show error in console
  })
})

seriesRouter.put("/:seriesId", function (req, res) {
  console.log('seriesRouter - PUT - req.body', req.body)
  seriesApi.updateSeries(req.params.seriesId, req.body)
  .then(() => {
    res.redirect("/")
  })
  .catch((error) => {
    console.log(error) //will show error in console
  })
})

seriesRouter.delete("/:seriesId", function (req, res) {
  seriesApi.deleteSeries(req.params.seriesId)
  .then(() => {
    res.redirect("/") //redirects to "/", can use any url, etc.
  })
  .catch((error) => {
    console.log(error) //will show error in console
  })
})

/* Step 6
 *
 * Export the router from the file.
 *
 */
module.exports = {
  seriesRouter
}