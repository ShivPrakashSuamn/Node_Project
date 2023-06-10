const connection = require('../helper/db');
const bcrypt = require('bcryptjs');
const Joi = require('joi');
const jsonwebtoken = require("jsonwebtoken");
const config = require('../config');

const login = async (req, res) => {        // Login  -------------------------
    let resp = { status: false, message: 'Opps something went wrong', data: null };

    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.body.password, salt);

    let sql = "select * from users where email ='" + req.body.email + "'";
    await connection.query(sql, function (err, result, fields) {
        if (err) throw err;
        if (result.length > 0) {
            let data = JSON.parse(JSON.stringify(result))
            //companer password ------------
            if (bcrypt.compareSync(req.body.password, data[0].password)) {
                let token = jsonwebtoken.sign({ user: data[0] }, config.JWT_SECRET, { expiresIn: '3h' });
                resp.status = true;
                resp.message = 'Login Success';
                resp.data = { user: result[0], token: token };
                res.json(resp);
            } else {
                resp.message = 'password not match';
                res.json(resp);
            }
        } else {
            resp.message = 'Email not found';
            res.json(resp);
        }
    });
}

const profile = async (req, res) => {      // profile ------------------------
    let resp = { status: false, message: 'Opps something went wrong', data: null };
    let sql = "select * from users where id ='" + req.query.id + "'";
    await connection.query(sql, function (err, result, fields) {
        if (err) throw err;
        if (result.length > 0) {
            let data = JSON.parse(JSON.stringify(result))
            resp.status = true;
            resp.message = 'Data Fetch Success';
            resp.data = data[0];
            res.send(resp);
        } else {
            resp.message = 'Something went wrong';
            res.send(resp);
        }
    });
}

const register = async (req, res) => {     // register  ----------------------
    let resp = { status: false, message: 'Oops something went wromg?', data: null }
    const schema = Joi.object({
        fname: Joi.string().required(),
        lname: Joi.string().required(),
        password: Joi.string().min(4).max(8).required(),
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] }, }),
        mobile: Joi.string().required(),
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
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(data.password, salt);
        let sql1 = "SELECT * FROM `users` WHERE email = '" + data.email + "'";
        await connection.query(sql1, async (err, result1, fields) => {
            if (result1.length) {
                resp.message = 'Email Already Exist';
                resp.data = result1;
                return res.json(resp);
            } else {
                let sql = "INSERT INTO users (fname,lname,email,password,mobile,image)VALUES('" + data.fname + "','" + data.lname + "','" + data.email + "','" + hash + "','" + `${data.mobile}` + "','" + fileUplad + "')";
                await connection.query(sql, function (err, result, fields) {
                    if (err) throw err;
                    resp.status = true;
                    resp.message = 'Data Save SuccessFull';
                    resp.data = result;
                    return res.json(resp);
                });
            }
        });
    } catch (e) {
        console.log('catch error', e);
        return res.json(resp);
    }
}

const forgotpassword = async (req, res) => { // forgot  -----------------------
    let resp = { status: false, message: 'oops something went weong?', data: null };
    // validation ----
    if (req.query.id) {
        const schema = Joi.object({
            id: Joi.string(),
            password: Joi.string().min(4).max(8).required(),
        }).validate(req.body);

        if (schema.error) {
            resp.message = schema.error.details[0].message;
            return res.json(resp);
        }
        const data = schema.value;
        // Crypt password ---
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(data.password, salt);

        let sql = "update users set password='" + hash + "'where id =" + req.query.id;
        await connection.query(sql, function (err, result, fields) {
            if (err) throw err;
            resp.status = true;
            resp.message = 'Forgot Password Success';
            resp.data = result;
            console.log('resp-', resp);
            return res.json(resp);
        });
    } else {
        resp.message = 'id not Found';
        return res.json(resp);
    }
}

const resetpassword = (req, res) => {     // reset   --------------------------

}

const worklog = async (req, res) => {     // worlong  ---------------------------

    var resp = { status: false, message: 'Oops Something went wrong', data: null };

    var limit = req.query.limit ? req.query.limit : 10;
    var search = req.query.search ? req.query.search : '';
    var page = req.query.page ? req.query.page : 1;
    var order_by = req.query.order_by ? req.query.order_by : 'id';
    var order_type = req.query.order_type ? req.query.order_type : 'desc';
    var offset = 0;
    var total = 0;
    var totalPage = 0;
    if (limit) {
        offset = (page - 1) * limit;
    }
    try {
        let sql1 = "SELECT * FROM `worklog` where `title` LIKE '%" + search + "%' order by " + order_by + " " + order_type;
        await connection.query(sql1, async function (err, result1, fields) {
            if (err) throw err;
            total = result1.length;
            totalPage = Math.ceil(total / limit);
            let sql = "SELECT * FROM `worklog` where `title` LIKE '%" + search + "%' order by " + order_by + " " + order_type + " limit " + offset + "," + limit;
            await connection.query(sql, function (err, result, fields) {
                if (err) throw err;
                resp.status = true;
                resp.message = 'Data Fatch SuccessFull';
                resp.data = {
                    data: result,
                    total: total,
                    page: page,
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

module.exports = { login, register, forgotpassword, resetpassword, profile, worklog };
