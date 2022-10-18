const db = require('../data/models')
//const user = require('../models/user')

async function userLogged (req,res,next){
    res.locals.isLogged = false
    if(req.cookies.user_name != undefined){
        try {
            let userInCookie = req.cookies.user_name
            let userFromCookie = await db.User.findOne(
                {
                    where: {
                        user_name : userInCookie
                    }
                }
            )
            if(userFromCookie){
                req.session.userLogged = userFromCookie
            }
        } catch (error) {
            console.log(error)
        }
    }
    
    if(req.session &&  req.session.userLogged){
        res.locals.isLogged = true
        res.locals.userLogged = req.session.userLogged

    }

    next()
}
module.exports = userLogged