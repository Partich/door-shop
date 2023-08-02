import Router from 'express'
import doorRouter from './doorRouter.js'
import userRouter from './userRouter.js'
import typeRouter from './typeRouter.js'

const router = new Router()

router.use('/user', userRouter)
router.use('/type', typeRouter)
router.use('/door', doorRouter)

export default router