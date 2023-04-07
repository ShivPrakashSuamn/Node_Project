const Joi = require('joi');
const config = require('../config');
const connection = require('../helper/db');
const csvtojson = require('csvtojson');
const fs = require('fs');
const csv = require('fast-csv');
const { deleteTmpZip } = require('../helper/common');
const path = require("path");

const index = async (req, res) => {     // index    ----------------------
    var resp = { status: false, message: 'Oops Something went wrong', data: null };
    var limit = req.query.limit ? req.query.limit : 10; 
    var search = req.query.search ? req.query.search : ''; 
    var page = req.query.page ? req.query.page : 1; 
    var order_by = req.query.order_by ? req.query.order_by : 'id'; 
    var order_type = req.query.order_type ? req.query.order_type : 'desc'; 
    var offset = 0;
    let total = 0; 
    if(limit){
        offset = (page -1)*limit; 
    }
    try {
        let sql1 = "SELECT * FROM list where title LIKE '%"+search+"%' or id LIKE '%"+search+"%' order by "+order_by+" "+order_type;
        await connection.query(sql1, function (err, result1, fields) {
            if (err) throw err;
           
             //console.log('total row',result1)
            total = result1.length;
        });
        let sql = "SELECT * FROM list where title LIKE '%"+search+"%' or id LIKE '%"+search+"%' order by "+order_by+" "+order_type+" limit "+offset+","+limit;
        await connection.query(sql, function (err, result, fields) {
            if (err) throw err;
            resp.status = true;
            resp.message = 'Data Fatch SuccessFull';
            resp.data = {
                data:result,
                total:total,
                page:page
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
        contact_id: Joi.string().required()
    }).validate(req.body);

    if (schema.error) {
        resp.message = schema.error.details[0].message;
        return res.json(resp);
    }

    const data = schema.value;
    // Insert ---
    try {
    let sql = "INSERT INTO list (title,contact_id) VALUES ('" + data.title + "','" +data.contact_id+ "')";
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

const CSVstore = async (req, res) => {    // CSVstore----------------------
    let resp = { status: false, message: 'Oops something went wrong', data: null };
    // Validation ----
        // const schema = Joi.object({
        //     csvfile: Joi.string().required(),
        // }).validate(req.file);

        // if (schema.error) {
        //     resp.message = schema.error.details[0].message;
        //     return res.json(resp);
        // }
    // CSV  ---- 
    if (req.file.filename) {
        console.log('file----',req.file.filename);
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

        await csvtojson().fromFile(fileName).then(source => {
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

                let sql = "INSERT INTO contact (fname,lname,email,dob,phone,image,address,city,pin_code,status)" +
                    " VALUES ('" + fname + "','" + lname + "','" + email + "','" + dob + "','" + phone + "','" + null + "','" + address + "','" + city + "','" + pincode + "','" + status + "')";
                connection.query(sql, (err, results, fields) => {
                    if (err) {
                        console.log("Unable to insert item at row ", i + 1);
                        return console.log(err);
                    }
                });
            }
            console.log("All CSV items stored into database successfully ");
        });
        await deleteTmpZip(fileName);  // delete tmp file
        resp.status = true;
        resp.message = 'CSV Data store SuccessFull!';
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
        let sql = "update list set title='" + req.body.title + "',contact_id='" + req.body.contact_id + "' where id = " + req.query.id;
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
        let sql = "SELECT * FROM list where id =" + req.query.id;
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
