const Login = require('../models/loginModel')

exports.loginPage = async (req, res) => {
    await res.render('login')
}

exports.loginCreate = async (req, res) => {
    try {
        const loginInstance = new Login(req.body)
        await loginInstance.createData()

        if (loginInstance.exceptions.length > 0) {
            req.flash('errors', `${loginInstance.exceptions[0]}`)
            return res.redirect('/login')
        }

        req.flash('success', 'Conta criada com sucesso, faça o primeiro login')
        return res.redirect('/login')
    } catch (err) {
        console.log(err)
        await res.render('404')
    }
}

exports.loginIn = async (req, res) => {
    try {
        const loginInstance = new Login(req.body)
        await loginInstance.loginUser()

        if (loginInstance.exceptions.length > 0) {
            req.flash('errors', `${loginInstance.exceptions[0]}`)
            return res.redirect('/login')
        }

        req.session.user = req.body.email
        req.flash('success', 'Logado com sucesso')
        return res.redirect('/')
    } catch (err) {
        console.log(err)
        await res.render('404')
    }
}

exports.logout = async (req, res) => {
    req.session.user = null
    req.flash('success', 'Usuário deslogado com sucesso')
    return res.redirect('/login')
}