const extract = require('extract-zip');
var fs = require('fs');
// zip file extact ---
const opne_zip = async (source, target) => {
    console.log('open_zip')
    try {
        extract(source, { dir: target });
        console.log('-Extraction complete-');
    } catch (err) {
        console.log('error -', err);
        return false;
    }
}
// new Folder generate --
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
// Delete file ----
const deleteTmpZip = async (file_path) => {
   // console.log('delete path-', file_path);
    if (folderExist(file_path)) {
         fs.unlinkSync(file_path);
        return true;
    }
}

module.exports = { opne_zip, createFolder, folderExist ,deleteTmpZip};