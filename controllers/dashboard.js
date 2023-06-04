
const { resolve } = require('path');
const connection = require('../helper/db');
const { rejects } = require('assert');

const index = async (req, res) => {
    const resp = { status: false, message: 'oops something went wrong ?', data: null }
    try {
        resp.status = true;
        resp.message = 'Count Dashboard All Data Fatch';
        resp.data = {
            //  Admin panel
            totalUsers: await allUsers(),
            totalPlans: await allPlan(),
            totalPayments: await allPayments(),
            totalTemplates: await allTemplates(),
            //  User Panel 
            totalCompaign: await allCompaign(),
            totalContact: await allContact(),
            totalList: await allList(),
        };
        return res.json(resp);

    } catch (e) {
        console.log('catch error', e);
        return res.json(resp)
    }
}
 
const allUsers = async () => {      //  Total Users    ---------------------
    return new Promise(async (resolve, reject) => {
        let sql = "SELECT COUNT(id) AS totalUser FROM users;";
        await connection.query(sql, async (err, result, fields) => {
            if (err) throw err;
            if (result) {
                let totalUsers = result[0].totalUser;
                resolve(totalUsers);
            } else {
                resolve(false);
            }
        });
    });
}

const allPlan = async () => {       //  Total Plans     ---------------------
    return new Promise(async (resolve, reject) => {
        let sql = "SELECT COUNT(id) AS totalPlan FROM plans;";
        await connection.query(sql, async (err, result, fields) => {
            if (err) throw err;
            if (result) {
                let totalPlans = result[0].totalPlan;
                resolve(totalPlans);
            } else {
                resolve(false);
            }
        });
    });
}

const allPayments = async () => {   //  Total Payments  ---------------------
    return new Promise(async (resolve, reject) => {
        let sql = "SELECT COUNT(id) AS totalPayment FROM Payment;";
        await connection.query(sql, async (err, result, fields) => {
            if (err) throw err;
            if (result) {
                let totalPayments = result[0].totalPayment;
                resolve(totalPayments);
            } else {
                resolve(false);
            }
        });
    });
}

const allTemplates = async () => {  //  Total Templates   -------------------
    return new Promise(async (resolve, reject) => {
        let sql = "SELECT COUNT(id) AS totalTemplate FROM template;";
        await connection.query(sql, async (err, result, fields) => {
            if (err) throw err;
            if (result) {
                let totalTemplates = result[0].totalTemplate;
                resolve(totalTemplates);
            } else {
                resolve(false);
            }
        });
    });
}

const allCompaign = async () => {       //  Total Compaign -------------------
    return new Promise(async (resolve, reject) => {
        let sql = "SELECT COUNT(id) AS totalCompaign FROM compaign;";
        await connection.query(sql, async (err, result, fields) => {
            if (err) throw err;
            if (result) {
                let totalCompaign = result[0].totalCompaign;
                resolve(totalCompaign);
            } else {
                resolve(false);
            }
        });
    });
}

const allContact = async () => {    //  Total Contact   ---------------------
    return new Promise(async (resolve, reject) => {
        let sql = "SELECT COUNT(id) AS totalContact FROM contact;";
        await connection.query(sql, async (err, result, fields) => {
            if (err) throw err;
            if (result) {
                let totalContact = result[0].totalContact;
                resolve(totalContact);
            } else {
                resolve(false);
            }
        });
    });
}

const allList = async () => {       //  Total List    -----------------------
    return new Promise(async (resolve, reject) => {
        let sql = "SELECT COUNT(id) AS totalList FROM list;";
        await connection.query(sql, async (err, result, fields) => {
            if (err) throw err;
            if (result) {
                let totalList = result[0].totalList;
                resolve(totalList);
            } else {
                resolve(false);
            }
        });
    });
}


module.exports = { index }