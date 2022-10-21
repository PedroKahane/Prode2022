const express = require('express');
let router = express.Router();
let controller = require('../controllers/admin')



router.get('/partidos' ,controller.partidos);
router.put("/partidos/update/:id",controller.asociarPartidos)



module.exports = router
