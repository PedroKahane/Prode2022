const express = require('express');
let router = express.Router();
let controller = require('../controllers/index')
const authMiddleware = require("../middlewares/authMiddleware")


router.get('/' ,controller.index);



module.exports = router
