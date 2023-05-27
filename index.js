const {
  userPath,
  pathExists,
  recursive,
  readMD,
  verifyLinks,
  // checkLinks,
} = require('./functions');

const mdLinks = (path, options = '') => new Promise((resolve, reject) => {
  if (!pathExists(path)) {
    reject(new Error('La ruta no existe. Por favor, ingresa una ruta valida.'));
    return;
  }
  Promise.all(recursive(path).map((element) => readMD(element)))
    .then((elementsMD) => {
      // const itemsArray = [].concat(...elementsMD);
      const itemsArray = elementsMD.flat();
      if (options.includes('--validate')) {
        // resolve(checkLinks(itemsArray));
        resolve(verifyLinks(itemsArray));
      } else {
        resolve(itemsArray);
      }
    })
    .catch((error) => {
      reject(error);
    });
});
// console.log(mdLinks(userPath));

module.exports = {
  mdLinks, userPath,
};
/*  if (pathExists(path) === false) {
    reject(new Error('La ruta no existe'));
  } else {
    const absolute = absolutePath(path);
    const arrayMd = recursive(absolute); */
/* const mdLinks = (path, options) => {
  if (pathExists(path === false)) {
    console.log('ruta no existe, fin...');
  } else if (pathExists(path === true)) {
    if (path) {
      absolutePath(path);
      console.log('**********+', path);
    }
  }
  new Promise((resolve, reject) => {

  });
};
mdLinks(userPath);

/*  module.exports = () => {
  // ...
};

const fs = require('fs')

fs.readFile('prueba.txt', 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data);
});
*/
