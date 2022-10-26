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
            let fecha = luxon.DateTime.local().toFormat("yyyy-MM-dd")
            let grupos = await db.Grupos.findAll({where: {
                activo: 1,
            }})
            let pronosticos = await db.Pronosticos.findAll({where:{
                user_id: req.session.userLogged.user_id,
            }})
            res.render('prode/miProde',{styles: "miProde.css", partidos: partidos, grupos: grupos,date: fecha, pronosticos: pronosticos});
    } catch (error) {
        console.log(error);
    }
    },
    tabla: async (req,res) => {
        try {
            let usuarios = await db.User.findAll({order: [
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
    }
}