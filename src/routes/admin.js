const express = require('express');
let router = express.Router();
let controller = require('../controllers/admin')
const userAdmin = require("../middlewares/userAdmin")



router.get('/partidos' ,userAdmin,controller.partidos);
router.get("/resultados",userAdmin, controller.partidosParaCargar)
router.put("/partidos/update/:id",userAdmin,controller.asociarPartidos)
router.put("/rondas/update/:id",userAdmin,controller.activarPartidos)
router.put("/partido/resultado/:id",userAdmin,controller.cargarResultado)
router.put("/partido/resultado/reset/:id",userAdmin,controller.editar)


module.exports = router
