const { validationResult } = require('express-validator');
const path = require('path')
const fs = require('fs')
const sequelize = require('sequelize')
const db = require("../data/models/index");
const partidos = require('../data/models/partidos');
const {Op} = sequelize
const {like} = Op
const luxon = require('luxon');

module.exports = {
    miProde: async (req,res) =>{
        try {
            let partidos = await db.Partidos.findAll({include:["equipos1","equipos2","grupos"]})
            let fecha = luxon.DateTime.local().setZone("UTC-7").toFormat("yyyy-MM-dd")
            let grupos = await db.Grupos.findAll({where: {
                activo: 1,
            }})
            let  equipos =  await db.Equipos.findAll()
            let pronosticos = await db.Pronosticos.findAll({where:{
                user_id: req.session.userLogged.user_id,
            }})
            let usuario = await db.User.findOne( {where: {
                user_id: req.session.userLogged.user_id,
            }, include:
            ['equipo']
        })
            res.render('prode/miProde',{styles: "miProde.css", partidos: partidos, grupos: grupos,date: fecha, pronosticos: pronosticos, equipos: equipos, usuario: usuario});
    } catch (error) {
        console.log(error);
    }
    },
    tabla: async (req,res) => {
        try {
            let usuarios = await db.User.findAll({
                where: {
                    confirm: 1
                }, order: [
                ['puntos', 'DESC'],
                ['plenos', 'DESC']
            ]})
            res.render("prode/tabla",{styles:"tabla.css", usuarios:usuarios})
        } catch (error) {
            console.log(error);
        }
    },
    pronosticarPartido:(req,res) => {
        try{
            db.Pronosticos.update( {
                equipo1: req.body.local,
                equipo2: req.body.visitante
            }, {
                where: {
                    user_id: req.session.userLogged.user_id,
                    game_id:req.params.id,
                }
            })
            return res.redirect('/prode/miprode');

        } catch(error){
            console.log(error);
        }
    },
    resetPartido:(req,res) => {
        try{
            db.Pronosticos.update( {
                equipo1: null,
                equipo2: null
            }, {
                where: {
                    user_id: req.session.userLogged.user_id,
                    game_id:req.params.id,
                }
            })
            return res.redirect('/prode/miprode');

        } catch(error){
            console.log(error);
        }
    },
    pronosticarCampeon:(req,res) => {
        try{
            db.User.update( {
                campeon: req.body.campeon
            }, {
                where: {
                    user_id: req.session.userLogged.user_id,
                }
            })
            return res.redirect('/prode/miprode');

        } catch(error){
            console.log(error);
        }
    },
    resetCampeon:(req,res) => {
        try{
            db.User.update( {
                campeon: null,
            }, {
                where: {
                    user_id: req.session.userLogged.user_id,
                }
            })
            return res.redirect('/prode/miprode');

        } catch(error){
            console.log(error);
        }
    },
    pronosticarGoleador:(req,res) => {
        try{
            db.User.update( {
                goleador: req.body.goleador
            }, {
                where: {
                    user_id: req.session.userLogged.user_id,
                }
            })
            return res.redirect('/prode/miprode');

        } catch(error){
            console.log(error);
        }
    },
    resetGoleador:(req,res) => {
        try{
            db.User.update( {
                goleador: null,
            }, {
                where: {
                    user_id: req.session.userLogged.user_id,
                }
            })
            return res.redirect('/prode/miprode');

        } catch(error){
            console.log(error);
        }
    }
}