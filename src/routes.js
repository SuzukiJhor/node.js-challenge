import { Router } from 'express'
import CreateAccount from './controllers/CreateAccount'
import InfoUsuario from './controllers/InfoUsuarios'
import Transferencia from './controllers/Transferencia'

const routes = new Router()

routes.post('/criar-usuario', CreateAccount.store)
routes.post('/info-usuario', InfoUsuario.store)
routes.post('/transferencia', Transferencia.update)

export default routes