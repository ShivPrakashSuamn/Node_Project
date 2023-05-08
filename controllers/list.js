const Joi = require('joi');
const config = require('../config');
const connection = require('../helper/db');
const csvtojson = require('csvtojson');
const fs = require('fs');
const csv = require('fast-csv');
const path = require("path");
const { deleteTmpZip } = require('../helper/common');
const { format } = require('../helper/common')

const index = async (req, res) => {     // index    ----------------------
    var resp = { status: false, message: 'Oops Something went wrong', data: null };
    var limit = req.query.limit ? req.query.limit : 10;
    var search = req.query.search ? req.query.search : '';
    var page = req.query.page ? req.query.page : 1;
    var order_by = req.query.order_by ? req.query.order_by : 'id';
    var order_type = req.query.order_type ? req.query.order_type : 'desc';
    var offset = 0;
    let total = 0;
    let totalPage = 0;
    if (limit) {
        offset = (page - 1) * limit;
    }
    try {
        let sql1 = "SELECT * FROM list where title LIKE '%" + search + "%' or total_contacts LIKE '%" + search + "%' order by " + order_by + " " + order_type;
        await connection.query(sql1, async function (err, result1, fields) {
            if (err) throw err;
            total = result1.length;
            totalPage = Math.ceil(total/limit);

            let sql = "SELECT * FROM list where title LIKE '%" + search + "%' or total_contacts LIKE '%" + search + "%' order by " + order_by + " " + order_type + " limit " + offset + "," + limit;
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

const CSVstore = async (req, res) => { // CSVstore  -----------------------
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
        let sql = "INSERT INTO list (title,total_contacts) VALUES ('" + titledata.title + "','0')";
        await connection.query(sql, async (err, result, fields) => {
            if (err) throw err;
            let listId = result.insertId;
            // CSV  ---- 
            if (req.file.filename) {
                const fileName = config.BASEURL + '/uploads/tmp/' + req.file.filename;
                const csvData = await csvtojson().fromFile(fileName);
                await insertContacts(csvData, listId);
                await updateList(csvData.length, listId); // list total_contacts update 
                await deleteTmpZip(fileName);  // delete tmp file
            }
            resp.status = true;
            resp.message = 'CSV Data store SuccessFull!';
            return res.json(resp);
        });
    } catch (e) {
        console.log('catch error', e);
        return res.json(resp);
    }
}
const insertContacts = async (csvData, listId) => { // csv function  -----
    return new Promise(async (resolve, reject) => {
        let flag = 0;
        await csvData.map(async (item, i) => {
            let sql1 = "SELECT id FROM `contact` WHERE email ='" + item.email + "'";
            await connection.query(sql1, async (err, result1, fields) => {
                if (err) throw err;
                if (result1.length > 0) {
                    let sql2 = "UPDATE contact SET fname= '"+ item.fname +"', lname='"+ item.lname +"', dob ='"+ format(new Date(item.dob)) +"', phone='"+ item.phone +"', image='null',"+
                                "address='"+ item.address +"', city='"+ item.city +"', pin_code='"+ item.pin_code +"', status='"+ item.status +"' WHERE email ='"+ item.email +"'";
                    await connection.query(sql2, async (err, result2, fields) => {
                        if (err) throw err;
                        if (result2) {
                            await insertListContact(listId, result1[0].id);
                        }
                    });
                } else {
                    let sql3 = "INSERT INTO contact (fname,lname,email,dob,phone,image,address,city,pin_code,status)" +
                        "VALUES ('"+ item.fname +"','"+ item.lname +"','"+ item.email +"','"+ format(new Date(item.dob)) +"','"+ item.phone +"','"+ null +"','"+ item.address +"','"+ item.city +"','"+ item.pincode +"','"+ item.status +"')";
                    await connection.query(sql3, async (err, result3, fields) => {
                        if (err) throw err;
                        if (result3) {
                            await insertListContact(listId, result3.insertId);
                        }
                    });
                }
            });
            if (i == flag) {
                resolve(true);
            }
            flag++;
        });
    });
}
const insertListContact = async (listid, contactId) => {// csv function --
    return new Promise(async (resolve, reject) => {
        let sql1 = "INSERT INTO list_contacts (list_id,contact_id) VALUES (" + listid + "," + contactId + ")";
        await connection.query(sql1, function (err, result, fields) {
            if (err) throw err;
            if (result) {
                resolve(true);
            } else {
                reject(false);
            }
        });
    });
}
const updateList = async (totalCount, correntId) => { // csv function  ----
    return new Promise(async(resolve, reject) => {
        let sql = "UPDATE `list` SET `total_contacts` = '" + totalCount+ "' WHERE `id` = '" + correntId + "'";
        await connection.query(sql, function(err, result, fields){
           if (err) throw err;
           if(result) {
            resolve(true);
           } else {
            resolve(false);
           }
        });
    });
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
            await req.body.contacts.map(async (i) => {
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
        await connection.query(sql1, async function (err, result1, fields) {
            if (err) throw err;
            checkboxData = result1;

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
        });
    } catch (e) {
        console.log('Catch error', e);
        return res.json(resp);
    }
}

module.exports = { index, store, CSVstore, update, deleteRow, show };
