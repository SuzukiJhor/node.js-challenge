import { Router } from 'express'
import CreateAccount from './controllers/CreateAccount'

const routes = new Router()

routes.post('/criar-usuario', CreateAccount.store)

export default routes