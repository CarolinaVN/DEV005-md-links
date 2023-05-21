// const { clear } = require('console');
const fs = require('fs');
const path = require('path');
const MarkdownIt = require('markdown-it');
const { JSDOM } = require('jsdom');
// const colors = require('colors');

const userPath = process.argv[2];
// const route = '/Users/carolinavera/Desktop/LABORATORIA/DEV005-data-lovers';
// const routeDirectorio = '/Users/carolinavera/Desktop/LABORATORIA/DEV005-md-links/prueba';
// const routeFail = '/Users/carolinavera/Desktop/LABORATORIA/DEV005-data-lovers/Fail.md';
// const relativeRoute = './DEV005-data-lovers/FAQ.md'
// const withoutMD = '/Users/carolinavera/Desktop/DocCaro'

// ------------- Valida sí la ruta existe  -------------------
const pathExists = (route) => fs.existsSync(route);
pathExists(userPath);

// ---------- Convierte una ruta relativa en absoluta ----------
const absolutePath = (route) => path.resolve(route);
absolutePath(userPath);

// --Función recursiva --- Buscar archivos con extensión MD ----
// const extMD = (route) => path.extname(route) === '.md';
const recursive = (route) => {
  let arrayMd = [];
  if (fs.statSync(route).isFile()) {
    arrayMd.push(route);
  } else {
    const elements = fs.readdirSync(route);
    elements.forEach((element) => {
      const newRoute = path.join(route, element);
      if (fs.statSync(newRoute).isDirectory()) {
        arrayMd = arrayMd.concat(recursive(newRoute));
      } else {
        arrayMd.push(newRoute);
      }
    });
  }
  return arrayMd.filter((file) => path.extname(file) === '.md');
};
const arrayMd = recursive(userPath);
console.log(recursive(userPath));

// ----------- Buscar Links ---------------
const getLinks = (files) => {
  const allLinks = [];
  files.forEach((e) => {
    const md = new MarkdownIt();
    const content = md.render(e);
    const dom = new JSDOM(content);
    const { document } = dom.window;
    const links = document.querySelectorAll('a');

    links.forEach((link) => {
      const href = link.getAttribute('href');
      const text = link.textContent;
      const file = userPath;
      if (href.startsWith('https')) {
        allLinks.push({ href, text, file });
      }
    });
  });
  return allLinks;
};
// ------------leer los archivos MD ---------------------
const readMD = (Md) => new Promise((resolve, reject) => {
  fs.readFile(Md, 'utf8', (err, data) => {
    if (err) reject(new Error(err));
    resolve(data, '\n');
  });
});
const readMDs = (arrMd) => Promise.all(arrMd.map((element) => readMD(element)))
  .then((elementsMD) => {
    console.log(getLinks(elementsMD));
  })
  .catch((error) => {
    console.error(error);
  });
readMDs(arrayMd);

// const urlLink = /^\[([\w\s\d]+)\]\((https?:\/\/[\w\d./?=#]+)\)$/

// ------------ Buscar archivos con extensión MD ---------------
/* fs.readdir(route, (err, files) => {
  if (err) {
    console.log('Error buscando archivos .md', err);
  }
  const mdFiles = files.filter(file => path.extname(file) === '.md');

  console.log('Archivos .md encontrados:', mdFiles);
}); */

// ------------leer los archivos MD ---------------------
/*   fs.readFile('prueba.txt', 'utf8', (err, data) => {
    if (err) throw err;
    console.log(data);
  });  */

// ------------- Valida sí la ruta existe  -------------------
/* const pathExists = (route) => {
  if (fs.existsSync(route)) {
    console.log('La ruta si existe :p');
  } else {
    console.log('La ruta no existe :c');
  }
};
pathExists(userPath); */

/* const pathExists = (route) => fs.existsSync(route);

console.log(pathExists(userPath)); */

/* fs.statSync(route, function(err) {
    if(err == null) {
        console.log('La ruta si existe :p');
    } else if(err.code === 'ENOENT') {
        console.log('La ruta no existe :c');
    } else {
        console.log('Hay un error :s', err.code);
    }
}); */

module.exports = {
  pathExists,
  absolutePath,
  // recursive,
  // getLinks,
  // readMDs,
};
