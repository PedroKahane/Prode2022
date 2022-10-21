const { validationResult } = require('express-validator');
const path = require('path')
const fs = require('fs')
const sequelize = require('sequelize')
const db = require("../data/models/index");
const { includes } = require('lodash');
const {Op} = sequelize
const {like} = Op

module.exports = {
    partidos: async (req,res) => {
        try{
            let partidos = await db.Partidos.findAll({include:["grupos","equipos1","equipos2"]})
            let  equipos =  await db.Equipos.findAll()
            let partidosFiltrados = partidos.filter(partido=> partido.grupos.activo === 0)
            //res.send(partidosFiltrados)
            return res.render('admin/partidos', {styles: "partidos.css",partidos:partidosFiltrados, equipos:equipos});

        } catch(error){
            console.log(error)
        }
    },
    asociarPartidos: async (req,res) => {
        try {
            db.Partidos.update( {
                equipo1: req.body.partido[0],
                equipo2: req.body.partido[1]
            }, {
                where: {
                    game_id:req.params.id,
                }
            })
            return res.redirect('/admin/partidos');
        } catch (error) {
            console.log(error);
        }
    }
}