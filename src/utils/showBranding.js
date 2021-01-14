const figlet = require('figlet');
const chalk = require('chalk');
const clear = require('clear');
const emoji = require('./emoji');
clear();

module.exports.showBranding = function(){
    console.log(
        chalk.red(
          figlet.textSync('StartupKingdoms.com', { horizontalLayout: 'fitted' })
        )
      );
    console.log(chalk.greenBright("Proudly Made with "+emoji._EMOJIS.HEART + "  in INDIA"));
}
