const fs = require('fs');
module.exports = function generateDir(dir) {
    if (!fs.existsSync(dir)) {
        console.log("creating dist folder");
        fs.mkdirSync(dir);
    }
}