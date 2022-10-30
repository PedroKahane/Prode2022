const express = require('express');
const { body } = require("express-validator");
const multer = require("multer");
const path = require("path");
const router = express.Router();
const controller = require('../controllers/admin')
const userAdmin = require("../middlewares/userAdmin")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(__dirname,"../../public/uploads/","banderas"))
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});
let upload = multer({ storage: storage })
router.get('/partidos' ,userAdmin,controller.partidos);
router.get("/resultados",userAdmin, controller.partidosParaCargar)
router.get("/equipos",userAdmin, controller.equipos)
router.put("/partidos/update/:id",userAdmin,controller.asociarPartidos)
router.put("/rondas/update/:id",userAdmin,controller.activarPartidos)
router.put("/partido/resultado/:id",controller.cargarResultado)
router.put("/partido/resultado/reset/:id",userAdmin,controller.editar)
router.put("/equipos/update/:id",[upload.single("image")],controller.editEquipo)


module.exports = router
