const Contact = require('../models/contactsModel')

exports.contactPage = async (req, res) => {
    try {
        await res.render('createContact')
    } catch (err) {
        console.log(err)
        await res.render('404')
    }
}

exports.contactEditPage = async (req, res) => {
    try {
        id = req.params.id
        const contactInstance = new Contact()
        contactFromDb = await contactInstance.getOneContact(id)

        await res.render('editContact')
    } catch (err) {
        console.log(err)
        await res.render('404')
    }
}

exports.contactCreate = async (req, res) => {
    try {
        const contactInstance = new Contact(req.body)
        await contactInstance.createContact()

        if (contactInstance.exceptions.length > 0) {
            req.flash('errors', contactInstance.exceptions[0])
            return res.redirect('/contact')
        }

        req.flash('success', 'Contato cadastrado com sucesso')
        return res.redirect('/contact')
    } catch (err) {
        console.log(err)
        await res.render('404')
    }
}

exports.contactDelete = async (req, res) => {
    try {
        const contactInstance = new Contact()
        await contactInstance.deleteContact(req.params.id)

        if (contactInstance.exceptions.length > 0) {
            req.flash('errors', contactInstance.exceptions[0])
            return
        }

        req.flash('success', 'Contato deletado com sucesso')
        return res.redirect('/')
    } catch (err) {
        console.log(err)
        await res.render('404')
    }
}

exports.contactEdit = async (req, res) => {
    try {
        const contactInstance = new Contact(req.body)
        await contactInstance.editContact(req.params.id)

        if (contactInstance.exceptions.length > 0) {
            req.flash('errors', contactInstance.exceptions[0])
            return
        }

        req.flash('success', 'Contato editado com sucesso')
        return res.redirect('/')
    } catch (err) {
        console.log(err)
        await res.render('404')
    }
}