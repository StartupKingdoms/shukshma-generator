const fs = require('fs')

module.exports = function readFile (filePath){
    let readTextBuffer = fs.readFileSync(filePath);
    let text = Buffer.from(readTextBuffer).toString();
    return text ;
}