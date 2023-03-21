const extract = require('extract-zip');
var fs = require('fs');

function opne_zip(source, target){
    console.log('fdgfh',url.parse(source, true));
    try {
        fs.rmdirSync(extract(source, { dir: target }))
        //fs.rmSync(extract(source, { dir: target }), { recursive: true, force: true });
        console.log('-Extraction complete-');
        return;
    } catch (err) {
        console.log('error -', err);
    }
}

module.exports={ opne_zip };