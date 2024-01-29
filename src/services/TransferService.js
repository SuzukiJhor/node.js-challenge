import UserAccount from "../database/models/UserAccount";
import User from "../database/models/User";
import TransferValidation from "../validators/TransferValidation";

class TransferService {
  async update(data) {
    const transferIsValid = await TransferValidation.validationData(data);

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

    const authorizedTransfer =
      await TransferValidation.validationCodeTransfer();

    if (authorizedTransfer.message !== "Autorizado") {
      return {
        success: false,
        error: "unauthorized transaction",
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

    const notification = await this.notificationService();

    await sendingAccount.save();
    await receivingAccount.save();

    return {
      success: true,
      message: `${value} was transferred to user ${userReceiving.name} ${userReceiving.lastname}`,
    };
  }

  async notificationService() {
    const url = "https://run.mocky.io/v3/54dc2cf1-3add-45b5-b5a9-6bf7e7f1f4a6";

    try {
      const response = await fetch(url);
      if (!response.ok) {
        return {
          success: false,
          error: "error when making request" + response.statusText,
        };
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return {
        success: false,
        error: "error when making request" + response.statusText,
      };
    }
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
