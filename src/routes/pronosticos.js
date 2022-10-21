const express = require('express');
const { body } = require("express-validator");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware")
const prode = require("../controllers/pronosticos")



router.put("/:id",prode.pronosticarPartido);
module.exports = router