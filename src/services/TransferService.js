import UserAccount from "../database/models/UserAccount";
import User from "../database/models/User";
import TransferValidation from "../validators/TransferValidation";

class TransferService {
  async update(data) {
    const transferIsValid = await TransferValidation.validation(data);

    if (!transferIsValid) {
      return { error: transferIsValid.error };
    }

    const { sendId, receiveId, value } = data;

    const existingSendingAccount = await UserAccount.findOne({
      where: { userId: sendId },
    });

    const existingReceivingAccount = await UserAccount.findOne({
      where: { userId: receiveId },
    });

    if (!existingSendingAccount || !existingReceivingAccount) {
      return {
        success: false,
        error:
          "One or both user identifiers do not exist. Please try again with valid user identifiers.",
      };
    }

    existingSendingAccount.value -= value;

    if (existingSendingAccount.value < 0) {
      existingSendingAccount.value += value;
      return {
        success: false,
        error: "insufficient funds",
      };
    }

    existingReceivingAccount.value += value;

    await existingSendingAccount.save();
    await existingReceivingAccount.save();

    const userReceiving = await User.findOne({
        where: {
          id: existingReceivingAccount.userId,
        },
      });

    return ({ success: true, message: `${value} was transferred to user ${userReceiving.name} ${userReceiving.lastname}` });
  }
}

export default new TransferService();
