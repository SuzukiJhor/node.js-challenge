import * as Yup from 'yup'

class UserValidation {

    async validationRegister(data) {
      
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            lastname: Yup.string().notRequired(),
            cpf: Yup.string().required(),
            cnpj: Yup.string().notRequired(),
            email: Yup.string().required(),
            password: Yup.string().required().min(4)
        })

        try {
            await schema.validate(data, { abortEarly: false })
        } catch (err) {
            return {success: false, error:err.message}
        }
        
        return {success: true}
    }
}

export default new UserValidation()