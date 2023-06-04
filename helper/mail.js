var nodemailer = require('nodemailer');
const mailSemd = (to, subject, content) => {
    console.log(to);

    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        service: 'gmail',
        auth: {
            user: 'sumanshivprakash742@gmail.com',
            pass: 'dituoixzafhqwrmq'  // leave user and pass blank for now
        }
    });
    let html = '<body style="background-color:grey"><table align="center" border="0" cellpadding="0" cellspacing="0" width="550" bgcolor="white" style="border:2px solid black"><tbody><tr><td align="center"><br /><table align="center" border="0" cellpadding="0" cellspacing="0" class="col-550" width="550"><tbody><tr><td>this is my testing mail </td></tr></tbody> </table> </td></tr> </tbody></table></body>';
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