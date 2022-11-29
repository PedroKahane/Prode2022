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
      ], where : {
        confirm: 1
      }})
      let fechaActual = luxon.DateTime.local().setZone("UTC-7").toFormat("yyyy-MM-dd")
      let partidos = await db.Partidos.findAll({
        where: {
          fecha: fechaActual
        },include : ["equipos1","equipos2","grupos"]
    });
    let proximosPartidos = await db.Partidos.findAll({
      where: {
        fecha: {
          [Op.gt] : fechaActual
        }
      },include : ["equipos1","equipos2","grupos"],
      limit: 4
  });
      let pronosticos = await db.Pronosticos.findAll({where:{
        user_id: req.session.userLogged.user_id,
    }})
    let usuario = await db.User.findOne( {where: {
      user_id: req.session.userLogged.user_id,
  }, include:
  ['equipo']
})
let  equipos =  await db.Equipos.findAll()
      res.render("index", {styles:"home.css", usuarios: usuarios, partidos:partidos, fecha:fechaActual, pronosticos: pronosticos, proximosPartidos: proximosPartidos, date:fechaActual, usuario: usuario, equipos: equipos})
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
          return res.redirect('/');

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
        return res.redirect('/');

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
      return res.redirect('/');

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
      return res.redirect('/');

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
      return res.redirect('/');

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
      return res.redirect('/');

  } catch(error){
      console.log(error);
  }
}
}

module.exports = controller;