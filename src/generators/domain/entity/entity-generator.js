const strman = require('strman');
const fileReader = require('../../utils/readFile');

module.exports = function getConstructor(filePath,propName,propType) {
    let text = fileReader(filePath);
    return injectPropToConstructor(propName, propType, text);
}

function injectPropToConstructor(propName, propType, classText) {

    let startArgsIndex = String(classText).indexOf("constructor") + "constructor".length;
    let startBodyIndex;
    [classText,startBodyIndex] = insertConstructorParams(startArgsIndex, propName, propType, classText);
    let finalclassText = insertConstructorBody(startBodyIndex, propName,classText);
    return finalclassText;
    
}

function insertConstructorParams(startArgsIndex, propName, propType, classText) {
    let argsArray = [];
    let endArgsIndex;

    for (let pos = startArgsIndex; pos < classText.length; pos++) {

        const element = classText[pos];
        // CHECKING FOR THE ARGUMENTS OF THE CONSTRUCTOR
        if (element == "(" && element != "{") {
            argsArray.push(element);
        } else if (element == ")" && element != "{") {
            argsArray.pop();
            if (argsArray.length == 0) {
                endArgsIndex = pos;
                break;
            }
        }
    }

    
    if (endArgsIndex - startArgsIndex == 1){
        classText = strman.insert(classText, (propName + ":" + propType), startArgsIndex+1);
    }else{
        classText = strman.insert(classText, ( "," + propName + ":" + propType), endArgsIndex);
    }
    
    endArgsIndex = Number(endArgsIndex) +  String("," + propName + ":" + propType).length;
    return [classText, endArgsIndex+1]
}

function insertConstructorBody(startBodyIndex, propName,classText){
    let endBodyIndex;
    let bodyArray = [];

    for (let pos = startBodyIndex; pos < classText.length; pos++) {

        const element = classText[pos];
        // CHECKING FOR THE ARGUMENTS OF THE CONSTRUCTOR
        if (element == "{" ) {
            bodyArray.push(element);
        } else if (element == "}" ) {
            bodyArray.pop();
            if (bodyArray.length == 0) {
                endBodyIndex = pos;
                break;
            }
        }
    }

    
    if (endBodyIndex - startBodyIndex == 1){
        classText = strman.insert(classText, `\t this.${propName} = ${propName}; \n\t`, startBodyIndex+1);
    }else{
        classText = strman.insert(classText, `\t this.${propName} = ${propName}; \n\t`, endBodyIndex);
    }
    
    return classText ;

}

