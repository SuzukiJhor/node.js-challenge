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

    const sendingAccount = await this.findUserAccount(sendId);

    const receivingAccount = await this.findUserAccount(receiveId);

    if (!sendingAccount || !receivingAccount) {
      return {
        success: false,
        error:
          "One or both user identifiers do not exist. Please try again with valid user identifiers.",
      };
    }

    const userReceiving = await this.findUser(receivingAccount.userId);
    const userSending = await this.findUser(sendingAccount.userId);

    if (userSending.businessman) {
      return {
        success: false,
        error: "Bussinesman does not send value",
      };
    }

    sendingAccount.value -= value;

    if (sendingAccount.value < 0) {
      sendingAccount.value += value;
      return {
        success: false,
        error: "insufficient funds",
      };
    }
    receivingAccount.value += value;

    await sendingAccount.save();
    await receivingAccount.save();

    return {
      success: true,
      message: `${value} was transferred to user ${userReceiving.name} ${userReceiving.lastname}`,
    };
  }

  /**
   * Encontra um usuario pelo id.
   * @param {number} userId
   * @returns {Promise}
   */
  async findUser(userId) {
    return await User.findOne({
      where: {
        id: userId,
      },
    });
  }

  /**Encontra uma conta de usuario pelo Id.
   *
   * @param {number} accountId
   * @returns  {Promise}
   */
  async findUserAccount(accountId) {
    return await UserAccount.findOne({
      where: {
        userId: accountId,
      },
    });
  }
}

export default new TransferService();
