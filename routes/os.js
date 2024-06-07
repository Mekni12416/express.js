var express = require('express');
var router = express.Router();
const os = require('os');
const osController = require('../Controllers/osController');


router.get("/os",osController.getOsInformation)









   
   module.exports = router;
   