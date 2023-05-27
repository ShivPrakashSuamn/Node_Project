const Joi = require('joi');
const { json } = require('express');
const connection = require('../helper/db');
const bcrypt = require('bcryptjs');
const { resolve } = require('path');

const index = async (req, res) => {     //  index   --------------------------
    let resp = { status: false, message: 'Oops Something went wrong ?', data: null }
    var limit = req.query.limit ? req.query.limit : 10;
    var search = req.query.search ? req.query.search : '';
    var page = req.query.page ? req.query.page : 1;
    var order_by = req.query.order_by ? req.query.order_by : 'id';
    var order_type = req.query.order_type ? req.query.order_type : 'asc';
    var total = 0;
    var totalPage = 0;
    var offset = 0;
    try {
        if (limit) {
            offset = (page - 1) * limit;
        }
        let sql1 = "SELECT * FROM plans where title like '%" + search + "%'or price LIKE '%" + search + "%'or offer_price LIKE '%" + search + "%' order by " + order_by + " " + order_type;
        await connection.query(sql1, async function (err, result1, fields) {
            if (err) throw err;
            total = result1.length;
            totalPage = Math.ceil(total / limit);
            let sql = "SELECT * FROM plans where title like '%" + search + "%'or price LIKE '%" + search + "%'or offer_price LIKE '%" + search + "%' order by " + order_by + " " + order_type + " limit " + offset + "," + limit;
            await connection.query(sql, async function (err, result, fields) {
                if (err) throw err;
                resp.status = true;
                resp.message = 'Data Fatch SuccessFull';
                resp.data = {
                    data: result,
                    page: page,
                    allPlan: total,
                    totalPage: totalPage,
                    features: await allFeature(),
                    planActive: await activePlan(req.user.id)
                };
                return res.json(resp);
            });
        });
    } catch (e) {
        return res.json(resp);
    }
}

const allFeature = async () => {        //  Get feature  ---------------------
    return new Promise(async (resolve, reject) => {
        let sql = "SELECT plans.id, plans.title, features.feature_name, features.feature_value, features.plan_id, features.status FROM `plans` JOIN `features` ON plans.id = features.plan_id ";
        await connection.query(sql, (err, result, fields) => {
            if (err) throw err;
            if (result) {
                resolve(result);
            } else {
                resolve(false);
            }
        });
    });
}

const activePlan = async (id) => {      //  Active plan  ---------------------
    return new Promise(async (resolve, reject) => {
        let sql = "SELECT payment.plan_id FROM `payment` WHERE user_id =" + id;
        await connection.query(sql, (err, result, fields) => {
            if (err) throw err;
            if (result.length) {
                resolve(result[0].plan_id);
            } else {
                resolve(false);
            }
        });
    });
}

