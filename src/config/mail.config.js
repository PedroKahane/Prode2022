const nodemailer = require('nodemailer');



var transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    secure: true,
    auth: {
        user: "prodeplv@gmail.com",
        pass: secrets.PASSWORD_GMAIL
    },
    enable_starttls_auto: true,
    tls: { rejectUnauthorized: false }
})

  const sendEmail = async (email, subject, html) => {
    try {
        
        await transporter.sendMail({
            from: `Prode PLV <prodeplv@gmail.com>`, // sender address
            to: email, // list of receivers
            subject, // Subject line
            text: "Confirma tu cuenta de Prode PLV", // plain text body
            html, // html body
        });

    } catch (error) {
        console.log('Algo no va bien con el email', error);
    }
  }

  const getTemplate = (name, token) => {
      return `
      <html>
      <body>
        <center>
        <div style="margin:15px">
            <img src="https://images.teamtalk.com/content/uploads/2022/06/05225223/Lionel-Messi-Argentina-3.jpg" alt="">
            <h2>Hola ${ name }, soy Pedrako y te queria invitar a participar de mi prode.</h2>
            <h2>Para confirmar tu cuenta, ingresa al siguiente enlace:</h2>
            <a style=" margin-left: 10px;
            align-self: center;
            background-color: #8a1538;
            color: #eeeee4;
            border: 0px;
            padding: 10px;
            border-radius: 15px;
            text-decoration:none;
            font-weight:bold;
            margin:15px"
                href="https://prode-plv-qatar.herokuapp.com/user/confirm/${ token }"
                target="_blank"
            >Confirmar Cuenta</a>
        </div>
        </center>
        </body>
        </html>
      `;
  }

  module.exports = {
    sendEmail,
    getTemplate
  }