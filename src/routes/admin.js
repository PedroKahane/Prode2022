const express = require('express');
let router = express.Router();
let controller = require('../controllers/admin')



router.get('/partidos' ,controller.partidos);
router.put("/partidos/update/:id",controller.asociarPartidos)
router.put("/rondas/update/:id",controller.activarPartidos)



module.exports = router
