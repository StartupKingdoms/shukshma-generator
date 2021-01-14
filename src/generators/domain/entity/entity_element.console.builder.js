let inquirer = require('inquirer');
const createConstructor = require('./entity-generator');
const writePropToFile = require('./writeEntityProperty');
const writeClassToFile = require('../../../utils/writeClassToFile');
const chalk = require('chalk');
let dirName;
let classFileName;
const checkIfFileExists = require('../../../utils/checkIfFileExists');
const emoji = require("../../../utils/emoji");




async function askForProperty() {
    while (await askContinue()) {
        try {
            const question = [{
                name: 'propertyName',
                type: 'input',
                message: 'Property Name',
                validate: function (value) {
                    if (value.length) {
                        return true;
                    } else {
                        return 'Please Type a Property Name';
                    }
                }
            }, {
                name: 'type',
                type: 'list',
                message: 'Choose Data Type',
                choices: ["string", "number", "boolean"], //@Todo: add option for interface later.
                validate: function (value) {
                    if (value.length) {
                        return true;
                    } else {
                        return 'Please Choose one of the following Data Types for the Property.';
                    }
                }
            }];


            let property = await inquirer.prompt(question)
            
            createProperty(property.propertyName, property.type);
            let updatedEntity = createConstructor(dirName + classFileName, property.propertyName, property.type);
            writeClassToFile(updatedEntity, dirName, classFileName);
        } catch (error) {
            logError(error);
        }
    };
}



function createProperty(parameterName, propType) {
    let text = `
    
    @prop()
    private ${parameterName}:${propType};

    public get _${parameterName}():${propType}{
        return this.${parameterName};
    }

    public set _${parameterName}(v:${propType}){
        this.${parameterName} = v ;
    }

    `
    writePropToFile(text, dirName, classFileName);
}


async function askContinue() {
    try {
        const question = [{
            name: 'continue',
            type: 'confirm',
            message: 'Do You Want to Add Another field, Type(y/n)',
        }];

        let user_input = await inquirer.prompt(question);
        if (user_input.continue === true) {
            return true;
        } else if (user_input.continue === false) {
            process.exit(1);
            return false;
        }
    } catch (error) {
        logError(error);
    }


}



function logError(error) {
    console.log("\n error message:", error.message,
        // "\n cause: ", error.cause ,
        "\n stacktrace: ", error.stack
    );
}

async function createClass(className) {
    if (!checkIfFileExists(dirName, classFileName)) {
        let classText = createClassText(className);
        writeClassToFile(classText, dirName, classFileName);
        return classText;
    }
}


function createClassText(className) {
    return `
import { prop, index, modelOptions, mongoose} from "@typegoose/typegoose";

export interface ${className}Args{

}

@modelOptions({  schemaOptions: { timestamps: true }})
export class ${className}{ 
    
    constructor(data:${className}Args){
            
    }

    public _id: mongoose.Types.ObjectId;
}
    `
}


module.exports.init = async function init(dir_name, domainName) {
    dirName = dir_name + "entity/";
    classFileName = domainName + ".entity.ts"
    domainName = domainName + "Entity";
    await createClass(domainName);
    await askForProperty();
}







process.on('exit', (code) => {
    if(code == 0){
        console.log(chalk.red("Process Exited Abrubtly, What's the matter buddy ?"));
    }else if(code ==1){
        console.log(chalk.greenBright(emoji._EMOJIS.TICK)+" Generated the Requried Files")
    }
})