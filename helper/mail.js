var nodemailer = require('nodemailer');
const mailSemd = (to, subject, content) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",//setting
        port: 465,//setting
        secure: true,
        service: 'gmail',//setting
        auth: {
            user: 'sumanshivprakash742@gmail.com',//setting
            pass: 'dituoixzafhqwrmq'  // leave user and pass blank for now //setting
        }
    });
   
    let mailOptions = {
        from: 'sumanshivprakash742@gmail.com', // sender address
        to: to, // receiver address
        subject: subject, // Subject line
        text: "this is your password", // plain text body
        html: content, // html body
    };
    transporter.sendMail(mailOptions, function (err, data) {
        if (err) {
            console.log('error sending email', err);
        } else {
            console.log('email send success');
        }
    });
}

module.exports = mailSemd;