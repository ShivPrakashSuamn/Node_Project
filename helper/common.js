const extract = require('extract-zip');
var fs = require('fs');

// zip file extact ---
const opne_zip = async (source, target) => {
    console.log('open_zip')
    try {
        extract(source, { dir: target });
        console.log('-Extraction complete-');
        return true;
    } catch (err) {
        console.log('error -', err);
        return false;
    }
}

// Delete Folder ----
const deleteFolder = async (file_path) => {
    await fs.rm(file_path, { recursive: true, force: true }, err => { });
    return true;
}

// new Folder generate --
const createFolder = async (path) => {
    try {
        await fs.mkdirSync(path, 0777);
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

const format = (date) => {
    if (!(date instanceof Date)) {
        throw new Error('Invalid "date" argument. You must pass a date instance')
    }

    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')

    return `${year}-${month}-${day}`
}

module.exports = { opne_zip, createFolder, folderExist, deleteTmpZip, format, deleteFolder };