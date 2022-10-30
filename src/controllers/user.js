const { validationResult } = require('express-validator');
const path = require('path')
const fs = require('fs')
const cloudinary = require('cloudinary')
const sequelize = require('sequelize')
const bcrypt = require('bcryptjs');
const db = require("../data/models/index");
const {Op} = sequelize
const {like} = Op

module.exports = {
    login: (req,res) => 
    {
        res.render("users/login", {styles:"login.css"})

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
                        user_name: {
                              msg: 'Este nombre de usuario ya existe, pruebe con otro'
                          }
                      },
                      oldData: req.body,
                      styles:"login.css"   
                    });
                } else{
                    if(req.file != undefined){
                        const result = await cloudinary.v2.uploader.upload(req.file.path)
                    }
                    
                    db.User.create( {
                        email : req.body.email,
                        user_name:req.body.userName,
                        password: bcrypt.hashSync(req.body.password, 10),
                        image: req.file != undefined ? result.secure_url : "https://res.cloudinary.com/hmc4uxpzk/image/upload/v1667155509/default_irgdp8.jpg",
                        image_id: req.file != undefined ? result.public_id : null,
                        admin: String(req.body.email).includes("@prode") ? 1 : 0,
                        puntos: 0
                    })
                    try {
                        let partidos = await db.Partidos.findAll();
                        let usuario = await db.User.findOne({where : {user_name: req.body.userName}})
                        partidos.forEach(element => {
                            db.Pronosticos.create({
                                game_id: element.game_id,
                                user_id: usuario.user_id,
                            })
                        });
                    } catch (error) {
                        db.User.destroy({
                            where: {
                                user_name:req.body.userName
                            }
                        })
                        console.log(error);
                        return res.render('users/register', {
                            errors: {
                                email: {
                                    msg: 'Ha habido un error en el proceso, vuelva a intentar registrarse :)'
                                }
                            },
                            oldData: req.body,
                            styles:"login.css"   
                          });
                                        
                    }                    
                    
                    return res.redirect('/user/login');
        
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
        if(userToLogin) {
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
                }, styles:"login.css"
        })
        }
        return res.render('users/login', {
                errors: {
                    userName:{
                        msg: 'Las credenciales son Invalidas'
                    },
                }, styles:"login.css"
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
               email : req.body.email,
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
  }
