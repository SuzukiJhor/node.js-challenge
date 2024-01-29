import * as Yup from 'yup'

class TransferValidation {

    /**
     * Valida os dados do usuario.
     * @param {Array} data 
     * @returns {Promise}
     */
    async validationData(data) {

        const schema = Yup.object().shape({
            sendId: Yup.number().required(),
            receiveId: Yup.number().required(),
            value: Yup.number().required(),
        })
        try {
            await schema.validate(data, { abortEarly: false })
        } catch (err) {

            return {success: false, error:err.message}
        }
        
        return { success: true }
        
    }

    /**
     * Valida serviço de autorização externa.
     * @returns {Promise}
     */
    async validationCodeTransfer() {
        const url = "https://run.mocky.io/v3/5794d450-d2e2-4412-8131-73d0293ac1cc";

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
}

export default new TransferValidation()