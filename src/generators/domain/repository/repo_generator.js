const checkIfFileExists = require('../../utils/checkIfFileExists');
const writeClassToFile = require('../../utils/writeClassToFile');
const mongoRepoImplGenerator = require('../repository/mongo_repo_impl_generator');
let dirName;
let classfileName;


function createRepository(domainName) {
    repoClassName = domainName + "Repository";
    isFilePresent = checkIfFileExists(dirName, domainName);
    const domainEntityName = domainName+"Entity";
    if (!isFilePresent) {
        const repoText = `
import { mongoose } from "@typegoose/typegoose";
import { ${domainEntityName}} from "../entity/${domainName}.entity";
export interface ${repoClassName}{

    getById(id:mongoose.Types.ObjectId):Promise<${domainEntityName}>;
    save(instance:${domainEntityName}):Promise<${domainEntityName}>;
    update(instance:${domainEntityName}):Promise<${domainEntityName}>;
    delete(id:mongoose.Types.ObjectId):Promise<boolean>;
    findAll():Promise<${domainEntityName}[]>
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