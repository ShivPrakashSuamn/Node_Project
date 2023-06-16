const Joi = require('joi');
const connection = require('../helper/db');
const path = require("path");
const config = require('../config');
const { opne_zip, createFolder, folderExist, deleteTmpZip, deleteFolder } = require('../helper/common');
const worklogStore = require("../helper/worklog");

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
        let sql1 = "SELECT * FROM template where id LIKE '%" + search + "%'or title LIKE '%" + search + "%' order by " + order_by + " " + order_type;
        await connection.query(sql1, async function (err, result1, fields) {
            if (err) throw err;
            total = result1.length;
            totalPage = Math.ceil(total/limit);
            let sql = "SELECT * FROM template where id LIKE '%" + search + "%'or title LIKE '%" + search + "%' order by " + order_by + " " + order_type + " limit " + offset + "," + limit;
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

const store = async (req, res) => {    // store    ----------------------
    let resp = { status: false, message: 'Oops something went wrong', data: null };
    // Validation ----
    const schema = Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        category: Joi.string().required(),
        // status: Joi.string().required()
    }).validate(req.body);

    if (schema.error) {
        resp.message = schema.error.details[0].message;
        return res.json(resp);
    }
    try {
        const data = schema.value;
        // Insert ---- 
        let sql = "INSERT INTO template (title,description,category,status)" +
            " VALUES ('" + data.title + "','" + data.description + "','" + data.category + "','" + 'yes' + "')";
        await connection.query(sql, async function (err, result, fields) {
            if (err) throw err;
            // Folder create---
            let id = result.insertId;
            var dir = config.BASEURL + '/uploads/templates/' + id;
            await createFolder(dir);
            // extract zip on this folder 
            if (folderExist(dir)) {
                let source = config.BASEURL + '/uploads/tmp/' + req.file.filename;
                let target = config.BASEURL + '/uploads/templates/' + id;
                await opne_zip(source, target, true);

                // repo path  add table,  
                var repo_pat = '/uploads/templates/' + id;
                var index_pat = '/uploads/templates/' + id + '/index.html';
                var draft_pat = '/uploads/templates/' + id + '/draft.html';
                var thumb_pat = '/uploads/templates/' + id + '/thumbnail.jpg';
                let sql = "update template set repo_path='" + repo_pat + "',index_path='" + index_pat + "',draft_path='" + draft_pat + "',thumbnail='" + thumb_pat + "' where id = " + id;
                await connection.query(sql, async function (err, result, fields) {
                    if (err) throw err;
                    await deleteTmpZip(source);
                });
            }
            resp.status = true;
            resp.message = 'Data store SuccessFull!';
            resp.data = {};//result;
            await worklogStore(req.user.id,'Template','Create');
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
        id: Joi.string().required()
    }).validate(req.query);

    if (schema.error) {
        resp.message = schema.error.details[0].message;
        return res.json(resp);
    }
    try {
        if (req.file == undefined) {
            let sql = "update template set title='" + req.body.title + "',description='" + req.body.description + "',category='" + req.body.category + "',status='" + 0 + "'where id = " + req.query.id;
            await connection.query(sql, function (err, result, fields) {
                if (err) throw err;
                resp.status = true;
                resp.message = 'Data Update SuccessFull!';
                resp.data = result;
                return res.json(resp);
            });
        } else {
            let id = req.query.id;
            let deleteDir = config.BASEURL + `/uploads/templates/${id}`;
            await deleteFolder(deleteDir);  // delete Folder ---- 
            let sql = "update template set title='" + req.body.title + "',description='" + req.body.description + "',category='" + req.body.category + "',status='" + 0 + "'where id = " + req.query.id;
            await connection.query(sql, async function (err, result, fields) {
                // Folder create---
                var dir = config.BASEURL + '/uploads/templates/' + id;
                await createFolder(dir);
                // // extract zip on this folder 
                if (folderExist(dir)) {
                    let source = config.BASEURL + '/uploads/tmp/' + req.file.filename;
                    let target = config.BASEURL + '/uploads/templates/' + id;
                    await opne_zip(source, target, true);
                    
                    // repo path  add table,  
                    var repo_pat = '/uploads/templates/' + id;
                    var index_pat = '/uploads/templates/' + id + '/index.html';
                    var draft_pat = '/uploads/templates/' + id + '/draft.html';
                    var thumb_pat = '/uploads/templates/' + id + '/thumbnail.jpg';
                    let sql = "update template set repo_path='" + repo_pat + "',index_path='" + index_pat + "',draft_path='" + draft_pat + "',thumbnail='" + thumb_pat + "' where id = " + id;
                    await connection.query(sql, async function (err, result, fields) {
                        if (err) throw err;
                        await deleteTmpZip(source);
                    });
                }
                resp.status = true;
                resp.message = 'Data store SuccessFull!';
                resp.data = {};//result;
                await worklogStore(req.user.id,'Template','Update');
                return res.json(resp);
            });
        }
    } catch (e) {
        console.log('Catch error', e);
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
        let sql = "DELETE FROM template where id = " + req.query.id;
        await connection.query(sql, async function (err, result, fields) {
            if (err) throw err;
            resp.status = true;
            resp.message = 'Row Delete SuccessFull!';
            resp.data = result;
            await worklogStore(req.user.id,'Tenplate','Delete Row');
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
        let sql = "SELECT * FROM template where id =" + req.query.id;
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

module.exports = { index, store, update, deleteRow, show };
