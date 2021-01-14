const fs = require('fs');

module.exports = function checkIfFileExists(dir){
    const isDirAvailable = fs.existsSync(dir);
    return isDirAvailable;
}