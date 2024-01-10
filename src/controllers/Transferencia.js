const Info = require('../database/models/Info')
const CriarUsuario = require('../database/models/CriarUsuario')

class Transferencia {

    async update(req, res) {
        const { enviar, receber, valor } = req.body

        const usuarioEnviou = await Info.finOne({
            where: {id: enviar}
        })

        if (usuarioEnviou.saldo < valor) return res.status(400).json({error: 'Nao tem saldo Suficiente'}) 

        const usuarioReceber = await Info.finOne({
            where: {id:receber}
        })

        if (!usuarioReceber) return res.status(400).json({error: "usuario não encontrado, transferencia mal sucedida"})
        
        usuarioEnviou.saldo -= valor
        usuarioReceber += valor

        await usuarioEnviou.save()
        await usuarioReceber.save()
    }
}

export default new Transferencia()