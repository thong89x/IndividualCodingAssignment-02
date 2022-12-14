const router = require('express').Router();
const usersController = require('../controllers/usersController')
const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)

router.route('/')
.get(usersController.getAllUsers)
.post(usersController.createUser)
router.route('/:id')
.get(usersController.getUserById)
.patch(usersController.updateUser)
.delete(usersController.deleteUser)

module.exports = router