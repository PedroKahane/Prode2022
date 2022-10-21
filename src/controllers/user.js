const { validationResult } = require('express-validator');
const path = require('path')
const fs = require('fs')
const sequelize = require('sequelize')
const bcrypt = require('bcrypt');
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
            if(req.file){
                let imagenFrente = path.resolve(__dirname,"../../public/uploads/users/",req.file.filename)
                if(fs.existsSync(imagenFrente) && req.file.filename != "Default.png") {
                    fs.unlinkSync(imagenFrente)
                }
            }
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
                    if(req.file != undefined){
                        let imagenFrente = path.resolve(__dirname,"../../public/uploads/users/",req.file.filename)
                        if(fs.existsSync(imagenFrente) && req.file.filename != "Default.png") {
                            fs.unlinkSync(imagenFrente)
                        }
                    }
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
                    if(req.file != undefined){
                        let imagenFrente = path.resolve(__dirname,"../../public/uploads/users/",req.file.filename)
                        if(fs.existsSync(imagenFrente) && req.file.filename != "Default.png") {
                            fs.unlinkSync(imagenFrente)
                        }
                    }
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
                    db.User.create( {
                        email : req.body.email,
                        user_name:req.body.userName,
                        password: bcrypt.hashSync(req.body.password, 10),
                        image: req.file != undefined ? req.file.filename : "Default.png",
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
                        console.log(error);
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
    logout: (req,res) =>{
        req.session.destroy();
        res.clearCookie('user_name')
        return res.redirect("/")
    },
  }
