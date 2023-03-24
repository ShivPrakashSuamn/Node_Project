const connection = require('../helper/db');
const bcrypt = require('bcryptjs');
const Joi = require('joi');

const login = async (req, res) => {        // Login  -------------------------
    let resp = { status: false, message: 'Opps something went wrong', data: null };

    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.body.password, salt);

    let sql = "select*from users where email ='" + req.body.email + "'";
    await connection.query(sql, function (err, result, fields) {
        if (err) throw err;
        if (result.length > 0) {
            let data = JSON.parse(JSON.stringify(result))
            //companer password ----
            if (bcrypt.compareSync(req.body.password, data[0].password)) {
                resp.status = true;
                resp.message = 'Login Success';
                resp.data = result;
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

const register = async (req, res) => {     // register  ----------------------
    let resp = { status: false, message: 'Opps something went wrong', data: null };
    // Validation ----
    const schema = Joi.object({
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] }, }),
        password: Joi.string().min(4).max(8).required(),
        name: Joi.string().required()
    }).validate(req.body);

    if (schema.error) {
        resp.message = schema.error.details[0].message;
        return res.json(resp);
    }
    const data = schema.value;
    console.log('req', data);
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(data.password, salt);
    // Insert ----    
    let sql = "INSERT INTO users (name, email, password) VALUES ('" + data.name + "', '" + data.email + "', '" + hash + "')";
    await connection.query(sql, function (err, result, fields) {
        if (err) throw err;
        resp.status = true;
        resp.message = 'Register Success';
        resp.data = result;
        console.log('resp-', resp);
        return res.json(resp);
    });
}

const forgotpassword = async (req, res) => { // forgot   -----------------------
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

const resetpassword = (req, res) => {     // reset   ------------------------

}

module.exports = { login, register, forgotpassword, resetpassword };
