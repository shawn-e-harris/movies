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
seriesRouter.get("/:productionId/series", function (req, res) {
  seriesApi.getAllSeries().populate('movie') //populate series with movies
    .then((allSeries) => {
      res.render("franchises/allFranchise", {allSeries})
    })
    .catch((error) => {
      console.log(error) //will show error in console
    })
})

// actually create new series
seriesRouter.post("/:productionId/series", function (req, res) {
  seriesApi.addSeries(req.body)
  .then(() => {
    res.redirect("franchises/allFranchise")
  })
  .catch((error) => {
    console.log(error) //will show error in console
  })
})



// create new series route
seriesRouter.get("/:productionId/series/new", function (req, res) {
  seriesApi.addSeries(req.params.seriesId)
    .then((getSeries) => {
      res.send({getSeries})
    })
    .catch((error) => {
      console.log(error) //will show error in console
    })
})

// render createForm
seriesRouter.get("/:productionId/series/add", function (req, res) {
    res.render("franchises/createFranchise", {_productionId: req.params.productionId
    })
})

// get one company by seriesId
seriesRouter.get("/:productionId/series/:seriesId", function (req, res) {
  seriesApi.getOneSeries(req.params.seriesId)
    .then((seriesFromDb) => {
      res.render("franchises/oneFranchise", {_id: req.params.seriesId, seriesFromDb})
    })
    .catch((error) => {
      console.log(error) //will show error in console
    })
})

seriesRouter.put("/:productionId/series/:seriesId", function (req, res) {
  seriesApi.updateSeries(req.params.seriesId, req.body)
  .then(() => {
    res.redirect("/:productionId/series")
  })
  .catch((error) => {
    console.log(error) //will show error in console
  })
})

seriesRouter.delete("/:productionId/series/:seriesId", function (req, res) {
  seriesApi.deleteSeries(req.params.seriesId)
  .then(() => {
    res.redirect("/:productionId/series") //redirects to "/", can use any url, etc.
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
