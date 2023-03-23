const Joi = require('joi');
const config = require('../config');
const connection = require('../helper/db');
const csvtojson = require('csvtojson');
const fs = require('fs');
const csv = require('fast-csv');
const { opne_zip, createFolder, folderExist,deleteTmpZip } = require('../helper/common')

const index = async (req, res) => {     // index    ----------------------
    var resp = { status: false, message: 'Oops Something went wrong', data: null };
    try {
        let sql = "SELECT * FROM contact";
        await connection.query(sql, function (err, result, fields) {
            if (err) throw err;
            resp.status = true;
            resp.message = 'Data Fatch SuccessFull';
            resp.data = result;
            console.log('data = ', resp);
            return res.json(resp);
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
        fname: Joi.string().required(),
        lname: Joi.string().required(),
        email: Joi.string().required(),
        dob: Joi.string().required(),
        phone: Joi.string().required(),
        address: Joi.string().required(),
        city: Joi.string().required(),
        pincode: Joi.string().required()
    }).validate(req.body);

    if (schema.error) {
        resp.message = schema.error.details[0].message;
        return res.json(resp);
    }

    try {
        const data = schema.value;
        // Insert ---- 
        if (req.file.filename) {

            const fileName = config.BASEURL + '/uploads/tmp/' + req.file.filename;

            const fs = require("fs");
            const readline = require("readline");
            const stream = fs.createReadStream(fileName);
            const rl = readline.createInterface({ input: stream });
            let data = [];

            rl.on("line", (row) => {
                data.push(row.split(","));
            });

            rl.on("close", () => {
                // console.log(data);
            });
            fs.createReadStream(fileName)
                .pipe(csv.parse({ headers: true }))
                .on('error', error => console.error(error))
                .on('data', row => data.push(row))
                .on('end', () => console.log(data));

            csvtojson().fromFile(fileName).then(source => {
                for (var i = 0; i < source.length; i++) {
                    var fname = source[i]["fname"],
                        lname = source[i]["lname"],
                        email = source[i]["email"],
                        dob = source[i]["dob"],
                        phone = source[i]["phone"],
                        address = source[i]["address"],
                        city = source[i]["City"],
                        pincode = source[i]["pin_code"],
                        status = source[i]["status"]

                    let sql = "INSERT INTO contact (fname,lname,email,dob,phone,address,city,pin_code,status)" +
                        " VALUES ('" + fname + "','" + lname + "','" + email + "','" + dob + "','" + phone + "','" + address + "','" + city + "','" + pincode + "','" + status + "')";
                    connection.query(sql,
                        (err, results, fields) => {
                            if (err) {
                                console.log("Unable to insert item at row ", i + 1);
                                return console.log(err);
                            }
                        });
                }
                console.log("All CSV items stored into database successfully ");
                deleteTmpZip(fileName);
            });
        } else {
            let sql = "INSERT INTO contact (fname,lname,email,dob,phone,address,city,pin_code,status)" +
                " VALUES ('" + data.fname + "','" + data.lname + "','" + data.email + "','" + data.dob + "','" + data.phone + "','" + data.address + "','" + data.city + "','" + data.pincode + "',0)";
        }
        await connection.query(sql, function (err, result, fields) {
            if (err) throw err;
            resp.status = true;
            resp.message = 'Data store SuccessFull!';
            resp.data = result;
            console.log('resp-', resp);
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
        let sql = "update contact set fname='" + req.body.fname + "',lname='" + req.body.lname + "',email='" + req.body.email + "',dob='" + req.body.dob + "',phone='" + req.body.phone + "'," +
            "image='" + req.file.filename + "',address='" + req.body.address + "',city='" + req.body.city + "',pin_code='" + req.body.pincode + "',status='" + req.body.status + "' where id = " + req.query.id;
        await connection.query(sql, function (err, result, fields) {
            if (err) throw err;
            resp.status = true;
            resp.message = 'Data Update SuccessFull!';
            resp.data = result;
            console.log('resp-', resp);
            return res.json(resp);
        });
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
        let sql = "DELETE FROM contact where id = " + req.query.id;
        await connection.query(sql, function (err, result, fields) {
            if (err) throw err;
            resp.status = true;
            resp.message = 'Row Delete SuccessFull!';
            resp.data = result;
            console.log('resp-', resp);
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
        let sql = "SELECT * FROM contact where id =" + req.query.id;
        await connection.query(sql, function (err, result, fields) {
            if (err) throw err;
            resp.status = true;
            resp.message = 'Row Data Fatch';
            resp.data = result;
            console.log('data = ', resp);
            return res.json(resp);
        });
    } catch (e) {
        console.log('Catch error', e);
        return res.json(resp);
    }
}

module.exports = { index, store, update, deleteRow, show };
