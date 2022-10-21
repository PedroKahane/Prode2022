const { validationResult } = require('express-validator');
const path = require('path')
const fs = require('fs')
const sequelize = require('sequelize')
const db = require("../data/models/index");
const partidos = require('../data/models/partidos');
const {Op} = sequelize
const {like} = Op
const luxon = require('luxon');



const controller = { 

    index: async (req,res) => {
        try {
            let partidos = await db.Partidos.findAll({include:["equipos1","equipos2","grupos"]})
            let fecha = luxon.DateTime.local().toFormat("yyyy-MM-dd")
            let grupos = await db.Grupos.findAll({where: {
                activo: 1,
            }})
            res.render('index',{styles: "home.css", partidos: partidos, grupos: grupos,date: fecha});
        } catch (error) {
            res.send(error)
        }
        
        
    }
}


module.exports = controller;