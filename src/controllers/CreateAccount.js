import * as Yup from 'yup'
import connection from '../database/database'
import criarUsuario from '../database/models/CriarUsuario'


connection.authenticate().then(()=>{
    console.log('connection successs');
}).catch((err)=>{
    console.log(err);
})
class CreateAccount {

    async store(req, res) {

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            sobrenome: Yup.string().required(),
            cpf: Yup.string().required(),
            cnpj: Yup.string().notRequired(),
            email: Yup.string().required(),
            senha: Yup.string().required()
        })

        try {
            await schema.isValid(req.body, {abortEarly: true})
        } catch (err) {
            return res.status(200).json({message:err})
        }

        const {nome, sobrenome, cpf, cnpj, email, senha} = req.body
    }
}