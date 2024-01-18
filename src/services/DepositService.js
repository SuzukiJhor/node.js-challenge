import AccountValidation from "../validators/AccountValidation";
import UserAccount from "../database/models/UserAccount";
import User from "../database/models/User";
const { Op } = require("sequelize");

class DepositService {
  async show(data) {
    const { accountId, cpf } = data;
    const account = await UserAccount.findOne({
    where: {
        [Op.and]: [{ id: accountId }, { cpf }],
    },
    });

    if (!account) {
      return {
        success: false,
        error:
          "error finding user account",
      };
    }
    return { success: true, message: account };
  }
  async create(data) {
    const accountIsValid = await AccountValidation.validation(data);

    if (!accountIsValid.success) {
      return { error: accountIsValid.error };
    }

    const { userId, value, cpf, cnpj, email } = data;

    const existingUser = await User.findOne({
      where: {
        [Op.and]: [{ id: userId }, { cpf }],
      },
    });

    if (!existingUser) {
      return {
        success: false,
        error: "non-existent user identifier, try again with a different user",
      };
    }

    const existingAccountUser = await UserAccount.findOne({
      where: { userId },
    });

    if (!existingAccountUser) {
      try {
        await UserAccount.create({
          userId: existingUser.id,
          value: value ?? null,
          cpf: cpf ?? null,
          cnpj: cnpj ?? null,
          email: email ?? null,
        });
        return { success: true, message: "Account create successfully!" };
      } catch (error) {
        return { success: false, error: error.message };
      }
    }

    if (value == "0") {
      return { erro: "The value don't to be zero" };
    }

    existingAccountUser.value += value;

    try {
      await existingAccountUser.save();
      return { success: true, message: "Update successful" };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}

export default new DepositService();
