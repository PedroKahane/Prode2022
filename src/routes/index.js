const express = require('express');
let router = express.Router();
let controller = require('../controllers/index')
const authMiddleware = require("../middlewares/authMiddleware")


router.get('/' ,authMiddleware, controller.index);
router.put("/update/:id",authMiddleware,controller.pronosticarPartido);
router.put("/reset/:id",authMiddleware,controller.resetPartido);
router.put("/updateCampeon",authMiddleware,controller.pronosticarCampeon);
router.put("/resetCampeon",authMiddleware,controller.resetCampeon);
router.put("/updateGoleador",authMiddleware,controller.pronosticarGoleador);
router.put("/resetGoleador",authMiddleware,controller.resetGoleador);



module.exports = router
