var nodemailer = require('nodemailer');
const cron = require('node-cron');
const connection = require('../helper/db');

const setCron = async (req, res) => {
    try {
        // await cron.schedule('2 * * * * *', async () => {   

            // let loginId = req.user.id;
            let loginId = 6;
        
            let d = new Date();
        let curDate = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
        let curTime = d.getHours() + ':' + d.getMinutes();
        let sql = `SELECT *from mail_queue WHERE DATE(send_date)= '${curDate}' && send_time <= '${curTime}' && error = '' limit 1`;
        await connection.query(sql, async function (err, result, fields) {
            let data = result[0]
            let settingData = await getSetting(loginId);
            let resultMail = await mailSemd(settingData, data.from_mail, data.to_mail, data.subject, data.content);
            if (resultMail.status) {
                let result = resultMail.message;
                await deleteRow(data.id);
            } else {
                await storeError(data.id, resultMail.error);
            } 
        });
        //  });
    } catch (err) {
        console.error(err)
    }
}

const deleteRow = async (id) => {         // delete   ---------------------
    return new Promise(async (resolve, reject) => {
        let sql = "DELETE FROM mail_queue where id = " + id;
        await connection.query(sql, function (err, result, fields) {
            if (err) throw err;
            if (result) {
                console.log('Delete Row');
                resolve(true);
            } else {
                resolve(false);
            }
        });

    });
}

const storeError = async (id, err) => {   // delete   ----------------------
    return new Promise(async (resolve, reject) => {
        let sql = "UPDATE `mail_queue` SET error = '" + err + "' WHERE id =" + id;
        await connection.query(sql, function (err, result, fields) {
            if (err) throw err;
            if (result) {
                console.log('Update Data Row');
                resolve(true);
            } else {
                resolve(false);
            }
        });

    });
}

const getSetting = async (id) => { // get Setting function  ------------------
    return new Promise(async (resolve, reject) => {
        let sql = `SELECT * FROM user_setting WHERE user_id =${id}`;
        await connection.query(sql, async function (err, result, fields) {
            if (err) throw err;
            if (result) {
                let data = {
                    host: result[4].value,
                    port: result[6].value,
                    service: result[3].value,
                    user: result[1].value,
                    pass: result[2].value,
                }
                resolve(data);
            } else {
                resolve(false);
            }
        });
    });
}

const mailSemd = (setting, from, to, subject, content) => {  // Email Send --
    return new Promise((resolve, reject) => {
        let transporter = nodemailer.createTransport({
            host: setting.host,
            port: setting.port,
            secure: true,
            service: setting.service,
            auth: {
                user: setting.user,
                pass: setting.pass
            }
        });
        let mailOptions = {
            from: from, // sender address
            to: to,     // receiver address
            subject: subject, // Subject line
            text: "this is your password", // plain text body
            html: content, // html body
        };
        transporter.sendMail(mailOptions, function (err, data) {
            if (err) {
                console.log('error sending email', err);
                reject({ status: false, error: err });
            } else {
                resolve({ status: true, message: 'Email Send SuccessFull' });
            }
        });
    });
}

module.exports = { mailSemd, setCron };