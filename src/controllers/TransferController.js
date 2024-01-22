import TransferService from "../services/TransferService";

class TransferController {
  async update(req, res) {
    const transfer = req.body;
    const newTransfer = await TransferService.update(transfer);
    return newTransfer.success
      ? res
          .status(201)
          .json({
            message: newTransfer.message,
            balance: newTransfer.value,
          })
      : res
          .status(400)
          .json({ error: "error when make deposit..", message: newTransfer.error });
  }
}

export default new TransferController();
