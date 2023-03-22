const extract = require('extract-zip');
var fs = require('fs');

const opne_zip = async (source, target) => {
    console.log('open_zip')
    try {
        let x = extract(source, { dir: target });
        if (x) {
            fs.unlinkSync(source)
            return true;
        }
        console.log('-Extraction complete-');
    } catch (err) {
        console.log('error -', err);
        return false;
    }
}

const createFolder = async (path) => {
    try {
        fs.mkdirSync(path, 0777);
        return true;
    } catch (err) {
        return false;
    }
}

const folderExist = async (path) => {
    return fs.existsSync(path);
}

module.exports = { opne_zip, createFolder, folderExist };