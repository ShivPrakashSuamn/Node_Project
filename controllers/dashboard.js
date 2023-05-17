
const { resolve } = require('path');
const connection = require('../helper/db');
const { rejects } = require('assert');

const index = async (req, res) => {
    const resp = { status: false, message: 'oops something went wrong ?', data: null }
    var totalUsers = 0;
    var totalPlans = 0;
    var totalPayments = 0;
    var totalTemplates = 0;
    try {
        //  Total Users --
        let sql1 = "SELECT COUNT(id) AS totalUser FROM users;";
        await connection.query(sql1, async (err, result1, fields) => {
            totalUsers = result1[0].totalUser;

            let sql2 = "SELECT COUNT(id) AS totalPlan FROM plans;";
            await connection.query(sql2, async (err, result2, fields) => {
                totalPlans = result2[0].totalPlan;

                let sql3 = "SELECT COUNT(id) AS totalPayment FROM Payment;";
                await connection.query(sql3, async (err, result3, fields) => {
                    totalPayments = result3[0].totalPayment;

                    let sql4 = "SELECT COUNT(id) AS totalTemplate FROM template;";
                    await connection.query(sql4, async (err, result4, fields) => {
                        totalTemplates = result4[0].totalTemplate;
                        
                        console.log('user----', await allUsers() )
                        resp.status = true;
                        resp.message = 'Count Dashboard All Data Fatch';
                        resp.data = {
                            totalUsers: totalUsers,
                            totalPlans: totalPlans,
                            totalPayments: totalPayments,
                            totalTemplates: totalTemplates
                        };
                        return res.json(resp);
                    });
                });
            });
        });
        const allUsers = async () => {
            let sql1 = "SELECT COUNT(id) AS totalUser FROM users;";
            await connection.query(sql1, async (err, result1, fields) => {
              return totalUsers = result1[0].totalUser;
            });
        }
    } catch (e) {
        console.log('catch error', e);
        return res.json(resp)
    }

}

module.exports = { index }