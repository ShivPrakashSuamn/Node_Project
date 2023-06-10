const Joi = require('joi');
const config = require('../config');
const connection = require('../helper/db');
const csvtojson = require('csvtojson');
const fs = require('fs');
const csv = require('fast-csv');
const { deleteTmpZip } = require('../helper/common');
const worklogStore = require("../helper/worklog");

const index = async (req, res) => {     // index    ----------------------

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
        let sql1 = "SELECT * FROM contact where fname LIKE '%" + search + "%' or lname LIKE '%" + search + "%'or email LIKE '%" + search + "%'or phone LIKE '%" + search + "%'\
                    or address LIKE '%"+ search + "%'or city LIKE '%" + search + "%'or pin_code LIKE '%" + search + "%' order by " + order_by + " " + order_type;
        await connection.query(sql1, async function (err, result1, fields) {
            if (err) throw err;
            total = result1.length;
            totalPage = Math.ceil(total / limit);
            let sql = "SELECT * FROM contact where fname LIKE '%" + search + "%' or lname LIKE '%" + search + "%'or email LIKE '%" + search + "%' or phone LIKE '%" + search + "%' \
                        or address LIKE '%"+ search + "%'or city LIKE '%" + search + "%'or pin_code LIKE '%" + search + "%'order by " + order_by + " " + order_type + " limit " + offset + "," + limit;
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
    let fileUplad = '';
    if (req.file == undefined) {
        fileUplad = null;
    } else {
        fileUplad = req.file.filename;
    }
    try {
        const data = schema.value;
        // Insert ---
        let sql1 = "SELECT * FROM `contact` WHERE email = '" + data.email + "'";
        await connection.query(sql1, async (err, result1, fields) => {
            if (result1.length) {
                resp.message = 'Email Already Exist';
                resp.data = result1;
                return res.json(resp);
            } else {
                let sql = "INSERT INTO contact (fname,lname,email,dob,phone,image,address,city,pin_code,status)" +
                    " VALUES ('" + data.fname + "','" + data.lname + "','" + data.email + "','" + data.dob + "','" + data.phone + "','" + fileUplad + "','" + data.address + "','" + data.city + "','" + data.pincode + "',0)";
                await connection.query(sql, async function (err, result, fields) {
                    if (err) throw err;
                    resp.status = true;
                    resp.message = 'Data store SuccessFull!';
                    resp.data = result;
                    await worklogStore(req.user.id,'Contact','Create')
                    return res.json(resp);
                });
            }
        });
    } catch (e) {
        console.log('catch error ', e)
        return res.json(resp);
    }
}

const CSVstore = async (req, res) => {  // CSVstore  ----------------------
    let resp = { status: false, message: 'Oops something went wrong', data: null };
    // CSV  ---- 
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
            .on('end', () => console.log());

        await csvtojson().fromFile(fileName).then(source => {
            for (var i = 0; i < source.length; i++) {
                var fname = source[i]["fname"],
                    lname = source[i]["lname"],
                    email = source[i]["email"],
                    dob = source[i]["dob"],
                    phone = source[i]["phone"],
                    address = source[i]["address"],
                    city = source[i]["city"],
                    pincode = source[i]["pin_code"],
                    status = source[i]["status"]

                let sql = "SELECT * FROM `contact` WHERE email = '" + email + "'";
                connection.query(sql, async (err, result, fields) => {
                    if (result.length) {
                        let sql = "update contact set fname='" + fname + "', lname='" + lname + "', dob='" + dob + "', phone='" + phone + "', address='" + address + "', city='" + city + "', pin_code='" + pincode + "', status='" + status + "' where email ='" + email + "'";
                        connection.query(sql, (err, results, fields) => {
                            if (err) {
                                console.log("Unable to insert item at row 1", i + 1);
                                return console.log(err);
                            }
                        });
                    } else {
                        let sql = "INSERT INTO contact (fname,lname,email,dob,phone,image,address,city,pin_code,status)" +
                            " VALUES ('" + fname + "','" + lname + "','" + email + "','" + dob + "','" + phone + "','" + null + "','" + address + "','" + city + "','" + pincode + "','" + status + "')";
                        connection.query(sql, (err, results, fields) => {
                            if (err) {
                                console.log("Unable to insert item at row 2", i + 1);
                                return console.log(err);
                            }
                        });
                    }
                });
            }
            //console.log("All CSV items stored into database successfully ");
        });
        await deleteTmpZip(fileName);  // delete tmp file
        resp.status = true;
        resp.message = 'All CSV items stored into database successfully ';
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
    let fileUplad = '';
    const data = schema.value;
    try {
        let sql1 = "SELECT contact.email FROM contact  where id ='" + data.id + "'"
        await connection.query(sql1, async (err, result1, fields) => {
            if (req.body.email == result1[0].email) {
                if (req.file == undefined) {
                    let sql1 = "SELECT `contact`.`image` FROM `contact` where id=" + req.query.id;
                    await connection.query(sql1, async (err, result1, fields) => {
                        if (err) throw err;
                        fileUplad = result1[0].image;
                        let sql = "update contact set fname='" + req.body.fname + "',lname='" + req.body.lname + "', dob='" + req.body.dob + "',phone='" + req.body.phone + "'," +
                            "image='" + fileUplad + "',address='" + req.body.address + "',city='" + req.body.city + "',pin_code='" + req.body.pincode + "',status='" + req.body.status + "' where id = " + req.query.id;
                        await connection.query(sql, function (err, result, fields) {
                            if (err) throw err;
                            resp.status = true;
                            resp.message = 'Data Update SuccessFull!';
                            resp.data = result;
                            return res.json(resp);
                        });
                    });
                } else {
                    fileUplad = req.file.filename;
                    let sql = "update contact set fname='" + req.body.fname + "',lname='" + req.body.lname + "', dob='" + req.body.dob + "',phone='" + req.body.phone + "'," +
                        "image='" + fileUplad + "',address='" + req.body.address + "',city='" + req.body.city + "',pin_code='" + req.body.pincode + "',status='" + req.body.status + "' where id = " + req.query.id;
                    await connection.query(sql, function (err, result, fields) {
                        if (err) throw err;
                        resp.status = true;
                        resp.message = 'Data Update SuccessFull!';
                        resp.data = result;
                        return res.json(resp);
                    });
                }
            } else {
                let sql = "SELECT * FROM `contact` WHERE email = '" + req.body.email + "'";
                await connection.query(sql, async (err, result, fields) => {
                    if (result.length > 0) {
                        resp.message = 'Email Already Exist';
                        resp.data = result;
                        return res.json(resp);
                    } else {
                        if (req.file == undefined) {
                            let sql1 = "SELECT `contact`.`image` FROM `contact` where id=" + req.query.id;
                            await connection.query(sql1, async (err, result1, fields) => {
                                if (err) throw err;
                                fileUplad = result1[0].image;
                                let sql = "update contact set fname='" + req.body.fname + "',lname='" + req.body.lname + "',email='" + req.body.email + "',dob='" + req.body.dob + "',phone='" + req.body.phone + "'," +
                                    "image='" + fileUplad + "',address='" + req.body.address + "',city='" + req.body.city + "',pin_code='" + req.body.pincode + "',status='" + req.body.status + "' where id = " + req.query.id;
                                await connection.query(sql, function (err, result, fields) {
                                    if (err) throw err;
                                    resp.status = true;
                                    resp.message = 'Data Update SuccessFull!';
                                    resp.data = result;
                                    return res.json(resp);
                                });
                            });
                        } else {
                            fileUplad = req.file.filename;
                            let sql = "update contact set fname='" + req.body.fname + "',lname='" + req.body.lname + "',email='" + req.body.email + "',dob='" + req.body.dob + "',phone='" + req.body.phone + "'," +
                                "image='" + fileUplad + "',address='" + req.body.address + "',city='" + req.body.city + "',pin_code='" + req.body.pincode + "',status='" + req.body.status + "' where id = " + req.query.id;
                            await connection.query(sql, function (err, result, fields) {
                                if (err) throw err;
                                resp.status = true;
                                resp.message = 'Data Update SuccessFull!';
                                resp.data = result;
                                return res.json(resp);
                            });
                        }
                    }
                });
            }
        });
    } catch (e) {
        console.log('Catch error', e);
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
        let sql = "DELETE FROM contact where id = " + req.query.id;
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
        let sql = "SELECT * FROM contact where id =" + req.query.id;
        await connection.query(sql, function (err, result, fields) {
            if (err) throw err;
            resp.status = true;
            resp.message = 'Row Data Fatch';
            resp.data = result;
            return res.json(resp);
        });
    } catch (e) {
        console.log('Catch error', e);
        return res.json(resp);
    }
}

module.exports = { index, store, CSVstore, update, deleteRow, show };
