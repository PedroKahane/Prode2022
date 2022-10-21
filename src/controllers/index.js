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
        res.render("index", {styles:"home.css"})
      } catch (error) {
        console.log(error);
      }


    }
}

module.exports = controller;