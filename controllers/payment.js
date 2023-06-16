//  ADMIN PAGE  --------

const Joi = require('joi');
const { json } = require('express');
const connection = require('../helper/db');

const index = async (req, res) => {     //  index   --------------------------
    let resp = { status: false, message: 'Oops Something went wrong ?', data: null }
    var limit = req.query.limit ? req.query.limit : 10;
    var search = req.query.search ? req.query.search : '';
    var page = req.query.page ? req.query.page : 1;
    var order_by = req.query.order_by ? req.query.order_by : 'id';
    var order_type = req.query.order_type ? req.query.order_type : 'desc';
    var total = 0;
    var totalPage = 0;
    var offset = 0;

    try {
        if (limit) {
            offset = (page - 1) * limit;
        }
        let sql1 = "SELECT payment.id,plans.title,users.fname,users.lname,payment.payment_id,payment.amount,payment.status,payment.created FROM payment JOIN users JOIN plans ON users.id = payment.user_id and plans.id = payment.plan_id where plan_id like '%" + search + "%'or user_id LIKE '%" + search + "%'or amount LIKE '%" + search + "%' order by " + order_by + " " + order_type;
        await connection.query(sql1, async function (err, result1, fields) {
            if (err) throw err;
            total = result1.length;
            totalPage = Math.ceil(total / limit);

            let sql = "SELECT payment.id,plans.title,users.fname,users.lname,payment.payment_id,payment.amount,payment.status,payment.created FROM payment JOIN users JOIN plans ON users.id = payment.user_id and plans.id = payment.plan_id where plan_id like '%" + search + "%'or user_id LIKE '%" + search + "%'or amount LIKE '%" + search + "%' order by " + order_by + " " + order_type + " limit " + offset + "," + limit;
            await connection.query(sql, function (err, result, fields) {
                if (err) throw err;
                resp.status = true;
                resp.message = 'Data Fatch SuccessFull';
                resp.data = {
                    data: result,
                    page: page,
                    allUser: total,
                    totalPage: totalPage
                };
                return res.json(resp);
            });
        });
    } catch (e) {
        return res.json(resp);
    }
}

const confirmPayment = async (req, res) => {     //  Store   --------------------------
    let resp = { status: false, message: 'Oops something went wromg?', data: null }
    const schema = Joi.object({
        plan_id: Joi.string().required(),
        payment_id: Joi.string().required()
    }).validate(req.body);
    if (schema.error) {
        resp.message = schema.error.details[0].message;
        return res.json(resp);
    }
    try {
        const data = schema.value;
        let plan = await getPlan(data.plan_id);
        let payment = await insertPayment(plan, data.payment_id,req);
        resp.status = true;
        resp.message = 'Payment SuccessFully !';
        resp.data = payment;
        return res.json(resp);
    } catch (e) {
        console.log('catch error', e);
        return res.json(resp);
    }
}

const getPlan = async (id) => {
    return new Promise(async (resolve, reject) => {
        let sql = "SELECT * FROM `plans` WHERE id =" + id;
        await connection.query(sql, async (err, result, fields) => {
            if (err) throw err;
            if (result) {
                resolve(result[0]);
            } else {
                reject(false);
            }
        });
    });
}

const insertPayment = async (plan, paymentId,req) => {
    let loginUserId = req.user.id;
    return new Promise(async (resolve, reject) => {
        let sql = "INSERT INTO payment (plan_id,user_id,payment_id,amount,status)VALUES('"+ plan.id +"','"+ loginUserId +"', '"+ paymentId +"', '"+ plan.price +"', '1')";
        await connection.query(sql, async function (err, result, fields) {
            if (err) throw err;
            if (result) {
                resolve(result);
            } else {
                reject(false);
            }
        });
    });
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
        let sql = "update payment set status ='" + req.body.status + "' where id =" + req.query.id;
        await connection.query(sql, async function (err, result, fields) {
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
        let features1 = '';
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

module.exports = { index, confirmPayment, update, deleteRow, show }