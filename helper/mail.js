var nodemailer = require('nodemailer');
const cron = require('node-cron');
const connection = require('../helper/db');

const setCron = async () => {    // Set Cron  Function   -------------------- 
    try {
        let d = new Date();
        let curDate = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
        let curTime = d.getHours() + ':' + d.getMinutes();
        let sql = `SELECT *from mail_queue WHERE DATE(send_date)= '${curDate}' && send_time <= '${curTime}' && error = '' limit 1`;
        await connection.query(sql, async function (err, result, fields) {
            if (err) throw err;
            if (result != '') {
                let data = result[0];
                let settingData = await getSetting(data.user_id);
                let resultMail = await mailSemd(settingData, data.from_mail, data.to_mail, data.subject, data.content);
                if (resultMail.status) {
                    let result = resultMail.message;
                    await emailResultStory(data.to_mail, data.subject, data.compaign_id, 1);
                    await deleteRow(data.id);
                } else {
                    await emailResultStory(data.to_mail, data.subject, data.compaign_id, 0);
                    await storeError(data.id, resultMail.error);
                }
            }
        });
    } catch (err) {
        console.error(err);
    }
}

const sendPathMail = async (userData, token, path) => {  //  Forget password send mail Path ------
    return new Promise(async (resolve, reject) => {
        let settingData = await getSetting(6);
        let data = `<html> <head> <style type="text/css" rel="stylesheet" media="all"> body {width: 100% !important;height: 100%;margin: 0;-webkit-text-size-adjust: none;}a {color: #ff256f;text-decoration: none;}a img {border: none;}td {word-break: break-word;}body, td, th {font-family: "Nunito Sans", Helvetica, Arial, sans-serif;}h1 {margin-top: 0;color: #333333;font-size: 22px;font-weight: bold;text-align: left;}h2 {margin-top: 0;color: #333333;font-size: 16px;font-weight: bold;text-align: left;}h3 {margin-top: 0;color: #333333;font-size: 14px;font-weight: bold;text-align: left;}td, th {font-size: 16px;}p, ul, ol, blockquote {margin: .4em 0 1.1875em;font-size: 16px;line-height: 1.625;color: #6b6b6b;}p.sub {font-size: 13px;}</style> </head> <body> <table style="width: 100%;"> <tr> <td> <div style="background: #e9e9ea94;"> <h1 style="text-align: center;font-size: 30px;padding: 30px;"><a style="color: #ff256f;" href="http://localhost:4200/register"> Email Marketing Software </a></h1> </div> </td> </tr> </table> <table class="email-wrapper" style="margin: auto;"> <tr> <td align="center"> <table class="email-content"> <tr> <td class="email-body" width="100%" cellpadding="0" cellspacing="0"> <table class="email-body_inner" align="center" width="570" cellpadding="0" cellspacing="0" role="presentation"> <tbody> <tr> <td class="content-cell"> <div class="f-fallback"> <h1>Hi ${userData.fname}${userData.lname}</h1> <p>You recently requested to reset your password for your [Product Name] account. Use the button below to reset it. <strong>This password reset is only valid for the next 24 hours.</strong></p> <!-- Action --> <div style="text-align: center;margin: 10%;"> <a href="${path}?token=${token}" style="background: #00860c;padding: 10px;border-radius: 5px;color: white;" target="_blank">Reset your password</a> </div> <p>For security, this request was received from a {{operating_system}}device using {{browser_name}}. If you did not request a password reset, please ignore this email or <a style="color: #ff256f;" href="http://localhost:4200/login">contact support</a> if you have questions.</p> <p>Thanks, <br>The [Product Name] Team</p> <!-- Sub copy --> <table class="body-sub" role="presentation"> <tbody> <tr> <td> <p class="f-fallback sub">If you’re having trouble with the button above, copy and paste the URL below into your web browser.</p> <p class="f-fallback sub">{{action_url}}</p> </td> </tr> </tbody> </table> </div> </td> </tr> </tbody> </table> </td> </tr> </table> </td> </tr> </table> <table style="width: 100%;"> <tr> <td> <div style="text-align: center;background: #f2f2f3;padding: 15px;" > <p class="f-fallback sub align-center">© 2019 [Product Name]. All rights reserved.</p> <p class="f-fallback sub align-center"> [Company Name, LLC] <br>1234 Street Rd. <br>Suite 1234 </p> </div> </td> </tr> </table> </body> </html>`;
        //let data = `<a href="${path}?token=${token}"> Reset Page click </a>`;
        await mailSemd(settingData, settingData.user, userData.email, 'Change Password', data);
        resolve(true);
    });
}

const emailResultStory = async (to, sub, id_com, check) => {   //  delete   ----------------------
    return new Promise(async (resolve, reject) => {
        let sql = '';
        if (check == 0) {
            sql = "INSERT INTO `sendmail` (`id`, `to`, `subject`, `send_mail`, `error_mail`, `compaign_id`) VALUES (NULL,'" + to + "','" + sub + "','false','true','" + id_com + "')";
        } else {
            sql = "INSERT INTO `sendmail` (`id`, `to`, `subject`, `send_mail`, `error_mail`, `compaign_id`) VALUES (NULL,'" + to + "','" + sub + "','true','false','" + id_com + "')";
        }
        await connection.query(sql, function (err, result, fields) {
            if (err) throw err;
            if (result) {
                resolve(true);
            } else {
                resolve(false);
            }
        });

    });
}

const deleteRow = async (id) => {         // delete   ----------------------
    return new Promise(async (resolve, reject) => {
        let sql = "DELETE FROM mail_queue where id = " + id;
        await connection.query(sql, function (err, result, fields) {
            if (err) throw err;
            if (result) {
                console.log('Semd Email &&  Delete Row');
                resolve(true);
            } else {
                reject(false);
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
                console.log('Update Data Row Add Error');
                resolve(true);
            } else {
                resolve(false);
            }
        });

    });
}

const getSetting = async (id) => { // get Setting function  -----------------
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
                // console.log('error sending email ----', err);
                resolve({ status: false, error: err });
            } else {
                resolve({ status: true, message: 'Email Send SuccessFull' });
            }
        });
    });
}

module.exports = { mailSemd, setCron, sendPathMail };