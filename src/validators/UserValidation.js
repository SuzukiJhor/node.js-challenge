import * as Yup from 'yup'

class UserValidation {

    async validationRegister() {
        
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            lastname: Yup.string().required(),
            cpf: Yup.string().required(),
            cnpj: Yup.string().notRequired(),
            email: Yup.string().required(),
            password: Yup.string().required().min(4)
        })

        try {
            await schema.validate(data, { abortEarly: false })
        } catch (err) {
            return {sucess: false, error:err.errors}
        }

        return {sucess: true}
    }
}

export default new UserValidation()