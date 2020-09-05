const checkOrCreateFilePath = require('./checkOrCreatePath');
const fs = require('fs');
module.exports = function writeClassToFile(text,dir,classFileName){
    let filePath = dir + classFileName ;
    checkOrCreateFilePath(dir)
    fs.writeFileSync(filePath, text);
}