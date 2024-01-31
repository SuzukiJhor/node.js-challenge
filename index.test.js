import assert from 'assert'
import User from './src/database/models/User.js'
import UserService from './src/services/UserService.js'


// should throw an error when cpf is less than 11 characters long
{
    const params = {
    name : "Alex",
    lastname : "Poatan",
    cpf : "55555555555",
    cnpj : "55555555555",
    email : "alex@email.com",
    password : "123456",
    businessman: false
    }

    const user = new User()

    user.create(params)
}