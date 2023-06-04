const Joi = require('joi');
var fs = require('fs');
const config = require('../config');
const connection = require('../helper/db');
const { createFolder, copyPasteFolder } = require('../helper/common');
const mailSemd = require('../helper/mail');

const index = async (req, res) => {     // index    ----------------------
    var resp = { status: false, message: 'Oops Something went wrong', data: null };
    var search = req.query.search ? req.query.search : '';
    var limit = req.query.limit ? req.query.limit : '';
    var page = req.query.page ? req.query.page : '';
    var order_by = req.query.order_by ? req.query.order_by : 'id';
    var order_type = req.query.order_type ? req.query.order_type : 'desc';
    var offset = 0;
    var total = 0;
    var totalPage = 0;

    try {
        if (limit) {
            offset = (page - 1) * limit;
        }
        let sql1 = "SELECT * FROM compaign where id LIKE '%" + search + "%'or title LIKE '%" + search + "%' order by " + order_by + " " + order_type;
        await connection.query(sql1, async function (err, result1, fields) {
            if (err) throw err;
            total = result1.length;
            totalPage = Math.ceil(total / limit);
            let sql = "SELECT * FROM compaign where id LIKE '%" + search + "%'or title LIKE '%" + search + "%' order by " + order_by + " " + order_type + " limit " + offset + "," + limit;
            await connection.query(sql, function (err, result, fields) {
                if (err) throw err;
                resp.status = true;
                resp.message = 'Data Fatch SuccessFull';
                resp.data = {
                    data: result,
                    page: page,
                    total: total,
                    totalPage: totalPage
                };
                return res.json(resp);
            });
        });
    } catch (e) {
        console.log('Catch error', e);
        return res.json(resp);
    }
}

const sendMail = async (req, res) => {    // Send Mail Function   -------------------
    let resp = { status: false, message: 'Oops something went wrong', data: null };
    // Validation ----
    const schema = Joi.object({
        id: Joi.string().required(),
    }).validate(req.query);

    if (schema.error) {
        resp.message = schema.error.details[0].message;
        return res.json(resp);
    }
    try {
        const data = schema.value;
        const schedule = req.body.schedule;
        const loginId = req.user.id;
        let listId = req.body.contacts;
        for (var i = 0; i < listId.length; i++) {
            await getListContect(listId[i], data.id, loginId, schedule);
        }
        resp.status = true;
        resp.message = 'Mail Send SuccessFull!';
        resp.data = [];
        return res.json(resp);

    } catch (e) {
        console.log('catch error ', e)
        return res.json(resp);
    }
}
const getListContect = async (id, compaignId, loginId, schedule) => { // list get  function  -----------
    return new Promise(async (resolve, reject) => {
        let sql = "SELECT * FROM `list_contacts` WHERE list_id ='" + id + "'";
        await connection.query(sql, async function (err, result, fields) {
            if (err) throw err;
            if (result) {
                for (var i = 0; i < result.length; i++) {
                    let contactEnail = await getContectEmail(result[i].contact_id, compaignId, loginId, schedule);
                    resolve(contactEnail);
                }
            } else {
                resolve(false);
            }
        });
    });
}
const getContectEmail = async (id, compaignId, loginId, schedule) => { // Contect Email Get function  ---
    return new Promise(async (resolve, reject) => {
        let sql = `SELECT * FROM contact WHERE id =${id}`;
        await connection.query(sql, async function (err, result, fields) {
            if (err) throw err;
            if (result) {
                let to_email = result[0].email;
                let htmlPath = config.BASEURL + '/files/index2.html';  // path html file
                let html = await fs.readFileSync(htmlPath, 'utf8');
                let compaignTitle = await getCompaignTitle(compaignId);
                let sql = "INSERT INTO `mail_queue` (user_id,from_mail,to_mail,subject,content,schedule,status) VALUES ('"+ loginId +"','sumanshivprakash742@gmail.com','"+ to_email +"','"+ compaignTitle +"',' html ','" + schedule + "','true')";
                 await connection.query(sql, async function (err, result, fields) {
                     let sql1 =  "SELECT * FROM mail_queue WHERE created  = CURDATE()";
                     await connection.query(sql1, async function (err, result1, fields) {
                         // if(err) throw err;
                         console.log('get--', result1);
                         // await mailSemd(to_email, compaignTitle, html);
                        });
                    console.log('inser', result);
                })
                resolve(true);
            } else {
                resolve(false);
            }
        });
    });
}
const getCompaignTitle = async (id) => { // Compaigni function  ----
    return new Promise(async (resolve, reject) => {
        let sql = `SELECT * FROM compaign WHERE id =${id}`;
        await connection.query(sql, async function (err, result, fields) {
            if (err) throw err;
            if (result) {
                resolve(result[0].title);
            } else {
                resolve(false);
            }
        });
    });
}

