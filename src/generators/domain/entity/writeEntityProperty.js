const checkOrCreateFilePath = require('../../../utils/checkOrCreatePath');
const readFile = require('../../../utils/readFile');
const fs = require('fs');
const strman = require('strman');
 
module.exports = function writePropToFile(text,dir,classFileName) {
    let filePath = dir + classFileName ;
    checkOrCreateFilePath(dir);
    let classText = readFile(filePath) ;
    let index = String(classText).lastIndexOf("}");
    let classResult = strman.insert(classText,text,index);
    fs.writeFileSync(filePath, classResult);
}
