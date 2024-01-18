import DepositService from "../services/DepositService";
import connection from "../database/database";

connection.authenticate().then(() => {
    console.log('conexão com sucesso!');
}).catch((err) => {
    console.log(err);
})

class DepositController {
    async store(req, res) {
        const deposit = req.body

        const newDeposit = await DepositService.create(deposit)

        return newDeposit.success ? 
            res.status(200).json({ success: 'Deposit made successfully', message: newDeposit.success }) :
            res.status(400).json({ error: "error when making deposit..", message: newDeposit.error })

    }
}

export default new DepositController()