
const connection = require('../helper/db');

const index = async (req,res)=>{
    let resp  = {status:false, message:'Oops Something went wrong ?', data:null}
    var limit = req.query.limit ? req.query.limit : 10; 
    var search = req.query.search ? req.query.search : ''; 
    var page = req.query.page ? req.query.page : 1; 
    var order_by = req.query.order_by ? req.query.order_by : 'id'; 
    var order_type = req.query.order_type ? req.query.order_type : 'desc'; 
    var total = 0 ;
    var offset = 0 ;
    try{
        // let sqlCount ="SELECT COUNT(id) as countUser FROM `users`";
        //     await connection.query(sqlCount, function(err, resultCount, fields){
        //         if(err) throw err ;
        //         console.log('User count->', resultCount[0].countUser);
        //        // total = result1.length ;
        //     });
        let sql1 ="SELECT * FROM users where fname like '%"+search+"%'or lname LIKE '%"+search+"%'or email LIKE '%"+search+"%' order by "+order_by+" "+order_type;
            await connection.query(sql1, function(err, result1, fields){
                if(err) throw err ;
                total = result1.length ;
                console.log('total Row->', total);
            });
        let sql = "SELECT * FROM users where fname like '%"+search+"%'or lname LIKE '%"+search+"%'or email LIKE '%"+search+"%' order by "+order_by+" "+order_type+" limit "+offset+","+limit;
        await connection.query(sql, function(err, result, fields){
            if(err) throw err ;
            resp.status = true;
            resp.message = 'Data Fatch SuccessFull';
            resp.data = {
                data:result,
                limit:limit,
                page:page,
                allUser:total
            };
            return res.json(resp);
        })
    } catch(e){
        return res.json(resp);
    }
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