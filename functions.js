const fs = require('fs');
const path = require('path');
const MarkdownIt = require('markdown-it');
const { JSDOM } = require('jsdom');
const colors = require('colors');

// __________________RUTAS_____________________________
// const routes = '/Users/carolinavera/Desktop/LABORATORIA/DEV005-data-lovers';
// const routeFail = '/Users/carolinavera/Desktop/LABORATORIA/DEV005-data-lovers/Fail.md';
// const relativeRoute = './DEV005-data-lovers/FAQ.md'
// const withoutMD = '/Users/carolinavera/Desktop/DocCaro'
const userPath = process.argv[2].replace(/\\/g, '/');
// const routeDirectorio = '/Users/carolinavera/Desktop/LABORATORIA/DEV005-md-links/prueba';

// ------------- Valida sí la ruta existe  -------------------
const pathExists = (route) => fs.existsSync(route);
// ---------- Convierte una ruta relativa en absoluta ----------
const absolutePath = (route) => path.resolve(route);
// ---------------------- Es un archivo ----------------------
const isFiles = (route) => fs.statSync(route).isFile();
// const extMD = (route) => (path.extname(route) === '.md' ? true : null);
// --Función recursiva --- Buscar archivos con extensión MD ----
const recursive = (route, arrayMd = []) => {
  const stats = fs.statSync(route);

  if (isFiles(route) && path.extname(route) === '.md') {
    const absolute = absolutePath(route);
    arrayMd.push(absolute);
  } else if (stats.isDirectory()) {
    const elements = fs.readdirSync(route);
    elements.forEach((element) => {
      const newRoute = path.join(route, element);
      const newAbsolute = absolutePath(newRoute);
      recursive(newAbsolute, arrayMd);
    });
  } else if (path.extname(route) !== '.md') {
    return null;
  }
  return arrayMd;
};

// ----------- Buscar Links ---------------
const getLinks = (data, file) => {
  const allLinks = [];
  const md = new MarkdownIt();
  const content = md.render(data);
  const dom = new JSDOM(content);
  const { document } = dom.window;
  const links = document.querySelectorAll('a');

  links.forEach((link) => {
    const href = link.getAttribute('href');
    const text = link.textContent.slice(0, 50);
    if (href.startsWith('https')) {
      allLinks.push({ href, text, file });
    }
  });
  return allLinks;
};
// ---------- Verificar links --------------------
const verifyLinks = (links) => Promise.all(links.map((link) => fetch(link.href)
  .then((response) => {
    const validate = {
      Ruta: link.file,
      Text: link.text,
      Link: link.href,
      Code: response.status === 200 ? 200 : 404,
      Status: response.status === 200 ? 'OK'.bgGreen : 'FAIL'.bgRed,
    };
    return validate;
  })
  .catch((error) => {
    const validateFail = {
      Ruta: link.file,
      Text: link.text,
      Link: link.href,
      Code: error.name.bgRed,
      Status: error.message.bgRed,
    };
    return validateFail;
  })));

const statsLinks = (links, stats = false) => {
  const totalLinks = links.length;
  const uniqueLinks = new Set(links.map((elem) => elem.href));
  const uniqueLinksCount = uniqueLinks.size;
  const brokenLinksCount = links.filter((result) => result.Status !== 'OK'.bgGreen).length;
  if (stats) {
    return (`Total: ${totalLinks} Unique: ${uniqueLinksCount} Broken: ${brokenLinksCount}`).bgYellow;
  }
  return (`Total: ${totalLinks} Unique: ${uniqueLinksCount}`).bgMagenta;
};

// ------------leer los archivos MD ---------------------
const readMD = (mD) => new Promise((resolve, reject) => {
  fs.readFile(mD, 'utf8', (err, data) => {
    if (err) reject(new Error(err));
    resolve(getLinks(data, mD));
  });
});

module.exports = {
  // extMD,
  userPath,
  absolutePath,
  pathExists,
  recursive,
  readMD,
  verifyLinks,
  getLinks,
  // checkLinks,
  statsLinks,
};
