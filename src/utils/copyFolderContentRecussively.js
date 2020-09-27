var fs = require('fs');
var path = require('path');

function copyFileSync( source, target ) {

    var targetFile = target;

    //if target is a directory a new file with the same name will be created
    if ( fs.existsSync( target ) ) {
        if ( fs.lstatSync( target ).isDirectory() ) {
            targetFile = path.join( target, path.basename( source ) );
        }
    }

    fs.writeFileSync(targetFile, fs.readFileSync(source));
}

module.exports = function copyFolderContentRecussively(source, target) {
    var files = [];

    //check if target folder needs to be created or integrated
    if (!fs.existsSync(target)) {
        fs.mkdirSync(target);
    }

    // If source Folder exists copy files
    if (fs.lstatSync(source).isDirectory()) {
        files = fs.readdirSync(source);
        // console.log("files", files);
        files.forEach(function (file) {
            var curSource = path.join(source, file);
            if (fs.lstatSync(curSource).isDirectory()) {
                copyFolderContentRecussively(curSource, target);
            } else {
                copyFileSync(curSource, target);
            }
        });
    }


}