const fs = require('fs');

module.exports = function checkIfFileExists(dir,fileName){
    const isDirAvailable = fs.existsSync(dir);
    const  isFileAvailable =isDirAvailable? fs.existsSync(dir+fileName)?true:false:false ;
    return isFileAvailable;
}