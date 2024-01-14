import User from "../database/models/User";
import UserValidation from "../validators/UserValidation";

class UserService {
    async create(user) {
        const userIsValid = await UserValidation.validationRegister(user);

        if (!userIsValid.success) {
            return { error: userIsValid.error };
        }

        const { name, lastname, cpf, cnpj, email, password, businessman } = user;

        const existingUser = await User.findOne({
            where: { email },
            where: { cpf },
        });

        if (existingUser) {
            return {
                error:
                    "This user already exists. Please try again with a different user",
            };
        }

        if (cpf.length === 0) {
            return { error: "CPF Invalid" };
        }

        try {
            await User.create({
                name,
                lastname,
                cpf,
                cnpj,
                email,
                password,
                businessman
            });
        
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }
}

export default new UserService();
