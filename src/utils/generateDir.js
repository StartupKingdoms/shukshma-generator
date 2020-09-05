const fs = require('fs');
const path = require("path");
module.exports = function generateDir(dir) {
    // if (!fs.existsSync(dir)) {
    //     fs.mkdirSync(dir);
    // }
    if (!path.isAbsolute(dir)) return;
    let parent = path.join(dir, "..");
    if (parent !== path.join("/") && !fs.existsSync(parent)) generateDir(parent);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
}