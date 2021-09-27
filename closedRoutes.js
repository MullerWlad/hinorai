import express from 'express'

export var closingRoutes = (tabu) => {
    var closedRoutes = express.Router()
    for (var i = 0; i < tabu.length; i++) {
        closedRoutes.use(tabu.getData(i), (req, res) => {
            res.redirect("/")
        })
    }
    return closedRoutes
}