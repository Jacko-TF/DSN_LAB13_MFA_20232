const { Router } = require('express');
const router = Router();
const userController = require('../controllers/user.controller')

router.post('/singup', userController.signup )
router.post('/singin', userController.singin )

module.exports = router