var express = require('express');
var router = express.Router();
const userController = require('../Controllers/userController')
const upload = require("../middelewares/uploadFile")
/* GET users listing. */
router.get('/', userController.getUsers);
router.get('/:id', userController.getUserById);
router.post('/', userController.AddUserC);
router.post('/addwithImg',upload.single("image_user"), userController.AddUser)
router.delete('/:id', userController.deleteUser);
router.put('/:id', userController.updateUser);
router.put('/updatePasword/:id', userController.updateUserPasword);

module.exports = router;
