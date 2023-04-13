const Joi = require('joi');
const config = require('../config');
const connection = require('../helper/db');
const csvtojson = require('csvtojson');
const fs = require('fs');
const csv = require('fast-csv');
const path = require("path");
const { deleteTmpZip } = require('../helper/common');
const { error } = require('console');

const index = async (req, res) => {     // index    ----------------------
    var resp = { status: false, message: 'Oops Something went wrong', data: null };
    var limit = req.query.limit ? req.query.limit : 10;
    var search = req.query.search ? req.query.search : '';
    var page = req.query.page ? req.query.page : 1;
    var order_by = req.query.order_by ? req.query.order_by : 'id';
    var order_type = req.query.order_type ? req.query.order_type : 'desc';
    var offset = 0;
    let total = 0;
    if (limit) {
        offset = (page - 1) * limit;
    }
    try {
        let sql1 = "SELECT * FROM list where title LIKE '%" + search + "%' or total_contacts LIKE '%" + search + "%' order by " + order_by + " " + order_type;
        await connection.query(sql1, function (err, result1, fields) {
            if (err) throw err;

            //console.log('total row',result1)
            total = result1.length;
        });
        let sql = "SELECT * FROM list where title LIKE '%" + search + "%' or total_contacts LIKE '%" + search + "%' order by " + order_by + " " + order_type + " limit " + offset + "," + limit;
        await connection.query(sql, function (err, result, fields) {
            if (err) throw err;
            resp.status = true;
            resp.message = 'Data Fatch SuccessFull';
            resp.data = {
                data: result,
                total: total,
                page: page
            };
            console.log('data = ', resp);
            return res.json(resp);
        });
    } catch (e) {
        // console.log('Catch error', e);
        return res.json(resp);
    }
}

const store = async (req, res) => {    // store    ----------------------
    let resp = { status: false, message: 'Oops something went wrong', data: null };
    // Validation ----
    const schema = Joi.object({
        title: Joi.string().required(),
        contacts: Joi.array().required()
    }).validate(req.body);

    if (schema.error) {
        resp.message = schema.error.details[0].message;
        return res.json(resp);
    }

    const data = schema.value;
    // Insert ---
    try {
        let sql = "INSERT INTO list (title,total_contacts) VALUES ('" + data.title + "','" + data.contacts.length + "')";
        await connection.query(sql, function (err, result, fields) {
            if (err) throw err;
            resp.status = true;
            resp.message = 'Data store SuccessFull!';
            resp.data = result;
            console.log('resp-', result.insertId);
            data.contacts.map(async (i) => {
                let sql1 = "INSERT INTO list_contacts (list_id,contact_id) VALUES (" + result.insertId + "," + i + ")";
                await connection.query(sql1, function (err, result, fields) {
                    if (err) throw err;
                })
            })
            return res.json(resp);
        });
    } catch (e) {
        console.log('catch error ', e)
        return res.json(resp);
    }
}

