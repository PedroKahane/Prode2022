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
        let usuarios = await db.User.findAll({order: [
          ['puntos', 'DESC'],
          ['plenos', 'DESC']
      ]})
      let fechaActual = luxon.DateTime.local().toFormat("yyyy-MM-dd")
      let partidos = await db.Partidos.findAll({
        where: {
          fecha: fechaActual
        },include : ["equipos1","equipos2","grupos"]
    });
      let pronosticos = await db.Pronosticos.findAll({where:{
        user_id: req.session.userLogged.user_id,
    }})
      res.render("index", {styles:"home.css", usuarios: usuarios, partidos:partidos, fecha:fechaActual, pronosticos: pronosticos})
      } catch (error) {
        console.log(error);
      }


    }
}

module.exports = controller;