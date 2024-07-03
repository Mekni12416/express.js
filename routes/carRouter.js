var express = require('express');
var router = express.Router();
const carController = require('../Controllers/carController')

router.get('/getallCar', carController.getallCar);
router.get('/getcarById/:id', carController.getcarById);



 router.post('/Addcar', carController.Addcar);


 router.delete('/deletecar/:id', carController.deletecar);






 

module.exports = router;