const CSVstore = async (req, res) => {  // CSVstore----------------------
    let resp = { status: false, message: 'Oops something went wrong', data: null };
    const schema = Joi.object({
        title: Joi.string().required(),
    }).validate(req.body);

    if (schema.error) {
        resp.message = schema.error.details[0].message;
        return res.json(resp);
    }
    const titledata = schema.value;
    try {
        let sql = "INSERT INTO list (title,total_contacts) VALUES ('" + titledata.title + "','')";
        await connection.query(sql, async (err, result, fields) => {
            if (err) throw err;
            let correntId = result.insertId;
            let ids = [];

            // CSV  ---- 
            if (req.file.filename) {
                console.log('title --', req.file.filename);
                const fileName = config.BASEURL + '/uploads/tmp/' + req.file.filename;
                const fs = require("fs");
                const readline = require("readline");
                const stream = fs.createReadStream(fileName);
                const rl = readline.createInterface({ input: stream });
                let data = [];
                let chackEmail = '';
                rl.on("line", (row) => {
                    data.push(row.split(","));
                });
                rl.on("close", () => {
                    //console.log('=='.data);
                });
                fs.createReadStream(fileName)
                    .pipe(csv.parse({ headers: true }))
                    .on('error', error => console.error(error))
                    .on('data', row => data.push(row))
                    .on('end', () => console.log(data));

                await csvtojson().fromFile(fileName).then(async (source) => {

                    await loopCSV(source);  // loop handling function ---

                    function loopCSV(data) {
                        return new Promise(async (resolve, reject) => {
                            for (let i = 0; i < data.length; i++) {
                                //console.log('---=-=', data[i]);
                                var fname = data[i]["fname"];
                                var lname = data[i]["lname"];
                                var email = data[i]["email"];
                                var dob = data[i]["dob"];
                                var phone = data[i]["phone"];
                                var address = data[i]["address"];
                                var city = data[i]["city"];
                                var pincode = data[i]["pin_code"];
                                var status = data[i]["status"];

                                await userEmail(email);

                                function userEmail(emailData) {
                                    return new Promise(async (resolve, reject) => {
                                        let sql1 = "SELECT id FROM `contact` WHERE email ='" + emailData + "'";
                                        await connection.query(sql1, (err, result1, fields) => {
                                            if (err) throw err;
                                            setTimeout(() => {
                                                resolve(chackEmail = result1);
                                            }, 500);
                                        });
                                    })
                                }

                                if (chackEmail.length > 0) {
                                    let sql2 = "UPDATE contact SET fname= '" + fname + "', lname= '" + lname + "', dob='" + dob + "', phone='" + phone + "', image='null', address='" + address + "', city='" + city + "'," +
                                        "pin_code='" + pincode + "', status='" + status + "' WHERE email ='" + email + "'";
                                    await connection.query(sql2, (err, result2, fields) => {
                                        if (err) throw err;
                                        console.log('update data', fname);
                                        ids.push(result2.insertId);
                                    });
                                } else {
                                    let sql3 = "INSERT INTO contact (fname,lname,email,dob,phone,image,address,city,pin_code,status)" +
                                        "VALUES ('" + fname + "','" + lname + "','" + email + "','" + dob + "','" + phone + "','" + null + "','" + address + "','" + city + "','" + pincode + "','" + status + "')";
                                    await connection.query(sql3, (err, result3, fields) => {
                                        if (err) throw err;
                                        console.log('insert', fname);
                                        ids.push(result3.insertId);
                                    });
                                }
                            }
                        });
                    }

                    await console.log('insert push data=', ids);
                    console.log('idloop', source)
                    let sql4 = "UPDATE `list` SET `total_contacts` = '" + source.length + "' WHERE `id` = '" + correntId + "'";
                    await connection.query(sql4, async (err, result4, fields) => {
                        if (err) throw err;
                        // await source.map(async (i) => {
                        //     let sql5 = "INSERT INTO list_contacts (list_id,contact_id) VALUES (" + result4.insertId + "," + i + ")";
                        //     await connection.query(sql5, function (err, result5, fields) {
                        //         if (err) throw err;
                        //     })
                        // })
                    });
                    console.log("All CSV items stored into database successfully ");
                });
            }
            await deleteTmpZip(fileName);  // delete tmp file
            resp.status = true;
            resp.message = 'CSV Data store SuccessFull!';
            return res.json(resp);
        });
    } catch (e) {
        console.log('catch error', e);
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

        let sql = "update list set title='" + req.body.title + "',total_contacts='" + req.body.contacts.length + "' where id = " + req.query.id;
        await connection.query(sql, async (err, result, fields) => {
            if (err) throw err;
            resp.status = true;
            resp.message = 'Data Update SuccessFull!';
            resp.data = result;

            let sql1 = "delete from list_contacts where list_id =" + req.query.id;  // delete data --
            await connection.query(sql1, function (err, result1, fields) {
                if (err) throw err;
            })
            req.body.contacts.map(async (i) => {
                let sql2 = "INSERT INTO list_contacts (list_id,contact_id) VALUES (" + req.query.id + "," + i + ")";
                await connection.query(sql2, function (err, result2, fields) {
                    if (err) throw err;
                })
            })
            return res.json(resp);
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
        let sql = "DELETE FROM list where id = " + req.query.id;
        await connection.query(sql, async (err, result, fields) => {
            if (err) throw err;
            resp.status = true;
            resp.message = 'Row Delete SuccessFull!';
            resp.data = result;
            let sql1 = "delete from list_contacts where list_id =" + req.query.id;  // delete data --
            await connection.query(sql1, function (err, result1, fields) {
                if (err) throw err;
            })
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
    let checkboxData = [];
    const schema = Joi.object({
        id: Joi.string().required()
    }).validate(req.query);
    if (schema.error) {
        resp.message = schema.error.details[0].message;
        return res.json(resp);
    }
    try {
        let sql1 = "SELECT * FROM list_contacts where list_id =" + req.query.id;
        connection.query(sql1, function (err, result1, fields) {
            if (err) throw err;
            checkboxData = result1;
        })
        let sql = "SELECT * FROM list where id =" + req.query.id;
        await connection.query(sql, function (err, result, fields) {
            if (err) throw err;
            resp.status = true;
            resp.message = 'Row Data Fatch';
            resp.data = {
                data: result,
                checkbox: checkboxData
            }
            return res.json(resp);
        });
    } catch (e) {
        console.log('Catch error', e);
        return res.json(resp);
    }
}

module.exports = { index, store, CSVstore, update, deleteRow, show };
