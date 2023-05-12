
const Razorpay = require('razorpay');

const index = async (req, res) => {
    let resp = { status: false, message: 'Oops Something went wrong ?', data: null }

    var instance = new Razorpay({ key_id: 'rzp_test_eEhqxxfnggSTsN', key_secret: 'YOUR_SECRET' })

    var options = {
        amount: req.body.amount,  // amount in the smallest currency unit
        currency: "INR",
        receipt: "rcpl"
    };
    instance.orders.create(options, function (err, order) {
        console.log('data--',req.body);
        //res.send({orderId: order.id});
        return res.json(order);
    });
}

module.exports = { index }