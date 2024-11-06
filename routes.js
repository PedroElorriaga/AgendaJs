const express = require('express')
const route = express.Router()
const homeController = require('./src/controllers/homeController')
const loginController = require('./src/controllers/loginController')
const contactController = require('./src/controllers/contactController')

// HOME ROUTES
route.get('/', homeController.homePage)

// LOGIN ROUTES
route.get('/login', loginController.loginPage)
route.post('/login/create', loginController.loginCreate)
route.post('/login/in', loginController.loginIn)
route.get('/logout', loginController.logout)

// CONTACT ROUTES
route.get('/contact', contactController.contactPage)
route.post('/contact/create', contactController.contactCreate)
route.get('/contact/delete/:id', contactController.contactDelete)
route.get('/contact/:id', contactController.contactEditPage)
route.post('/contact/edit/:id', contactController.contactEdit)

module.exports = route