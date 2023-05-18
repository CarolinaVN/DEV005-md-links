const {
    pathExists,
    absolutePath,
    recursive,
} = require('./function.js');

const mdLinks  = (path, options) => {
 new Promise((resolve, reject) => {
    if(pathExists(path)){
        if (!path.absolutePath()) {
            absolutePath();
          }
    }else{

          }
    })

 };






