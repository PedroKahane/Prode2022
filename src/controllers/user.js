const { validationResult } = require('express-validator');
const path = require('path')
const fs = require('fs')
const cloudinary = require('cloudinary')
const sequelize = require('sequelize')
const bcrypt = require('bcryptjs');
const db = require("../data/models/index");
const {Op} = sequelize
const {like} = Op
const { v4: uuidv4 } = require('uuid');
const { getToken, getTokenData } = require('../config/jwt.config');
const { getTemplate, sendEmail } = require('../config/mail.config');

module.exports = {
    login: (req,res) => 
    {
        res.render("users/login", {styles:"login.css",success:false})

    },
    processRegister: async (req, res) => {
        
        const resultValidation = validationResult(req);

        if (!resultValidation.isEmpty()) {
            return res.render('users/register', {
                styles:"login.css", 
                errors: resultValidation.mapped(),
                oldData: req.body
            });
        }
        try {
            let mailInDB = await db.User.findOne(
                {
                    where: { 
                        email: req.body.email
                    }
                })
                let userInDB = await db.User.findOne(
                    {
                        where: { 
                            user_name: req.body.userName
                        }
                    })
                if(mailInDB) {
                    return res.render('users/register', {
                      errors: {
                          email: {
                              msg: 'Este mail ya está registrado'
                          }
                      },
                      oldData: req.body,
                      styles:"login.css"   
                    });
                } else if(userInDB){
                    return res.render('users/register', {
                      errors: {
                        userName: {
                              msg: 'Este nombre de usuario ya existe, pruebe con otro'
                          }
                      },
                      oldData: req.body,
                      styles:"login.css"   
                    });
                } else{
                    try {
                        const result =req.file != undefined ?  await cloudinary.v2.uploader.upload(req.file.path) : "https://res.cloudinary.com/hmc4uxpzk/image/upload/v1667155509/default_irgdp8.jpg";
                        db.User.create( {
                            email : req.body.email,
                            user_name:req.body.userName,
                            token: null,
                            confirm: 0,
                            password: bcrypt.hashSync(req.body.password, 10),
                            image: req.file != undefined ? result.secure_url : "https://res.cloudinary.com/hmc4uxpzk/image/upload/v1667155509/default_irgdp8.jpg",
                            image_id: req.file != undefined ? result.public_id : null,
                            admin: String(req.body.email).includes("@prode") ? 1 : 0,
                            puntos: 0
                        })
                    } catch (error) {
                        console.log(error);
                    }
                    try {
                        let partidos = await db.Partidos.findAll();
                        let usuario = await db.User.findOne({where : {user_name: req.body.userName}})
                        await partidos.forEach(element => {
                            db.Pronosticos.create({
                                game_id: element.game_id,
                                user_id: usuario.user_id,
                            })
                        });
                    } catch (error) {
                        const user = db.User.destroy({
                            where: {
                                user_name:req.body.userName
                            }
                        })
                        if(user.image_id != null) {
                            try {
                                const result = await cloudinary.v2.uploader.destroy(user.image_id)
                                console.log(result);
                            } catch (error) {
                                console.log(error);
                            }
                        }
                        console.log(error);
                        return res.render('users/register', {
                            errors: {
                                email: {
                                    msg: 'Ha habido un error en el proceso de registro, intente nuevamente :)'
                                }
                            },
                            oldData: req.body,
                            styles:"login.css"   
                          });
                                        
                    }
                        const code = uuidv4();
                        const email = req.body.email;
                        let token = getToken({ email, code });
                        const template = getTemplate(req.body.userName, token);
                        await sendEmail(email, 'Confirma tu cuenta de Prode PLV', template);              
                        await db.User.update({
                            token: token
                        },{
                                where: { 
                                    email : req.body.email,
                                }
                            }
                        )
                    const user = await db.User.findOne({where: {email : req.body.email,}})
                    return res.redirect('/user/confirm/' + user.user_id);
        
                }
                }
         catch (error) {
            console.log(error)
        }
    },
    register:(req,res) => res.render("users/register",{styles:"login.css"}),
    access: async (req,res) => {
        let userToLogin = await db.User.findOne({
            where: {
                user_name: req.body.userName
            }
        })
        if(userToLogin && userToLogin.confirm == 1) {
            let passwordHash = bcrypt.compareSync(req.body.password, userToLogin.password)
            if(passwordHash){
                req.session.userLogged = userToLogin
                
                if(req.body.rememeber_user){
                    res.cookie('user_name', req.body.email, {maxAge : 1000* 60 *60 * 24 * 4 })
                }
                return res.redirect('/')
            }
            return res.render('users/login', {
                errors: {
                    password : {
                        msg: 'La contraseña es incorrecta'
                    }
                }, styles:"login.css",
                success:false
            })
        } else if(userToLogin.confirm == 0) {
            return res.redirect('/user/confirm/' + userToLogin.user_id);
        }
        return res.render('users/login', {
                errors: {
                    userName:{
                        msg: 'Las credenciales son Invalidas o no ha confirmado la cuenta'
                    },
                }, styles:"login.css",
                success:false
        })
    },
    update: async (req,res) => {
        const resultValidation = validationResult(req);

        if (!resultValidation.isEmpty()) {
           return res.render('users/profile', {
               styles:"profile.css", 
               user: req.session.userLogged, 
               errors: resultValidation.mapped(),
               oldData: req.body
           });
       } 
       //return res.send(req.body)
       try{
           db.User.update( {
               user_name: req.body.firstName,
           }, {
               where: {
                   user_id: req.session.userLogged.user_id
               }
           })
           return res.redirect('/user/profile');

       } catch(error){
           return res.send(error)
       }
   },
   forgotPassword: async (req,res) => {
       const resultValidation = validationResult(req);

       if (!resultValidation.isEmpty()) {
          return res.render('users/profile', {
              styles:"profile.css", 
              user: req.session.userLogged, 
              errors: resultValidation.mapped(),
          });
      } 
      if(req.body.password != req.body.repeatPasword){
       return res.render('users/profile', {
           styles:"profile.css", 
           user: req.session.userLogged, 
           errors: {
               repeatPasword: {
                   msg: 'Las contraseñas no coinciden'}
           },
       });
   }
   try{
       db.User.update( {
           password: bcrypt.hashSync(req.body.password, 10),
       }, {
           where: {
               user_id: req.session.userLogged.user_id
           }
       })
       return res.redirect('/user/profile');

   } catch(error){
       return res.send(error)
   }
  },
   avatar: async (req,res) => {
       const resultValidation = validationResult(req);

       if (!resultValidation.isEmpty()) {
           return res.render('users/profile', {
               styles:"profile.css", 
               user: req.session.userLogged, 
               errors: resultValidation.mapped(),
               oldData: req.body
           });
       } else{
            let user = await db.User.findOne(
                {
                    where: { 
                        user_id: req.session.userLogged.user_id
                    }
                })
                if(user.image_id != null) {
                    try {
                        const result = await cloudinary.v2.uploader.destroy(user.image_id)
                        console.log(result);
                    } catch (error) {
                        console.log(error);
                    }
                }
       }
       
       try{
            const result = await cloudinary.v2.uploader.upload(req.file.path)
            console.log(result)
            db.User.update( {
                image: req.file != undefined ? result.secure_url : "https://res.cloudinary.com/hmc4uxpzk/image/upload/v1667155509/default_irgdp8.jpg",
                image_id: req.file != undefined ? result.public_id : null,
            }, {
                where: {
                    user_id: req.session.userLogged.user_id
                }
            })
            return res.redirect('/user/profile');
   
       } catch(error){
           console.log(error)
       }
   },
   avatarDefault: async (req,res) => {
       try{
        let user = await db.User.findOne(
            {
                where: { 
                    user_id: req.session.userLogged.user_id
                }
            })
        if(user.image_id != null) {
            try {
                const result = await cloudinary.v2.uploader.destroy(user.image_id)
                console.log(result);
            } catch (error) {
                console.log(error);
            }
        }
           db.User.update( {
               image: "https://res.cloudinary.com/hmc4uxpzk/image/upload/v1667155509/default_irgdp8.jpg",
               image_id: null
           }, {
               where: {
                   user_id: req.session.userLogged.user_id
               }
           })
        return res.redirect('/user/profile');
           
       } catch(error){
           console.log(error);
       }
    
   },    
    profile: async (req,res) => {
        let user = await db.User.findOne(
            {
                where: { 
                    user_id: req.session.userLogged.user_id
                }
            })
            req.session.userLogged = user;
            res.locals.userLogged = req.session.userLogged
        res.render("users/profile",{styles:"profile.css",user: user })},
    logout: (req,res) =>{
        req.session.destroy();
        res.clearCookie('user_name')
        return res.redirect("/")
    },
    confirm: async (req,res) => {
        try{
       
       // Verificar la data
       const data = await getTokenData(req.params.token);

       if(data === null) {
            return res.json({
                success: false,
                msg: 'Error al obtener data'
            });
       }

       console.log(data);

       // Verificar existencia del usuario
       const user = await db.User.findOne({ 
        where : {
            token: req.params.token
        }
        }) || null;

        const { email, code } = data.data;

       // Actualizar usuario
       db.User.update({
        confirm: 1,},
        {
            where: {
                token: req.params.token
            }
        })

        // Redireccionar a la confirmación
        return res.render("users/login", {styles:"login.css",success:true})
        
    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            msg: 'Error al confirmar usuario'
        });
    }
    },
    confirmView: async (req,res) => {
        const user = await db.User.findOne({where:{user_id:req.params.id}})
       res.render("users/confirm",{styles:"login.css", user})
    },
    sendMail: async (req,res) => {
        try {
            const user = await db.User.findOne({where:{user_id:req.params.id}})
            const code = uuidv4();
            const email = user.email;
            const token = getToken({ email, code });
            const template = getTemplate(user.user_name, token);
            await sendEmail(email, 'Confirma tu cuenta de Prode PLV', template);
            await db.User.update({
                token: token,
            }, {
                where: {
                user_id: req.params.id
                }
            })
            return res.redirect("/user/confirm/" + user.user_id)
        } catch (error) {
            console.log(error);
        }
    }
}
