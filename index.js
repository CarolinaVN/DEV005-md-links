const {
  userPath,
  pathExists,
  recursive,
  readMD,
  verifyLinks,
  // checkLinks,
} = require('./functions');

const mdLinks = (path, options = { validate: false }) => new Promise((resolve, reject) => {
  if (!pathExists(path)) {
    reject(new Error('La ruta no existe. Por favor, ingresa una ruta valida.'));
    return;
  }
  Promise.all(recursive(path).map((element) => readMD(element)))
    .then((elementsMD) => {
      const itemsArray = elementsMD.flat();

      if (!options.validate) {
        resolve(itemsArray);
      } else {
        resolve(verifyLinks(itemsArray));
      }
    })
    .catch((error) => {
      reject(error);
    });
});

module.exports = {
  mdLinks, userPath,
};
