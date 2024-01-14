import connection from '../database/database'
import UserService from '../services/UserService';


connection.authenticate().then(() => {
    console.log('conexão com sucesso!');
}).catch((err) => {
    console.log(err);
})
class UserController {

    async store(req, res) {
        const user = req.body

        const newUser = await UserService.create(user)

        return newUser.success ?
            res.status(200).json({ message: 'User create sucess.', user: newUser }) :
            res.status(400).json({ error: "error when registering user..", message: newUser.error })
    }
}

export default new UserController()