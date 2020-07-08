let fs = require('fs');
var prompt = require("prompt");
var colors = require("colors/safe");
const createConstructor = require('./entity-generator');
const writePropToFile = require('./writeEntityProperty');
const writeClassToFile = require('../../utils/writeClassToFile');
const Promise = require('bluebird');
const dirName = __dirname + "/build/";
const checkIfFileExists = require('../../utils/checkIfFileExists');
prompt.get = Promise.promisify(prompt.get);
prompt.start();

let classFileName;

async function askClassName() {
    let inp_class = await prompt.get({
        properties: {
            "className": {
                description: colors.green("className")
            }
        }
    });
    classFileName = String(inp_class.className).trim() + ".js"
    return inp_class.className;
}

async function askForProperty() {
    while (await askContinue()) {
        try {
            let property = await prompt.get({
                properties: {
                    "propertyName": {
                        description: colors.green("property name:")
                    },
                    "propType": {
                        description: colors.green("property type: ")
                    }
                }
            });

            createProperty(property.propertyName, property.propType);
            let newClass = createConstructor(dirName + classFileName, property.propertyName, property.propType);
            writeClassToFile(newClass, dirName, classFileName);
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
        let user_input = await prompt.get({
            properties: {
                "ans": {
                    description: colors.bgYellow("oye user do you want to continue (Y/N) or (y/n) ")
                }
            }
        });

        if (user_input.ans == "Y" || user_input.ans == "y") {
            return true;
        } else if (user_input.ans == "N" || user_input.ans == "n") {
            return false;
        } {
            console.log("PLEASE CHOOSE FROM THE GIVEN OPTION APNA DIMAG MAT LAGA");
            return askContinue();
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

async function createClass() {
    let className = await askClassName();
    if (!checkIfFileExists(dirName,classFileName)) {
    let classText = createClassText(className);
        writeClassToFile(classText, dirName, classFileName);
    }
}


function createClassText(className) {
    return `
    @modelOptions({  schemaOptions: { timestamps: true }})
    export class ${className}{ 
    
        constructor(){
            
        }
    }
    `
}


module.exports.init = async function init() {
    await createClass();
    await askForProperty();
}







process.on('exit', () => {
    console.log("process getting exit")
    prompt.stop();
})