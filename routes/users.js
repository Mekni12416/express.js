var express = require('express');
var router = express.Router();
const userController = require('../Controllers/userController');
const upload = require("../middelewares/uploadFile");
const {requireAuthUser } =require('../middelewares/authMiddelewares');
/* GET users listing. */
router.get('/getUsers',requireAuthUser, userController.getUsers);
router.get('/getUserById/:id', userController.getUserById);
router.get('/getUsersbyordercroi',requireAuthUser, userController.getUsersbyordercroi);
router.get('/getUserssup18', userController.getUserssup18);
router.get('/getUsersbyage/:age', userController.getUsersbyage);
router.get('/getusersbetweenXandYrouter', userController.getusersbetweenXandY);
router.get('/searchUsersByName', userController.searchUsersByName);
router.get('/login', userController.login);
router.get('/logout', userController.logout);
router.get('/getuserauth',requireAuthUser, userController.getuserauth);




router.post('/AddUserC', userController.AddUserC);
router.post('/AddUser',upload.single("image_user"), userController.AddUser)




router.delete('/deleteUser/:id', userController.deleteUser);



router.put('/updateUser/:id', userController.updateUser);
router.put('/updateUserPasword/:id', userController.updateUserPasword);

module.exports = router;
