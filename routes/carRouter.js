var express = require('express');
var router = express.Router();
const carController = require('../Controllers/carController')

router.get('/getallCar', carController.getallCar);
router.get('/getcarById/:id', carController.getcarById);



 router.post('/Addcar', carController.Addcar);
 router.delete('/deletecar', carController.deletecar);








module.exports = router;