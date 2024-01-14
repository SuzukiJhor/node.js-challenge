import AccountValidation from '../validators/AccountValidation'
import UserAccount from '../database/models/UserAccount';
import User from '../database/models/User';

class DepositService {
    async create(data) {
        
        const accountIsValid = await AccountValidation.validation(data)
        
        if (!accountIsValid.success) {
            return { error: accountIsValid.error };
        }
        
        const { accountId, value, cpf, cnpj, email } = data.body

        const existingUser = await User.findOne({
            where: { id: accountId },
            where: { cpf },
        });

        if (!existingUser) {
            return {
                error:
                    "the user associated with this account does not exist. Please try again with a account different",
            };
        }

        const existingAccountUser = await UserAccount.findOne({
            where: { accountId },
            where: { cpf }
        })

        if (!existingAccountUser) {
            try {
                await UserAccount.create({
                   accountId: existingUser.id,
                   value,
                    cpf: existingUser.cpf,
                    cnpj,
                    email
                });
            
            } catch (error) {
                return { success: false, error: error.message };
            }
        }

        if (value == '0') {
            return { erro: "The value don't to be zero"}
        }

        

    }
}

export default new DepositService()