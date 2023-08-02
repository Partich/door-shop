import Router from 'express'
const router = new Router()
import control from '../controllers/doorController.js'

router.post('/', control.create)
router.get('/', control.getAll)
router.get('/:id', control.getOne)

export default router