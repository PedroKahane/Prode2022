const { validationResult } = require('express-validator');
const path = require('path')
const fs = require('fs')
const sequelize = require('sequelize')
const db = require("../data/models/index");
const { includes } = require('lodash');
const {Op} = sequelize
const {like} = Op
const luxon = require('luxon');

module.exports = {
    partidos: async (req,res) => {
        try{
            let partidos = await db.Partidos.findAll({include:["grupos","equipos1","equipos2"]})
            let  equipos =  await db.Equipos.findAll()
            let grupos = await db.Grupos.findAll({where: {
                activo:0
            }})
            let partidosFiltrados = partidos.filter(partido=> partido.grupos.activo === 0)
            //res.send(partidosFiltrados)
            return res.render('admin/partidos', {styles: "partidos.css",partidos:partidosFiltrados, equipos:equipos, grupos});

        } catch(error){
            console.log(error)
        }
    },
    partidosParaCargar: async (req,res) =>{
    try {
        let partidos = await db.Partidos.findAll({include:["equipos1","equipos2","grupos"]})
        let fecha = luxon.DateTime.local().toFormat("yyyy-MM-dd")
        let grupos = await db.Grupos.findAll({where: {
            activo: 1,
        }})
        res.render('admin/resultados',{styles: "miProde.css", partidos: partidos, grupos: grupos,date: fecha});
    } catch (error) {
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
    },
    cargarResultado: async (req,res) => {
        try {
            db.Partidos.update({
                goles1:req.body.local,
                goles2:req.body.visitante,
            }, {
                where: {
                    game_id: req.params.id
                }
            })
            return res.redirect('/admin/resultados');
        } catch (error) {
            console.log(error);
        }
    },
    editar: async (req,res) => {
        try {
            db.Partidos.update({
                goles1:null,
                goles2:null,
            }, {
                where: {
                    game_id: req.params.id
                }
            })
            return res.redirect('/admin/resultados');
        } catch (error) {
            console.log(error);
        }
    },
    activarPartidos:async (req,res) => {
        try {
            db.Grupos.update({
                activo:1
            }, {
                where: {
                    id: req.params.id,
                }
            })
            return res.redirect('/admin/partidos');
        } catch (error) {
            console.log(error);
        }
    }
}