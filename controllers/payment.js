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
        let sql1 = "SELECT payment.id,plans.title,users.fname,users.lname,payment.payment_id,payment.amount,payment.status,payment.created FROM payment JOIN users JOIN plans ON users.id = payment.user_id and plans.id = payment.plan_id where plan_id like '%" + search + "%'or user_id LIKE '%" + search + "%'or amount LIKE '%" + search + "%' order by " + order_by + " " + order_type;
        await connection.query(sql1, function (err, result1, fields) {
            if (err) throw err;
            total = result1.length;
        });
        let sql = "SELECT payment.id,plans.title,users.fname,users.lname,payment.payment_id,payment.amount,payment.status,payment.created FROM payment JOIN users JOIN plans ON users.id = payment.user_id and plans.id = payment.plan_id where plan_id like '%" + search + "%'or user_id LIKE '%" + search + "%'or amount LIKE '%" + search + "%' order by " + order_by + " " + order_type + " limit " + offset + "," + limit;
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
        plan_id: Joi.string().required(),
        user_id: Joi.string().required(),
        amount: Joi.string().required(),
        status : Joi.string().required(),
    }).validate(req.body);
    if (schema.error) {
        resp.message = schema.error.details[0].message;
        return res.json(resp);
    }
    try {
        const data = schema.value;
               
        let sql = "INSERT INTO payment (plan_id, user_id, payment_id, amount, status) VALUES ('"+ data.plan_id +"','"+ data.user_id +"', '"+0+"', '"+data.amount+"', '"+ data.status +"')";
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
    console.log('---', req.body.status)
    const schema = Joi.object({
        id: Joi.string().required()
    }).validate(req.query);
    if (schema.error) {
        resp.message = schema.error.details[0].message;
        return res.json(resp);
    }
    try {
        const data = schema.value;
        let sql = "update payment set status ='"+ req.body.status +"' where id ="+req.query.id;
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
        let sql = "DELETE FROM payment where id = " + req.query.id;
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
        let features1 ='';
        let sql1 = "SELECT * FROM features where id=" + req.query.id;
        await connection.query(sql1, function (err, result1, fields) {
            features1 = result1
        });
        let sql = "SELECT * FROM payment where id=" + req.query.id;
        await connection.query(sql, function (err, result, fields) {
            if (err) throw err;
            resp.status = true;
            resp.message = 'Single Row Data';
            resp.data = {
                data: result,
                features: features1
            };
            return res.json(resp);
        });
    } catch (e) {
        console.log('catch error', e);
        return res.json(resp);
    }
}

module.exports = { index, store, update, deleteRow, show }