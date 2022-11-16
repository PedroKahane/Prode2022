const express = require('express');
const { body } = require("express-validator");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware")
const prode = require("../controllers/pronosticos")


router.get("/miprode",authMiddleware,prode.miProde)
router.get("/tabla",authMiddleware,prode.tabla)
router.put("/updateCampeon",authMiddleware,prode.pronosticarCampeon);
router.put("/resetCampeon",authMiddleware,prode.resetCampeon);
router.put("/updateGoleador",authMiddleware,prode.pronosticarGoleador);
router.put("/resetGoleador",authMiddleware,prode.resetGoleador);
router.put("/update/:id",authMiddleware,prode.pronosticarPartido);
router.put("/reset/:id",authMiddleware,prode.resetPartido);
module.exports = router