const path = require('path')
const fs = require('fs')
const sequelize = require('sequelize')
const db = require("../data/models/index");
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
            }).then(
                await db.Partidos.findOne({
                    where: {
                        game_id: req.params.id
                    }
                })

            )
            let partido = await db.Partidos.findOne({
                where: {
                    game_id: req.params.id
                }
            })
            //res.send(partido)
            if(partido.goles1!=null && partido.goles2!=null){
                let pronosticos = await db.Pronosticos.findAll({
                    where: {
                        game_id: req.params.id
                    }
                })
                pronosticos.forEach(async element => {
                    try {
                        console.log(element)
                        let user = await db.User.findOne({
                            where: {
                                user_id: element.user_id
                            }
                        })
    
                        if(element.equipo1!=null && element.equipo2!=null) {
                            let resPartido = (partido.goles1 - partido.goles2)
                            let resProde = (element.equipo1 - element.equipo2)
                            if(element.equipo1 == partido.goles1 && element.equipo2 == partido.goles2) {
                                db.User.update({
                                    puntos: (user.puntos + 3),
                                    plenos: (user.plenos + 1)
                                }, {
                                    where: {
                                        user_id: element.user_id
                                    }
                                })
                                db.Pronosticos.update({
                                    puntos: 3
                                }, {
                                    where: {
                                        game_id: req.params.id,
                                        user_id: element.user_id
                                    }
                                })
                            } else if((resPartido === 0 && resProde === 0) || (resPartido > 0 && resProde > 0) ||(resPartido < 0 && resProde < 0)) {
                                db.User.update({
                                    puntos: (user.puntos + 1),
                                }, {
                                    where: {
                                        user_id: element.user_id
                                    }
                                })
                                db.Pronosticos.update({
                                    puntos: 1
                                }, {
                                    where: {
                                        game_id: req.params.id,
                                        user_id: element.user_id
                                    }
                                })
                            } else {
                                db.Pronosticos.update({
                                    puntos: 0
                                }, {
                                    where: {
                                        game_id: req.params.id,
                                        user_id: element.user_id
                                    }
                                })
                            }
                        }
                    } catch (error) {
                        console.log(error);
                        db.Partidos.update({
                            goles1:null,
                            goles2:null,
                        }, {
                            where: {
                                game_id: req.params.id
                            }
                        })
                    }
                });
               
            }
            res.redirect('/admin/resultados')
        } catch (error) {
            console.log(error);
        }
    },
    editar: async (req,res) => {
        try {
            let partido = await db.Partidos.findOne({
                where: {
                    game_id: req.params.id
                }
            })
            if(partido.goles1 != null && partido.goles2 != null){
                let pronosticos = await db.Pronosticos.findAll({
                    where: {
                        game_id: req.params.id
                    }
                })
                pronosticos.forEach(async element => {
                    let user = await db.User.findOne({
                        where: {
                            user_id: element.user_id
                        }
                    })
                    let resPartido = (partido.goles1 - partido.goles2)
                    let resProde = (element.equipo1 - element.equipo2)
                    if(element.equipo1 != null && element.equipo2 != null) {
                        if(element.equipo1 == partido.goles1 && element.equipo2 == partido.goles2) {
                            db.User.update({
                                puntos: (user.puntos - 3),
                                plenos: (user.plenos - 1)
                            }, {
                                where: {
                                    user_id: element.user_id
                                }
                            })
                            db.Pronosticos.update({
                                puntos: null
                            }, {
                                where: {
                                    game_id: req.params.id,
                                    user_id: element.user_id
                                }
                            })
                        } else if((resPartido == 0 && resProde == 0) || (resPartido > 0 && resProde > 0) ||(resPartido < 0 && resProde < 0)) {
                            db.User.update({
                                puntos: (user.puntos - 1),
                            }, {
                                where: {
                                    user_id: element.user_id
                                }
                            })
                            db.Pronosticos.update({
                                puntos: null
                            }, {
                                where: {
                                    game_id: req.params.id,
                                    user_id: element.user_id
                                }
                            })
                        } else{
                            db.Pronosticos.update({
                                puntos: null
                            }, {
                                where: {
                                    game_id: req.params.id,
                                    user_id: element.user_id
                                }
                            })
                        }
                    }
                });
            }
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
    }, 
    equipos: async(req,res) => {
        try{
            let  equipos =  await db.Equipos.findAll()
            return res.render('admin/equipos', {styles: "equipos.css", equipos:equipos});

        } catch(error){
            console.log(error)
        }
    },
    editEquipo:async (req,res) => {
        let equipo = await db.Equipos.findOne(
            {
                where: { 
                    id: req.params.id
                }
            }
        )
        if(req.file != undefined && equipo.imagen != null){
            let imagenFrente = path.resolve(__dirname,"../../public/uploads/banderas",equipo.imagen)
            if(fs.existsSync(imagenFrente)) {
                fs.unlinkSync(imagenFrente)
            }
        }
        try {
            db.Equipos.update({
                color:req.body.color,
                imagen: req.file != undefined ? req.file.filename : equipo.imagen,

            }, {
                where: {
                    id: req.params.id,
                }
            })
            return res.redirect("/admin/equipos")
        } catch (error) {
            console.log(error);
        }
    }

}