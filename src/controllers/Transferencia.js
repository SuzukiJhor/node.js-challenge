const Info = require('../database/models/Info')

const CriarUsuario = require('../database/models/CriarUsuario')

class Transferencia {

    async update(req, res) {
        const { enviar, receber, valor } = req.body

        const usuarioEnviou = await Info.findOne({
            where: {id: enviar}
        })

        if (!usuarioEnviou) return res.status(400).json({error: "usuario que envia não encontrado, transferencia mal sucedida"})

        if (usuarioEnviou.saldo < valor) return res.status(400).json({error: 'Nao tem saldo Suficiente'}) 

        const usuarioReceber = await Info.finOne({
            where: {id:receber}
        })

        if (!usuarioReceber) return res.status(400).json({error: "usuario não encontrado, transferencia mal sucedida"})
        
        usuarioEnviou.saldo -= valor
        usuarioReceber += valor

        await usuarioEnviou.save()
        await usuarioReceber.save()

        return res.status(201).json({message: `Foi transferido ${valor} para o usuario ${receber}`})
    }
}

export default new Transferencia()