const store = async (req, res) => {    // store    ----------------------
    let resp = { status: false, message: 'Oops something went wrong', data: null };
    // Validation ----
    console.log('click', req.body)
    const schema = Joi.object({
        title: Joi.string().required(),
    }).validate(req.body);

    if (schema.error) {
        resp.message = schema.error.details[0].message;
        return res.json(resp);
    }
    try {
        const data = schema.value;
        // Insert ---
        let sql = "INSERT INTO `compaign` (title) VALUES ('" + data.title + "')";
        await connection.query(sql, function (err, result, fields) {
            let listId = result.insertId;
            if (err) throw err;
            resp.status = true;
            resp.message = 'Data store SuccessFull!';
            resp.data = listId;
            return res.json(resp);
        });
    } catch (e) {
        console.log('catch error ', e)
        return res.json(resp);
    }
}

const update = async (req, res) => {   // update   ----------------------
    let resp = { status: false, message: 'Oops something went wrong', data: null };
    // validation ---
    const schema = Joi.object({
        id: Joi.string().required(),
    }).validate(req.query);

    if (schema.error) {
        resp.message = schema.error.details[0].message;
        return res.json(resp);
    }
    let fileUplad = '';
    const data = schema.value;
    try {
        // Folder create---
        let cam_id = data.id;
        let template_id = req.body.template_id;
        var dir = config.BASEURL + '/uploads/userTemplates/' + cam_id;
        await createFolder(dir);

        // Old Template Copy paste -------
        const coypPath = config.BASEURL + `/uploads/templates/${template_id}`;
        await copyPasteFolder(coypPath, dir);

        // repo path  add table,  
        var repo_pat = '/uploads/userTemplates/' + cam_id;
        var index_pat = '/uploads/userTemplates/' + cam_id + '/index.html';
        var thumb_pat = '/uploads/userTemplates/' + cam_id + '/thumbnail.jpg';
        var draft_pat = '/uploads/userTemplates/' + cam_id + '/draft.html';
        let sql = "update compaign set template_id ='" + template_id + "', repo_path='" + repo_pat + "',index_path='" + index_pat + "',thumbnail_path='" + thumb_pat + "',draft_path='" + draft_pat + "',status='1' where id = '" + data.id + "'";
        await connection.query(sql, function (err, result, fields) {
            if (err) throw err;
            resp.status = true;
            resp.message = 'Template Save Successfull';
            resp.data = result;
            return res.json(resp);
        });
    } catch (e) {
        resp.message = 'Error Update System';
        return res.json(resp);
    }
}

const deleteRow = async (req, res) => {// delete   ----------------------
    let resp = { status: false, message: 'Oops something went wrong', data: null };
    // validation -- 
    const schema = Joi.object({
        id: Joi.string().required()
    }).validate(req.query);

    if (schema.error) {
        resp.message = schema.error.details[0].message;
        return res.json(resp);
    }
    try {
        let sql = "DELETE FROM compaign where id = " + req.query.id;
        await connection.query(sql, function (err, result, fields) {
            if (err) throw err;
            resp.status = true;
            resp.message = 'Row Delete SuccessFull!';
            resp.data = result;
            // console.log('resp-', resp);
            return res.json(resp);
        });
    } catch (e) {
        console.log('Catch error', e);
        return res.json(resp);
    }
}

const show = async (req, res) => {     // show     ----------------------
    var resp = { status: false, message: 'Oops Something went wrong', data: null };
    // validaation --
    const schema = Joi.object({
        id: Joi.string().required()
    }).validate(req.query);
    if (schema.error) {
        resp.message = schema.error.details[0].message;
        return res.json(resp);
    }
    try {
        let sql = "SELECT * FROM compaign where id =" + req.query.id;
        await connection.query(sql, function (err, result, fields) {
            if (err) throw err;
            resp.status = true;
            resp.message = 'Row Data Fatch';
            resp.data = {
                data: result,
            };
            return res.json(resp);
        });
    } catch (e) {
        console.log('Catch error', e);
        return res.json(resp);
    }
}

module.exports = { index, sendMail, store, update, deleteRow, show };