const express = require('express');
const app = express();
const path = require('path');
const method = require('method-override');
const session = require('express-session');
const isLogged = require("./middlewares/userLogged")
const cookies = require('cookie-parser')
app.use(express.static('public'));



//uso de ssesiones para los usuarios logeados
app.use(session({secret: 'Shh, Its a secret',
                 resave: false,
                 saveUninitialized: false
                }));


app.use(cookies())
app.use(isLogged)
// App Access public
app.use(express.static(path.resolve(__dirname,"../public")));


//URL encode  - Para que nos pueda llegar la información desde el formulario al req.body
app.use(express.urlencoded({ extended: false }));

//Declaraciones necesarias para PUT Y DELETE
const methodOverrider = require('method-override');
app.use(methodOverrider("_method"));

//motor de EJS
app.set('view engine', 'ejs');
app.set("views",path.resolve(__dirname, "./views"));



/* Data Configuration */
app.use(express.urlencoded({extended:true})); // Not fund req.body
app.use(method("_method")); // ?_method=PUT o ?_method=DELETE

//rutas
const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const prodeRouter = require('./routes/pronosticos');
const adminRouter = require('./routes/admin');


 

app.use('/' , indexRouter)
app.use('/user', userRouter);
app.use('/prode', prodeRouter);
app.use('/admin', adminRouter);




//Levantamos servidor y por si nos dan un puerto
//Levantamos servidor y por si nos dan un puerto
const port = process.env.PORT || 3000;
app.listen(port , () => {
    console.log("running on server " + port);
})



