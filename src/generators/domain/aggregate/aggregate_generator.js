const strman = require('strman');
const writeClassToFile = require('../../utils/writeClassToFile')
const checkIfFileExists = require('../../utils/checkIfFileExists')
const readFile = require('../../utils/readFile'); 
const fs = require('fs');


module.exports.init = function init(dirName, domainName) {
    const aggrFileName = "AggregateRoot.ts";
    if (!checkIfFileExists(dirName, aggrFileName)) {
        const aggText = generateNewAggClass(domainName);
        writeClassToFile(aggText, dirName, aggrFileName);
    }else{
        const classText = readFile(dirName+aggrFileName);
        const updatedText = updateAggClass(domainName,classText);
        fs.writeFileSync(dirName+aggrFileName, updatedText);
    }
}


function generateNewAggClass(domainName) {
    const domainEntityName = domainName + "Entity";
    return `
import { ${"Create"+domainName} } from "./${strman.toLowerCase(domainName)}/use-cases/${"create"+ domainName}";
import { ${"Update"+domainName} } from "./${strman.toLowerCase(domainName)}/use-cases/${"update"+ domainName}";
import { ${"Remove"+domainName} } from "./${strman.toLowerCase(domainName)}/use-cases/${"remove"+ domainName}";
import { ${"Get"+domainName} } from "./${strman.toLowerCase(domainName)}/use-cases/${"getById"+ domainName}";
import { ${"GetAll"+domainName} } from "./${strman.toLowerCase(domainName)}/use-cases/${"getAll"+ domainName}";
import {${domainEntityName}} from "./${strman.toLowerCase(domainName)}/entity/${domainName}.entity";

export class AggregateRoot {
    constructor() {}

    /**
     * ${strman.toCamelCase("Create"+domainName)}
     */
    public async ${strman.toCamelCase("Create"+domainName)}(yourData) {
        let ${strman.toCamelCase("Create"+domainEntityName)} = new ${"Create"+domainName}();
        let result = await ${strman.toCamelCase("Create"+domainEntityName)}.execute(yourData);
        return result ;
    }

    /**
     * ${strman.toCamelCase("Update"+domainName)}
     */
    public async ${strman.toCamelCase("Update"+domainName)}(yourData) {
        let ${strman.toCamelCase("Update"+domainEntityName)} = new ${"Update"+domainName}();
        let result = await ${strman.toCamelCase("Update"+domainEntityName)}.execute(yourData);
        return result ;
    }

    /**
     * ${strman.toCamelCase("Remove"+domainName)}
     */
    public async ${strman.toCamelCase("Remove"+domainName)}(id) {
        let ${strman.toCamelCase("Remove"+domainEntityName)} = new ${"Remove"+domainName}();
        let result = await ${strman.toCamelCase("Remove"+domainEntityName)}.execute(id);
        return result ;
    }

    /**
     * ${strman.toCamelCase("Get"+domainName)}
     */
    public async ${strman.toCamelCase("Get"+domainName)}(id) {
        let ${strman.toCamelCase("Get"+domainEntityName)} = new ${"Get"+domainName}();
        let result = await ${strman.toCamelCase("Get"+domainEntityName)}.execute(id);
        return result ;
    }

    /**
     * ${strman.toCamelCase("GetAll"+domainName)}
     */
    public async ${strman.toCamelCase("GetAll"+domainName)}() {
        let ${strman.toCamelCase("GetAll"+domainEntityName)} = new ${"GetAll"+domainName}();
        let result = await ${strman.toCamelCase("GetAll"+domainEntityName)}.execute();
        return result ;
    }
}
`
}

function updateAggClass(domainName,classText) {
    const importText = generateImportStatement(domainName);
    classText = insertImportStatement(classText,importText);
    const crudFunctionText = createCRUDFunctions(domainName);
    classText = insertCRUDFunctions(classText,crudFunctionText);
    return classText;
}



function generateImportStatement(domainName) {
    const domainEntityName = domainName + "Entity";
    return `
import { ${"Create"+domainName} } from "./${strman.toLowerCase(domainName)}/use-cases/${"create"+ domainName}";
import { ${"Update"+domainName} } from "./${strman.toLowerCase(domainName)}/use-cases/${"update"+ domainName}";
import { ${"Remove"+domainName} } from "./${strman.toLowerCase(domainName)}/use-cases/${"remove"+ domainName}";
import { ${"Get"+domainName} } from "./${strman.toLowerCase(domainName)}/use-cases/${"getById"+ domainName}";
import { ${"GetAll"+domainName} } from "./${strman.toLowerCase(domainName)}/use-cases/${"getAll"+ domainName}";
import {${domainEntityName}} from "./${strman.toLowerCase(domainName)}/entity/${domainName}.entity";
    `
}

function createCRUDFunctions(domainName) {
    const domainEntityName = domainName + "Entity";
    return `
    /**
     * ${strman.toCamelCase("Create"+domainName)}
     */
    public async ${strman.toCamelCase("Create"+domainName)}(yourData) {
        let ${strman.toCamelCase("Create"+domainEntityName)} = new ${"Create"+domainName}();
        let result = await ${strman.toCamelCase("Create"+domainEntityName)}.execute(yourData);
        return result ;
    }

    /**
     * ${strman.toCamelCase("Update"+domainName)}
     */
    public async ${strman.toCamelCase("Update"+domainName)}(yourData) {
        let ${strman.toCamelCase("Update"+domainEntityName)} = new ${"Update"+domainName}();
        let result = await ${strman.toCamelCase("Update"+domainEntityName)}.execute(yourData);
        return result ;
    }

    /**
     * ${strman.toCamelCase("Remove"+domainName)}
     */
    public async ${strman.toCamelCase("Remove"+domainName)}(id) {
        let ${strman.toCamelCase("Remove"+domainEntityName)} = new ${"Remove"+domainName}();
        let result = await ${strman.toCamelCase("Remove"+domainEntityName)}.execute(id);
        return result ;
    }

    /**
     * ${strman.toCamelCase("Get"+domainName)}
     */
    public async ${strman.toCamelCase("Get"+domainName)}(id) {
        let ${strman.toCamelCase("Get"+domainEntityName)} = new ${"Get"+domainName}();
        let result = await ${strman.toCamelCase("Get"+domainEntityName)}.execute(id);
        return result ;
    }

    /**
     * ${strman.toCamelCase("GetAll"+domainName)}
     */
    public async ${strman.toCamelCase("GetAll"+domainName)}() {
        let ${strman.toCamelCase("GetAll"+domainEntityName)} = new ${"GetAll"+domainName}();
        let result = await ${strman.toCamelCase("GetAll"+domainEntityName)}.execute();
        return result ;
    }
    `
}

function insertImportStatement(classText,importText) {
    const imoprtIndex = String(classText).indexOf("export")-1;
    return strman.insert(classText, importText,imoprtIndex);
}

function insertCRUDFunctions(classText,crudFunctionText) {
    let braceArray = [];
    let hasFoundFirst = false;
    let startIndex = String(classText).indexOf("AggregateRoot");
    
    for (startIndex; startIndex < classText.length; startIndex++) {
        if(classText[startIndex]=="{"){
            if (!hasFoundFirst) hasFoundFirst = true;
            braceArray.push(classText[startIndex]);
        }else if(classText[startIndex]=="}"){
            braceArray.pop();
            if(braceArray.length ==0 && hasFoundFirst) break;
        } 
        
    }

    const updateText = strman.insert(classText, crudFunctionText,startIndex-1);
    return updateText;
}