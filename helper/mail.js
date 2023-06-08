var nodemailer = require('nodemailer');
const cron = require('node-cron');

const setCron = async () => {
    console.log('click');
    try {
        await cron.schedule('2 * * * * *', async () => {
            let offset = 0;        
            let sql1 = `select * from mail_queue where created >= curdate() limit 2 offset ${offset}`;
            await connection.query(sql1, async function (err, result1, fields) {
                console.log('get--', result1);
            });
            offset++   
        });
    } catch (err) {
        console.error(err)
    }
}
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

module.exports = { mailSemd, setCron };