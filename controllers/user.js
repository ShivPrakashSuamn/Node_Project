
const connection = require('../helper/db');

const index = (req,res)=>{
    res.send("All Users page ? after update / deleteRow ");
}

const store = async (req,res)=>{
    console.log('req',req.query.id);
    //const encrypted = CryptoJS.AES.encrypt("ortoin", req.body.password); 

    let sql = "INSERT INTO users (name, email, password) VALUES ('"+req.body.name+"', '"+req.body.email+"', '"+req.body.password+"')";
    await connection.query(sql, function (err, result, fields) {
        if (err) throw err;
        let resp = {status:true,message:'success',data:result[0]};
        console.log('resp-',resp);
        res.json(resp);
    });
   
}
const update = async (req,res)=>{
    console.log('id =', req.query.id);
   
    let sql = "update users set name='"+req.body.name+"', email='"+req.body.email+"' where id = "+req.query.id;
   // console.log('sql',sql);
    await connection.query(sql, function (err, result, fields) {
        if (err) throw err;
        let resp = {status:true,message:'success',data:result[0]};
        console.log('resp-',resp);
        res.json(resp);
    });

}

const deleteRow = async (req,res)=>{
    console.log('id =', req.query.id);
    let sql = "DELETE FROM users where id = "+req.query.id;
    //console.log('sql=',sql);
    await connection.query(sql, function (err, result, fields) {
        if (err) throw err;
        let resp = {status:true,message:'success',data:result};
        console.log('resp-',resp); 
        res.json(resp);
    });
}

const show = async (req,res)=>{
    console.log('req',req.query.id);
    let sql = "SELECT * FROM users";
        connection.query(sql, (err, result) => {
            if(err) {
    
            } else {
                result.forEach( (row) => {
                    console.log(`${row.id} = ${row.name} ,  ${row.email}`);
                });
            }
        });
    await connection.query(sql, function (err, result, fields) {
        if (err) throw err;
        let resp = {status:true,message:'success',data:result};
        console.log('resp All-',resp);
        res.json(resp)
    });
}

module.exports = { index,store,update,deleteRow,show}