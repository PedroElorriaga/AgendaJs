const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        middlename: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: false
        },
        cellphone: {
            type: Number,
            required: true
        }
    }
)

const contactModel = mongoose.model('contact', contactSchema)

class Contact {
    constructor(data) {
        this.data = data,
            this.exceptions = []
    }

    async createContact() {
        if (this.data.name == '' || this.data.middlename == '' || this.data.cellphone == '') {
            this.exceptions.push('Campo vázio')
            return
        }

        if (typeof this.data.cellphone == String) {
            this.exceptions.push('Insira apenas números no telefone')
            return
        }

        const contactFromDb = await contactModel.findOne({ name: this.data.name, middlename: this.data.middlename })

        if (contactFromDb && contactFromDb.cellphone == this.data.cellphone) {
            this.exceptions.push(`O numero ${this.data.cellphone} já esta sendo usado pelo ${this.data.name}`)
            return
        }

        await contactModel.create(this.data)
    }

    async getAllContacts() {
        const datas = await contactModel.find()
        return datas
    }

    async deleteContact(id) {
        if (!id) {
            this.exceptions.push('Erro ao tentar excluir o contato')
            return
        }

        await contactModel.deleteOne({ _id: id })
    }

    async editContact(id) {
        if (!id) {
            this.exceptions.push('Erro ao tentar excluir o contato')
            return
        }

        const updateData = {
            name: this.data.name,
            middlename: this.data.middlename,
            email: this.data.email,
            cellphone: this.data.cellphone
        }

        await contactModel.findByIdAndUpdate(id, updateData)
    }

    async getOneContact(id) {
        if (!id) {
            this.exceptions.push('Erro ao tentar excluir o contato')
            return
        }

        return await contactModel.findOne({ _id: id })
    }
}

module.exports = Contact