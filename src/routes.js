import { Router } from 'express'
import UserController from './controllers/UserController'
import DepositController from './controllers/DepositController'
import Transferencia from './controllers/Transferencia'

const routes = new Router()

routes.post('/create-user', UserController.store)
routes.post('/account', DepositController.index)
routes.post('/deposit', DepositController.store)
routes.post('/transferencia', Transferencia.update)

export default routes