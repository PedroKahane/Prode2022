const { validationResult } = require('express-validator');
const path = require('path')
const fs = require('fs')
const sequelize = require('sequelize')
const db = require("../data/models/index");
const {Op} = sequelize
const {like} = Op

module.exports = {
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
            return res.send(error)
        }
    }
}