import createUser from "../database/models/createUser";
import UserValidation from "../validators/UserValidation";

class UserService {
    async createUser(user) {
        const userIsValid = await UserValidation.validationRegister(user);

        if (!userIsValid.success) {
            return { error: userIsValid.error };
        }

        const { name, lastname, cpf, cnpj, email, password } = user;

        const existingUser = await createUser.findOne({
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
            await createUser.create({
                name,
                lastname,
                cpf,
                cnpj,
                email,
                password,
            });
        
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }
}

export default new UserService();
