const Joi = require('joi');
const { json } = require('express');
const connection = require('../helper/db');
const bcrypt = require('bcryptjs');

const index = async (req, res) => {     //  index   --------------------------
    let resp = { status: false, message: 'Oops Something went wrong ?', data: null }
    var limit = req.query.limit ? req.query.limit : 10;
    var search = req.query.search ? req.query.search : '';
    var page = req.query.page ? req.query.page : 1;
    var order_by = req.query.order_by ? req.query.order_by : 'id';
    var order_type = req.query.order_type ? req.query.order_type : 'desc';
    var total = 0;
    var offset = 0;
    try {
        // let sqlCount ="SELECT COUNT(id) as countUser FROM `users`";
        //     await connection.query(sqlCount, function(err, resultCount, fields){
        //         if(err) throw err ;
        //         console.log('User count->', resultCount[0].countUser);
        //        // total = result1.length ;
        //     });
        let sql1 = "SELECT * FROM users where fname like '%" + search + "%'or lname LIKE '%" + search + "%'or email LIKE '%" + search + "%' order by " + order_by + " " + order_type;
        await connection.query(sql1, function (err, result1, fields) {
            if (err) throw err;
            total = result1.length;
        });
        let sql = "SELECT * FROM users where fname like '%" + search + "%'or lname LIKE '%" + search + "%'or email LIKE '%" + search + "%' order by " + order_by + " " + order_type + " limit " + offset + "," + limit;
        await connection.query(sql, function (err, result, fields) {
            if (err) throw err;
            resp.status = true;
            resp.message = 'Data Fatch SuccessFull';
            resp.data = {
                data: result,
                limit: limit,
                page: page,
                allUser: total
            };
            return res.json(resp);
        })
    } catch (e) {
        return res.json(resp);
    }
}

const store = async (req, res) => {     //  Store   --------------------------
    let resp = { status: false, message: 'Oops something went wromg?', data: null }
    const schema = Joi.object({
        fname: Joi.string().required(),
        lname: Joi.string().required(),
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] }, }),
        password: Joi.string().min(4).max(8).required(),
    }).validate(req.body);
    if (schema.error) {
        resp.message = schema.error.details[0].message;
        return res.json(resp);
    }
    try {
        const data = schema.value;
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(data.password, salt);
        let sql = "INSERT INTO users (fname, lname, email, password) VALUES ('" + data.fname + "','" + data.lname + "', '" + data.email + "', '" + hash + "')";
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
    try {
        const data = schema.value;
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(req.body.password , salt);
        let sql = "update users set fname='"+ req.body.fname +"', lname='"+ req.body.lname +"', email='"+ req.body.email +"', password='"+ hash +"' where id ="+req.query.id;
        await connection.query(sql, function (err, result, fields) {
            if (err) throw err;
            resp.status = true;
            resp.message = 'Update data Successfull';
            resp.data = result;
            return res.json(resp);
        });
    } catch (e) {
        console.log('catch error', e);
        return res.json(resp);
    }
}

const deleteRow = async(req, res) => {  // Delete Data ------------------------
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
        let sql = "DELETE FROM users where id = " + req.query.id;
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
        let sql = "SELECT * FROM users where id=" + req.query.id;
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

module.exports = { index, store, update, deleteRow, show }