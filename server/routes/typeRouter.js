import Router from 'express'
const router = new Router()
import controller from '../controllers/typeController.js'
const { create, getAll } = controller
import checkRole from '../middleware/checkRoleMiddleware.js'

router.post('/', create)
router.get('/', getAll)

export default router