const store = async (req, res) => {     //  Store   --------------------------
    let resp = { status: false, message: 'Oops something went wromg?', data: null }
    const schema = Joi.object({
        title: Joi.string().required(),
        price: Joi.string().required(),
        description: Joi.string().required(),
        status: Joi.string().required(),
        features: Joi.array().required()
    }).validate(req.body);
    if (schema.error) {
        resp.message = schema.error.details[0].message;
        return res.json(resp);
    }
    try {
        const data = schema.value;
        const categoryData = schema.value.features;
        let offer_price = '';
        if (req.body.offer_price) {
            offer_price = req.body.offer_price;
        } else {
            offer_price = null;
        }

        let sql = "INSERT INTO plans (admin_id, title, price, offer_price,total_sell,status,description) VALUES " +
            "('" + 1 + "','" + data.title + "', '" + data.price + "', '" + offer_price + "', '" + 0 + "', '" + data.status + "', '" + data.description + "')";
        await connection.query(sql, async function (err, result, fields) {
            let id = result.insertId;
            for (var i = 0; i < categoryData.length; i++) {
                var feature_name = categoryData[i]["feature_name"],
                    feature_value = categoryData[i]["feature_value"]
                let sql1 = "INSERT INTO features (plan_id, feature_name, feature_value, status) VALUES " +
                    "('" + id + "','" + feature_name + "', '" + feature_value + "', '" + 0 + "')";
                await connection.query(sql1, function (err, result1, fields) {
                    if (err) throw err;
                });
            }
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
        const categoryData = req.body.features;
        let offer_price = '';
        let sql1 = "DELETE FROM `features` WHERE `plan_id` = '" + req.query.id + "'";
        await connection.query(sql1, async function (err, result, fields) {          
            if (err) throw err;
            if (req.body.offer_price) {
                offer_price = req.body.offer_price;
            } else {
                offer_price = null;
            }
            let sql = "update plans set `admin_id`='" + req.body.admin_id + "', title='" + req.body.title + "', price='" + req.body.price + "', offer_price='" + offer_price + "'," +
                "total_sell='" + req.body.total_sell + "', status='" + req.body.status + "', description='" + req.body.description + "' where id ='" + data.id + "'";
            await connection.query(sql, async function (err, result, fields) {
                let id = req.query.id;
                for (var i = 0; i < categoryData.length; i++) {
                    var feature_name = categoryData[i]["feature_name"],
                        feature_value = categoryData[i]["feature_value"]
                    let sql1 = "INSERT INTO features (plan_id, feature_name, feature_value, status) VALUES " +
                        "('" + id + "','" + feature_name + "', '" + feature_value + "', '" + 0 + "')";
                    await connection.query(sql1, function (err, result1, fields) {
                        if (err) throw err;
                    });
                }
                if (err) throw err;
                resp.status = true;
                resp.message = 'Update data Successfull';
                resp.data = result;
                return res.json(resp);
            });
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
        let sql = "DELETE FROM plans where id = " + req.query.id;
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
        let cg_Data = '';
        let sql1 = "SELECT * FROM `features` WHERE plan_id =" + req.query.id;
        await connection.query(sql1, async function (err, result1, fields) {
            if (err) throw err;
            cg_Data = result1;

            let sql = "SELECT plans.*, COUNT(features.feature_name) as total_features FROM plans JOIN features ON plans.id = features.plan_id where plans.id =" + req.query.id;
            await connection.query(sql, function (err, result, fields) {
                if (err) throw err;
                resp.status = true;
                resp.message = 'Single Row Data';
                resp.data = {
                    data: result,
                    category: cg_Data
                }
                return res.json(resp);
            });
        });
    } catch (e) {
        console.log('catch error', e);
        return res.json(resp);
    }
}

const subscription = async (req, res) => {  // Delete Data ---------------------
    let resp = { status: false, message: 'Oops Something wemt worng ?', data: null }
    // validation -- 
    const schema = Joi.object({
        id: Joi.string().required()
    }).validate(req.query);
    if (schema.error) {
        resp.message = schema.error.details[0].message;
        return res.json(resp);
    }
    var id = schema.value;
    try {
        let settingData = await getSettings();
        let planData = await getPlans(id);
        let userData = await getLoginUser(req.user.id);
        var options = {         //  Payment  Options     --------------------------
            "key": settingData.key,
            "amount": planData.amount + '00',
            "currency": settingData.currency,
            "name": planData.title, //your business name
            "description": planData.description,
            //"image": "https://example.com/your_logo",
            //"callback_url": "https://eneqd3r9zrjok.x.pipedream.net/",
            "prefill": {
                "name": userData.fname + " " + userData.lname, //your customer's name
                "email": userData.email,
                "contact": userData.mobile
            },
            "notes": {
                "address": settingData.address
            },
            "theme": {
                "color": settingData.theme
            }
        }
        resp.status = true;
        resp.message = 'Single Row Data';
        resp.data = options;
        return res.json(resp);
    } catch (e) {
        console.log('catch error', e);
        return res.json(resp);
    }
}

const getSettings = () => {             //  Setting get  -----------------
    return new Promise(async (resolve, reject) => {
        let sql = "SELECT * FROM `settings`";
        await connection.query(sql, function (err, result, fields) {
            let data = {
                currency: result[3].value,
                key: result[4].value,
                theme: result[5].value,
                address: result[6].value
            }
            resolve(data);
        });
    });
}

const getPlans = async (id) => {        //  Plan  get    -----------------
    return new Promise(async (resolve, reject) => {
        let sql = "SELECT * FROM `plans` WHERE id =" + id.id;
        await connection.query(sql, function (err, result, fields) {
            if (result[0].offer_price == 'null') {
                let amount =  result[0].price;
                let title =  result[0].title;
                let description =  result[0].description;
                resolve({amount,title,description});
            } else {
                let amount =  result[0].offer_price;
                let title =  result[0].title;
                let description =  result[0].description;
                resolve({amount,title,description});
            }
        });
    });
}

const getLoginUser = async (id) => {    //  Login data   -----------------
    return new Promise(async (resolve, reject) => {
        let sql = "SELECT * FROM `users` WHERE id =" + id;
        await connection.query(sql, function (err, result, fields) {
            resolve(result[0]);
        });
    });
}

module.exports = { index, store, update, deleteRow, show, subscription }