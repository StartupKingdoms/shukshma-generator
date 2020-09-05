var prompt = require("prompt");
var colors = require("colors/safe");

module.exports = async function askClassName() {
    let inp_class = await prompt.get({
        properties: {
            "className": {
                description: colors.green("className")
            }
        }
    });
    return String(inp_class.className).trim();
}