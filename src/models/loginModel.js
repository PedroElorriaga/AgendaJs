const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('email-validator')

const loginSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        }
    }
)

const loginModel = mongoose.model('Login', loginSchema)

class Login {
    constructor(data) {
        this.data = data,
            this.exceptions = []
    }

    async createData() {
        if (this.data.email == '' || this.data.password == '') {
            this.exceptions.push('Campo vázio')
            return
        }

        if (!validator.validate(this.data.email)) {
            this.exceptions.push('Email inválido')
            return
        }

        const userFromDb = await loginModel.findOne({ email: this.data.email })

        if (userFromDb) {
            this.exceptions.push('Usuário ja existe')
            return
        }

        await this.hashPassword()

        if (this.exceptions.length > 0) {
            return
        }

        await loginModel.create(this.data)
    }

    async hashPassword() {
        try {
            const saltRounds = 10
            const salt = await bcrypt.genSalt(saltRounds)
            const hash = await bcrypt.hash(this.data.password, salt)

            return this.data.password = hash
        } catch (err) {
            console.log(err)
            this.exceptions.push(err)
        }
    }

    async loginUser() {
        if (this.data.email == '' || this.data.password == '') {
            this.exceptions.push('Campo vázio')
            return
        }

        const user = await loginModel.findOne({ email: this.data.email })

        if (!user) {
            this.exceptions.push('Email ou senha incorreto')
            return
        }

        await this.decryptPassword(user.password)
    }

    async decryptPassword(password) {
        try {
            if (!bcrypt.compareSync(this.data.password, password)) {
                this.exceptions.push('Email ou senha incorreto')
                return
            }
        } catch (err) {
            console.log(err)
            this.exceptions.push(err)
        }
    }
}

module.exports = Login