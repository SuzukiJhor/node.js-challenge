import * as Yup from 'yup'

class TransferValidation {
    async validation(data) {

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
}

export default new TransferValidation()