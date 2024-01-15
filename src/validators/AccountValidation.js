
class AccountValidation {

    async validation(data) {

        const schema = Yup.object().shape({
            accoountId: Yup.bool().required(),
            value: Yup.string().required(),
            cpf: Yup.string().required(),
            cnpj: Yup.string().notRequired(),
            email: Yup.string().notRequired(),
        })
        try {
            await schema.validate(data, { abortEarly: false })
        } catch (err) {

            return {success: false, error:err.message}
        }
        
        return { success: true }
        
    }
}

export default new AccountValidation()