const connection = require('../database/database')
const Info = require('../database/models/Info')

connection.authenticate().then(()=>{
    console.log('Conexão feita com sucesso');
}).catch((err)=>{
    console.log(err);
}) 

class InfoUsuario {
    async store(req, res) {

        const { nome, contaId, saldo } = req.body

        const usuarioExistente = await Info.findOne({
            where: {contaId: contaId}
        })

        if (usuarioExistente) return res.status(400).json({error: 'Usuario existente'})

        Info.create({
            nome: nome, 
            contaId: contaId,
            saldo: saldo
        })

        return res.status(200).json(`Olá ${nome}, seu saldo é de ${saldo}`)
    }
}

export default new InfoUsuario()