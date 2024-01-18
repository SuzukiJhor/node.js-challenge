import AccountValidation from '../validators/AccountValidation'
import UserAccount from '../database/models/UserAccount';
import User from '../database/models/User';

class DepositService {
    async create(data) {
        const accountIsValid = await AccountValidation.validation(data)

        if (!accountIsValid.success) {
            return { error: accountIsValid.error };
        }

        const { userId, value, cpf, cnpj, email } = data

        const existingUser = await User.findOne({
            where: { id: userId },
            where: { cpf },
        });

        if (!existingUser) {
            return {
                error:
                    "non-existent user identifier, try again with a different user",
            };
        }

        const existingAccountUser = await UserAccount.findOne({
            where: { userId },
            where: { cpf }
        })

        if (!existingAccountUser) {
            try {
                await UserAccount.create({
                   userId: existingUser.id,
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
        existingAccountUser.value += value
        return { sucess: true , message: "Account create successfully!"}
    }
}

export default new DepositService()