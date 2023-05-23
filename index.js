const {
  userPath,
  recursive,
  readMD,
} = require('./functions');

const mdLinks = (path) => new Promise((resolve, reject) => {
  /*  if (pathExists(path) === false) {
    reject(new Error('La ruta no existe'));
  } else {
    const absolute = absolutePath(path);
    const arrayMd = recursive(absolute); */

  Promise.all(recursive(path).map((element) => readMD(element)))
    .then((elementsMD) => {
      const juntar = [].concat(...elementsMD);
      resolve(juntar);
    })
    .catch((error) => {
      reject(error);
    });
});
console.log(mdLinks(userPath));

mdLinks(userPath)
  .then((links) => console.log(links))
  .catch((error) => {
    console.error('*******************+', error);
  });

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
