let exec = require('child_process').exec;
let ora = require('ora');
let checkIfDirExists = require('./checkIfDirExists');
let checkIfFileExists = require('./checkIfFileExists');
const _EMOJIS = require('./emoji')._EMOJIS;
const chalk = require('chalk');
let spinner = {
    installPackages: ora(_EMOJIS.PACKAGE + ' Installing Node Modules...'),
    initializeGit: ora(_EMOJIS.JOY + ' Inintializing Git')

}


module.exports = {
    installPackages: function (directory, strategy = "npm") {
        return new Promise((resolve, reject) => {
            // IF DIRECTORY ALREADY EXISTS NO NEED TO INSTALL THE PACKAGES
            if (checkIfDirExists(directory + "node_modules")) {
                resolve(true);
                return;
            }
            spinner.installPackages.start();
            exec(`cd ${directory} && ${strategy} install`, (err, stdout) => {
                if (err) {
                    reject(err);
                } else {
                    spinner.installPackages.stop();
                    console.log(chalk.greenBright(_EMOJIS.TICK + " Initialized Git"))
                    resolve(stdout);
                }
            });
        });
    },
    initializeGit:function (directory) {
        return new Promise((resolve, reject) => {
            // IF DIRECTORY ALREADY EXISTS NO NEED TO INSTALL THE PACKAGES
            if (checkIfDirExists(directory+".git")) {
                resolve(true);
                return;
            }
            spinner.initializeGit.start();
            exec(`cd ${directory} && git init`, (err, stdout) => {
                if (err) {
                    reject(err);
                } else {
                    spinner.initializeGit.stop();
                    console.log(chalk.greenBright(_EMOJIS.TICK+ " Initialized Git"))
                    resolve(stdout);
                }
            });
        });
    },
    checkIfNewProject:function(directory){
        return (checkIfFileExists(directory,'/package.json'))
    }
}

