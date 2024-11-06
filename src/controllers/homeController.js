const Contact = require('../models/contactsModel')

exports.homePage = async (req, res) => {
    try {
        const contactInstance = new Contact(req.session)
        res.locals.contacts = await contactInstance.getAllContacts()

        await res.render('index')
    } catch (err) {
        console.log(err)
        await res.render('404')
    }

}
