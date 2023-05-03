const constant = require('../helper/constant');
const Joi = require('joi');
const connection = require('../helper/db');
const path = require("path");
const config = require('../config');

const getSetting = async (req, res) => {     // index    ----------------------
    var resp = { status: false, message: 'Oops Something went wrong', data: null };

    try {
        let key = req.params.key;
        resp.status = true;
        resp.message = 'Fatch Data FuccessFull';
        resp.data = constant[key];
        return res.json(resp);
    } catch (e) {
        console.log('Catch error', e);
        return res.json(resp);
    }
}

const index = async (req, res) => {     //  index   --------------------------
    let resp = { status: false, message: 'Oops Something went wrong ?', data: null }
    var limit = req.query.limit ? req.query.limit : 10;
    var search = req.query.search ? req.query.search : '';
    var page = req.query.page ? req.query.page : 1;
    var order_by = req.query.order_by ? req.query.order_by : 'id';
    var order_type = req.query.order_type ? req.query.order_type : 'desc';
    var total = 0;
    var offset = 0;
    var totalPage = 0;
    try {
        if (limit) {
            offset = (page - 1) * limit;
        }
        let sql1 = "SELECT * FROM `settings` where  `id` LIKE '%" + search + "%' or `key` LIKE '%" + search + "%' or `type` LIKE '%" + search + "%' order by " + order_by + " " + order_type;
        await connection.query(sql1, async function (err, result1, fields) {
            if (err) throw err;
            total = result1.length;
            totalPage = Math.ceil(total / limit);

            let sql = "SELECT * FROM `settings` where  `id` LIKE '%" + search + "%' or `key` LIKE '%" + search + "%' or `type` LIKE '%" + search + "%' order by " + order_by + " " + order_type + " limit " + offset + "," + limit;
            await connection.query(sql, function (err, result, fields) {
                if (err) throw err;
                resp.status = true;
                resp.message = 'Data Fatch SuccessFull';
                resp.data = {
                    data: result,
                    limit: limit,
                    page: page,
                    allUser: total,
                    totalPage: totalPage
                };
                return res.json(resp);
            });
        });
    } catch (e) {
        console.log('catch error', e);
        return res.json(resp);
    }
}

const store = async (req, res) => {     //  Store   --------------------------
    let resp = { status: false, message: 'Oops something went wromg?', data: null }
    const schema = Joi.object({
        key: Joi.string().required(),
        type: Joi.string().required(),
    }).validate(req.body);
    if (schema.error) {
        resp.message = schema.error.details[0].message;
        return res.json(resp);
    }
    let fileUplad = '';
    if (req.file == undefined) {
        fileUplad = null;
    } else {
        fileUplad = req.file.filename;
    }
    try {
        const data = schema.value;
        let sql = "INSERT INTO `settings` (`key`, `value`, `type`) VALUES ('" + data.key + "','" + fileUplad + "','" + data.type + "')";
        await connection.query(sql, function (err, result, fields) {
            if (err) throw err;
            resp.status = true;
            resp.message = 'Data Save SuccessFull';
            resp.data = result;
            return res.json(resp);
        });
    } catch (e) {
        console.log('catch error', e);
        return res.json(resp);
    }
}

const update = async (req, res) => {    // Update   ---------------------------
    let resp = { status: false, message: 'Oops Something went wrong?', data: null }
    const schema = Joi.object({
        id: Joi.string().required()
    }).validate(req.query);
    if (schema.error) {
        resp.message = schema.error.details[0].message;
        return res.json(resp);
    }
    let fileUplad = '';
    const data = schema.value;
    try {
        if (req.file == undefined) {
            let sql2 = "SELECT settings.value FROM `settings` where id=" + req.query.id;
            await connection.query(sql2, async (err, result2, fields) => {
                if (err) throw err;
                fileUplad = result2[0].value;
                let sql = "update `settings` set `key`='" + req.body.key + "', type='" + req.body.type + "',value='" + fileUplad + "' where id =" + data.id;
                await connection.query(sql, function (err, result, fields) {
                    if (err) throw err;
                    resp.status = true;
                    resp.message = 'Update data Successfull';
                    resp.data = result;
                    return res.json(resp);
                });
            });
        } else {
            fileUplad = req.file.filename;
            let sql = "update `settings` set `key`='" + req.body.key + "', type='" + req.body.type + "', value='" + fileUplad + "' where id =" + data.id;
            await connection.query(sql, function (err, result, fields) {
                if (err) throw err;
                resp.status = true;
                resp.message = 'Update data Successfull';
                resp.data = result;
                return res.json(resp);
            });
        }
    } catch (e) {
        console.log('catch error', e);
        return res.json(resp);
    }
}

const deleteRow = async (req, res) => {  // Delete Data ------------------------
    let resp = { status: false, message: 'Oops Something wemt worng ?', data: null }
    // validation -- 
    const schema = Joi.object({
        id: Joi.string().required()
    }).validate(req.query);

    if (schema.error) {
        resp.message = schema.error.details[0].message;
        return res.json(resp);
    }
    try {
        let sql = "DELETE FROM settings where id = " + req.query.id;
        await connection.query(sql, function (err, result, fields) {
            if (err) throw err;
            resp.status = true;
            resp.message = 'Single Row Data';
            resp.data = result;
            return res.json(resp);
        });
    } catch (e) {
        console.log('catch error', e);
        return res.json(resp);
    }
}

const show = async (req, res) => {      // Show line data ---------------------
    let resp = { status: false, message: 'Oops something went wrong?', data: null }
    // validaation --
    const schema = Joi.object({
        id: Joi.string().required()
    }).validate(req.query);
    if (schema.error) {
        resp.message = schema.error.details[0].message;
        return res.json(resp);
    }
    try {
        let sql = "SELECT * FROM `settings` where id=" + req.query.id;
        await connection.query(sql, function (err, result, fields) {
            if (err) throw err;
            resp.status = true;
            resp.message = 'Single Row Data';
            resp.data = result;
            return res.json(resp);
        });
    } catch (e) {
        console.log('catch error', e);
        return res.json(resp);
    }
}

module.exports = { getSetting, index, store, update, deleteRow, show };