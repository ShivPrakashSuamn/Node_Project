const Joi = require('joi');
const connection = require('../helper/db');
const path = require("path");
const config = require('../config');
const extract = require('extract-zip');

const index = async (req, res) => {     // index    ----------------------
    var resp = { status: false, message: 'Oops Something went wrong', data: null };
    try {
        let sql = "SELECT * FROM template";
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
        title: Joi.string().required(),
        description: Joi.string().required(),
        category: Joi.string().required(),
        status: Joi.string().required()
    }).validate(req.body);

    if (schema.error) {
        resp.message = schema.error.details[0].message;
        return res.json(resp);
    }

    try {
        const data = schema.value;
        // Insert ---- 
        var fs = require('fs');
        let sql = "INSERT INTO template (title,description,category,status)" +
            " VALUES ('" + data.title + "','" + data.description + "','" + data.category + "','" + data.status + "')";
        await connection.query(sql, function (err, result, fields) {
            if (err) throw err;
            resp.status = true;
            resp.message = 'Data store SuccessFull!';
            resp.data = result;
            // Folder create---
                let id = result.insertId;
                var dir = config.BASEURL +'/uploads/templates/' + id;
                console.log("dir=>", dir)
                fs.mkdirSync(dir, 0744);
            // extract zip on this folder 
                console.log('filename-',req.file.filename);
                let source = config.BASEURL +'/uploads/tmp/'+req.file.filename;
                let target = config.BASEURL +'/uploads/templates/'+id;

                opne_zip(source, target);
                // try {
                //     extract(source, { dir: target });
                //         //fs. (extract(source, { dir: target }))
                //         //fs.rmSync(extract(source, { dir: target }), { recursive: true, force: true });
                //     console.log('-Extraction complete-');
                // } catch (err) {
                //     console.log('error -', err);
                // }
            //  tmp Zip: file delet --
                let deletefile = config.BASEURL +'/uploads/tmp/'+req.file.filename;
                fs.unlink(deletefile, function(err) {
                    if(err){
                        console.log('delete file error-',err);
                    } else{
                        console.log('delete file SuccessFull');
                    }

                });

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
        let sql = "update template set title='" + req.body.title + "',description='" + req.body.description + "',category='" + req.body.category + "',status='" + req.body.status + "'where id = " + req.query.id;
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
        let sql = "DELETE FROM template where id = " + req.query.id;
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
        let sql = "SELECT * FROM template where id =" + req.query.id;
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
