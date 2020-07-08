const fs =require('fs');

module.exports = function checkOrCreateFilePath(dir){
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
}