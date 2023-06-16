const connection = require('../helper/db');

const worklogStore = async (id,title , description) => {     // worklogStore  ---------------------
    return new Promise(async (resolve, reject) => {
        let sql = "INSERT worklog (user_id,title,description)VALUES('" + id + "','" + title + "','" + description + "')";
        await connection.query(sql, function (err, result, fields) {
            if (err) throw err;
            if (result) {
                console.log('Insert');
                resolve(true);
            } else {
                reject(false);
            }
        });
    });
}

module.exports =  worklogStore ;