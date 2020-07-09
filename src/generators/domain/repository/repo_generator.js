const checkIfFileExists = require('../../utils/checkIfFileExists');
const writeClassToFile = require('../../utils/writeClassToFile');
const mongoRepoImplGenerator = require('../repository/mongo_repo_impl_generator');
let dirName;
let classfileName;


function createRepository(className) {
    repoClassName = className + "Repository";
    isFilePresent = checkIfFileExists(dirName, className);
    if (!isFilePresent) {
        const repoText = `
import { mongoose } from "@typegoose/typegoose";
import { ${className+"Entity"}} from "../entity/${className}.entity";
export interface ${repoClassName}{

    getById(id:mongoose.Types.ObjectId):Promise<${className+"Entity"}>;
    save(instance:${className}):${className+"Entity"};
    update(instance:${className}):${className+"Entity"};
    delete(id:mongoose.Types.ObjectId):boolean;
}
        `
        return repoText
    }
}

module.exports.init = function init(dir_name, domainName) {
    dirName = dir_name + "repository/";
    classfileName = domainName + ".repo.ts";
    const isRepoPresent = checkIfFileExists(dirName,classfileName);
    if (!isRepoPresent) {
        const repoText = createRepository(domainName);
        writeClassToFile(repoText, dirName, classfileName);
    }


    const mongoImplClassFileName = "mongo" + domainName + ".repo.ts";
    const isImplPresent = checkIfFileExists(dirName,mongoImplClassFileName);
    if (!isImplPresent) {
        const repoImplText = mongoRepoImplGenerator(domainName);
        writeClassToFile(repoImplText,dirName,mongoImplClassFileName);
    }
    // done
}