import Router from 'express'
const router = new Router()
import controller from '../controllers/userController.js'
const { registration, login, check } = controller
import authMiddleware from '../middleware/authMiddleware.js'

router.post('/registration', registration)
router.post('/login', login)
router.get('/auth', authMiddleware, check)

export default router