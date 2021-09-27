import express from 'express'
import path from 'path'
import nodeSassMiddleware from 'node-sass-middleware'

import { OnebindedLinear } from './OnebindedLinear/OnebindedLinear.js'
import { closingRoutes } from './closedRoutes.js'
import * as middle from './readers.js'


//initialising
const __dirname = path.resolve()
const app = express()
app.use(
    nodeSassMiddleware({
        src: path.resolve(__dirname, "public"),
        dest: path.resolve(__dirname, "public"),
        debug: true
    })
)
app.use(express.static(path.resolve(__dirname, 'public')))
const PORT = 3030

//setting views for api, directory views --> directory pug
app.set("view engine", "pug")
app.set("views", path.resolve("public", "pug"))

//setting the closed routes for /
const homeTabu = new OnebindedLinear()
homeTabu.appendNew("/css/**")
homeTabu.appendNew("/pug/**")
homeTabu.appendNew("/js/**")
homeTabu.appendNew("/resource/**")
homeTabu.appendNew("/in")
homeTabu.appendNew("/up")
app.use('/', closingRoutes(homeTabu))

//home get, because of setting views for api
app.get('/', (req, res) => {
    res.render('home')
})
app.get('/in', (req, res) => {
    res.render('auth')
})
app.get('/up', (req, res) => {
    res.render('sign')
})

//reg / auth
var login = null
var status = null
app.use(express.urlencoded({extended: false}))
app.post("/up", (req, res) => {
    if(middle.signUp(req.body.login, req.body.password, req.body.key)){
        login = req.body.login
        status = "default"
        res.redirect('/console')
    }
    else{
        res.redirect("/up")
    }
})
app.post("/in", (req, res) => {
    if (middle.signIn(req.body.login, req.body.password)) {
        login = req.body.login
        status = middle.getData()[req.body.login].status
        res.redirect('/console')
    }
    else{
        res.redirect("/in")
    }
})
app.get('/console', (req, res) => {
    if (login !== null && status !==null) {
        res.render('console', {
            name: login,
            status: status
        })
    }
    else{
        res.redirect('/')
    }
})
app.post("/console", (req, res) => {
    login = null
    status = null
    res.redirect("/")
})

//listening
app.listen(PORT, () => {
    console.log(`Working at port ${PORT}...`)
})