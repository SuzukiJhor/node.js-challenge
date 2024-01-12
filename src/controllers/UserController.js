import * as Yup from 'yup'
import connection from '../database/database'
import criarUsuario from '../database/models/CriarUsuario'


connection.authenticate().then(()=>{
    console.log('conexão com sucesso!');
}).catch((err)=>{
    console.log(err);
})
class UserController {

    async store(req, res) {
        
        const {nome, sobrenome, cpf, cnpj, email, senha} = req.body

        const usuarioExistente = await criarUsuario.findOne({
            where: {email},
            where: {cpf}
        })

        if (usuarioExistente) {
            return res.status(200).json({error: 'Esse usuario ja existe, tente novamente com outro usuário'})
        }

        cpf.length ? console.log('cpf válido') : res.status(400).json({message: 'cpf inválido'});

        criarUsuario.create({
            nome: nome,
            sobrenome: sobrenome,
            cpf: cpf,
            cnpj: cnpj,
            email: email,
            senha: senha
            
        })

        return res.status(200).json({message: 'Usuario criado com sucesso!'})
    }
}

export default new UserController()