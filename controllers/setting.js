const constant = require('../helper/constant');

const getSetting = async (req, res) => {     // index    ----------------------
    var resp = { status: false, message: 'Oops Something went wrong', data: null };

    try {
        let key = req.params.key;
        console.log('--', key)
        resp.status = true;
        resp.message = 'Fatch Data FuccessFull';
        resp.data = constant[key];
        return res.json(resp);
    } catch (e) {
        console.log('Catch error', e);
        return res.json(resp);
    }
}

module.exports = { getSetting };