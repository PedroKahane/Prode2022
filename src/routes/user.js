const express = require("express");
const { body } = require("express-validator");
const multer = require("multer");
const path = require("path");
const router = express.Router();
const controller = require("../controllers/user");
const validLoggin = require("../middlewares/validLoggin");
const authMiddleware = require("../middlewares/authMiddleware");
const userLogged = require("../middlewares/userLogged")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(__dirname,"../../public/uploads/","users"))
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
  });
  let upload = multer({ storage: storage })

  // Validaciones con express-validator
  const validations = [
    body('firstName').notEmpty().withMessage('Tenés que ingresar un nombre'),
    body('lastName').notEmpty().withMessage('Tenés que ingresar un apellido'),
    body('userName').notEmpty().withMessage('Tenés que ingresar un nombre de usuario').bail()
                    .isLength({min:3, max:30}).withMessage('Debe contener entre 3 y 30 caracteres'),
    body('email').notEmpty().withMessage('Tenés que ingresar un correo electrónico').bail()
                  .isEmail().withMessage('Debes ingresar un formato de correo válido'),
    body('password').notEmpty().withMessage('Tenés que ingresar una contraseña').bail()
                    .isLength({min:6, max:20}).withMessage('Debe contener entre 6 y 20 caracteres'),
  ];
  const validacionesProfile = [
    body('firstName').notEmpty().withMessage('Tenés que ingresar un nombre').bail()
    .isLength({min:3, max:20}).withMessage('Debe contener entre 3 y 20 caracteres')

  ];

  const validationsPassword = [
    body('password').notEmpty().withMessage('Tenés que ingresar una contraseña').bail()
    .isLength({min:6, max:20}).withMessage('Debe contener entre 6 y 20 caracteres')


  ];

  router.get("/login" ,validLoggin, controller.login);
  router.get("/register" ,validLoggin,controller.register);
  router.get("/profile" ,[authMiddleware, userLogged],controller.profile);
  router.get("/confirm/:id" ,validLoggin,controller.confirmView);
  router.get('/confirmed/:token',controller.confirm);
  router.get('/sendMail/:id',controller.sendMail);
  router.put("/update",[authMiddleware,validacionesProfile], controller.update);
  router.put("/avatar", [upload.single("image")], controller.avatar);
  router.put("/forgotPassword", [authMiddleware, validationsPassword], controller.forgotPassword)
  router.put("/avatarDefault",controller.avatarDefault);
  router.post("/access",controller.access);
  router.post("/register", [upload.single("image")],validations, controller.processRegister);
  router.get("/logout", controller.logout);


  module.exports = router