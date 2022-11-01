const express = require('express');
let router = express.Router();
let controller = require('../controllers/index')
const authMiddleware = require("../middlewares/authMiddleware")


router.get('/' ,authMiddleware, controller.index);
router.put("/update/:id",authMiddleware,controller.pronosticarPartido);
router.put("/reset/:id",authMiddleware,controller.resetPartido);



module.exports = router
