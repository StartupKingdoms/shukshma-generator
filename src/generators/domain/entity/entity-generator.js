const strman = require('strman');
const fileReader = require('../../../utils/readFile');

module.exports = function getConstructor(filePath,propName,propType) {
    let text = fileReader(filePath);
    return injectPropToConstructor(propName, propType, text);
}

function injectPropToConstructor(propName, propType, classText) {

    let startArgsIndex = String(classText).indexOf("constructor") + "constructor".length;
    let updatedConstructorText = insertConstructorBody(startArgsIndex, propName,classText);
    let finalclassText = insertPropertyInConstructorInterface(propName, propType, updatedConstructorText)
    return finalclassText;
    
}



function insertPropertyInConstructorInterface(propName,propType,classText){
    let regex = new RegExp(/\b(\w*EntityArgs\w*)\b/);
    let startBodyIndex = classText.search(regex);
    if (!startBodyIndex || startBodyIndex<1) return classText;
    let endBodyIndex;
    let bodyArray = [];
    for (let pos = startBodyIndex; pos < classText.length; pos++) {
        const element = classText[pos];
        
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
    return classText= strman.insert(classText,`\t${propName}:${propType};\n`,endBodyIndex);

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
        classText = strman.insert(classText, `\t this.${propName} = data.${propName}; \n\t`, startBodyIndex+1);
    }else{
        classText = strman.insert(classText, `\t this.${propName} = data.${propName}; \n\t`, endBodyIndex);
    }
    
    return classText ;

}

