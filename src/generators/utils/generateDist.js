const fs = require('fs');
module.exports = function generateDist(dir) {
    if (!fs.existsSync(dir)) {
        console.log("creating dist folder");
        fs.mkdirSync(dir);
    }
}