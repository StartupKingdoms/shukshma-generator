let fs = require('fs');
var prompt = require("prompt");
var colors = require("colors/safe");
const Promise = require('bluebird');

prompt.get = Promise.promisify(prompt.get);
prompt.start();

let classfileName; 

async function askClassName() {
    let inp_class = await prompt.get({
        properties: {
            "className": {
                description: colors.green("className")
            }
        }
    });
    return String(inp_class.className).trim() + ".js"
}

async function askForProperty() {
    classfileName =  await askClassName();
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
            console.log(property);
            
            createProperty(property.propertyName, property.propType);
        } catch (error) {
            logError(error);
        }
    };
}

askForProperty()

function createProperty(parameterName,propType) {
    let text = `
    
    @prop()
    private ${parameterName}:${propType}

    public get _${parameterName}():${propType}{
        return this.${parameterName}
    }

    public set _${parameterName}(v:${propType}){
        this.${parameterName} = v ;
    }

    `
    console.log(text);
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

function writeToFile(text) {

    fs.appendFileSync(classfileName, text);
}

function logError(error){
    console.log("\n error message:",error.message ,
    // "\n cause: ", error.cause ,
    "\n stacktrace: ",error.stack
    );
}

process.on('exit', () => {
    console.log("process getting exit")
    prompt.stop();
})