
const controller = { 

    index: (req,res) => {
        res.render('../src/views/index',{styles: "home.css"});
        console.log(res.locals);
    }
}


module.exports = controller;