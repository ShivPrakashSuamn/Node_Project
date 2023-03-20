const Joi = require('joi');
const connection = require('../helper/db');

    const index = async(req,res)=>{     // index    ----------------------
        var resp = {status:false,message:'Oops Something went wrong', data:null};
        try{
            let sql = "SELECT * FROM contact";
            await connection.query(sql, function(err, result, fields) {
                if(err) throw err;
                resp.status = true;
                resp.message = 'Data Fatch SuccessFull';
                resp.data = result;
                console.log('data = ',resp);
                return res.json(resp);
            });
        }catch(e){
            console.log('Catch error',e);
            return res.json(resp);
        }
    }
        
    const store = async (req,res)=>{    // store    ----------------------
        let resp = {status:false,message:'Oops something went wrong',data:null};
         // Validation ----
         const schema = Joi.object({
            fname:Joi.string().required(),
            lname:Joi.string().required(),
            email:Joi.string().required(),
            dob:Joi.string().required(),
            phone:Joi.string().required(),
            address:Joi.string().required(),
            city:Joi.string().required(),
            pincode:Joi.string().required()
        }).validate(req.body);

        if(schema.error){
            resp.message = schema.error.details[0].message;
            return res.json(resp);
        }

        try{
            const data = schema.value;
            // Insert ---- 
            let sql = "INSERT INTO contact (fname,lname,email,dob,phone,image,address,city,pin_code,status)"+
                    " VALUES ('"+data.fname+"','"+data.lname+"','"+data.email+"','"+data.dob+"','"+data.phone+"','"+req.file.filename+"','"+data.address+"','"+data.city+"','"+data.pincode+"',0)";
            await connection.query(sql, function (err, result, fields) {
                if (err) throw err;
                resp.status = true;
                resp.message = 'Data store SuccessFull!';
                resp.data = result;
                console.log('resp-',resp);
                return res.json(resp);
            });
        }catch(e){
            console.log('catch error ',e)
            return res.json(resp);
        }
    }

    const update = async (req,res)=>{   // update   ----------------------
        let resp = {status:false,message:'Oops something went wrong',data:null};
        // validation ---
            const schema = Joi.object({
                id:Joi.string().required()
            }).validate(req.query);

            if(schema.error){
                resp.message = schema.error.details[0].message;
                return res.json(resp);
            }
        try{
            let sql = "update contact set fname='"+req.body.fname+"',lname='"+req.body.lname+"',email='"+req.body.email+"',dob='"+req.body.dob+"',phone='"+req.body.phone+"',"+
                    "image='"+req.file.filename+"',address='"+req.body.address+"',city='"+req.body.city+"',pin_code='"+req.body.pincode+"',status='"+req.body.status+"' where id = "+req.query.id;
            await connection.query(sql, function (err, result, fields) {
                if (err) throw err;
                resp.status = true;
                resp.message = 'Data Update SuccessFull!';
                resp.data = result;
                console.log('resp-',resp);
                return res.json(resp);
            });
        }catch(e){
            console.log('Catch error',e);
            return res.json(resp);
        }
    }

    const deleteRow = async (req,res)=>{// delete   ----------------------
        let resp = {status:false,message:'Oops something went wrong',data:null};
        // validation -- 
            const schema = Joi.object({
                id:Joi.string().required()
            }).validate(req.query);

            if(schema.error){
                resp.message = schema.error.details[0].message;
                return res.json(resp);
            }
        try{
        let sql = "DELETE FROM contact where id = "+req.query.id;
        await connection.query(sql, function (err, result, fields) {
            if (err) throw err;
            resp.status = true;
            resp.message = 'Row Delete SuccessFull!';
            resp.data = result;
            console.log('resp-',resp);
            return res.json(resp);
        });
        }catch(e){
            console.log('Catch error',e);
            return res.json(resp);
        }
    }

    const show = async (req,res)=>{     // show     ----------------------
        var resp = {status:false,message:'Oops Something went wrong', data:null};
        // validaation --
            const schema = Joi.object({
                id:Joi.string().required()
            }).validate(req.query);
            if(schema.error){
                resp.message = schema.error.details[0].message;
                return res.json(resp);
            }
        try{
            let sql = "SELECT * FROM contact where id ="+req.query.id;
            await connection.query(sql, function(err, result, fields) {
                if(err) throw err;
                resp.status = true;
                resp.message = 'Row Data Fatch';
                resp.data = result;
                console.log('data = ',resp);
                return res.json(resp);
            });
        }catch(e){
            console.log('Catch error',e);
            return res.json(resp);
        }
    }

module.exports = { index, store, update, deleteRow, show};
