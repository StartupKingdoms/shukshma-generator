let inquirer = require("inquirer");

module.exports = {
    askSubDomainName: async function () {
        const question = [{
            name: 'className',
            type: 'input',
            message: 'Enter SubDomain/Class Name',
            validate: function( value ) {
              if (value.length) {
                return true;
              } else {
                return 'Enter SubDomain/Class Name';
              }
            }
          }];
        
            let input = await inquirer.prompt(question);
            return String(input.className).trim();
    },
    askDomainName: async function(){
       const question = [{
            name: 'domainName',
            type: 'input',
            message: 'Enter Domain/Project Name',
            validate: function( value ) {
              if (value.length) {
                return true;
              } else {
                return 'Please Enter Domain Name';
              }
            }
          }];
        
          let input = await inquirer.prompt(question);
          return String(input.domainName).trim();

        }
}
