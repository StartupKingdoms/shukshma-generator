const checkIfFileExists = require('../../utils/checkIfFileExists');
const writeClassToFile = require('../../utils/writeClassToFile');
const mongoRepoImplGenerator = require('../repository/mongo_repo_impl_generator');
let dirName;
let classfileName;


function createRepository(domainName) {
    repoClassName = domainName + "Repository";
    isFilePresent = checkIfFileExists(dirName, domainName);
    if (!isFilePresent) {
        const repoText = `
import { mongoose } from "@typegoose/typegoose";
import { ${domainName+"Entity"}} from "../entity/${domainName}.entity";
export interface ${repoClassName}{

    getById(id:mongoose.Types.ObjectId):Promise<${domainName+"Entity"}>;
    save(instance:${domainName}+"Entity"):${domainName+"Entity"};
    update(instance:${domainName}+"Entity"):${domainName+"Entity"};
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