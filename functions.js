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
const userPath = process.argv[2];
// const routeDirectorio = '/Users/carolinavera/Desktop/LABORATORIA/DEV005-md-links/prueba';

// ------------- Valida sí la ruta existe  -------------------
const pathExists = (route) => fs.existsSync(route);
// ---------- Convierte una ruta relativa en absoluta ----------
const absolutePath = (route) => path.resolve(route);
// ---------------------- Es un archivo ----------------------
const isFiles = (route) => fs.statSync(route).isFile();
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
    const text = link.textContent;
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
      Link: link.href,
      Status: response.status,
      StatusText: response.statusText,
    };
    return validate;
  })
  .catch((error) => {
    console.log(`Hubo un problema con la petición Fetch: ${error.message}`);
  })));
const checkLinks = (array) => new Promise((resolve, reject) => {
  verifyLinks(array)
    .then((res) => resolve(res))
    .catch((err) => reject(err));
});

const statsLinks = (links, stats = false) => {
  const totalLinks = links.length;
  const uniqueLinks = new Set(links.map((elem) => elem.href));
  const uniqueLinksCount = uniqueLinks.size;
  const brokenLinksCount = links.filter((result) => result.Status === 404).length;
  if (stats) {
    return (`Total: ${totalLinks} Unique: ${uniqueLinksCount} Broken: ${brokenLinksCount}`).bgWhite;
  }
  return (`Total: ${totalLinks} Unique: ${uniqueLinksCount}`).green;
};

// ------------leer los archivos MD ---------------------
const readMD = (mD) => new Promise((resolve, reject) => {
  fs.readFile(mD, 'utf8', (err, data) => {
    if (err) reject(new Error(err));
    resolve(getLinks(data, mD));
  });
});

module.exports = {
  userPath,
  absolutePath,
  pathExists,
  recursive,
  readMD,
  verifyLinks,
  getLinks,
  checkLinks,
  statsLinks,
};

/*
const readMDs = Promise.all(recursive(path).map((element) => readMD(element)))
    .then((elementsMD) => {
      const juntar = [].concat(...elementsMD);
      resolve(juntar);
    })
    .catch((error) => {
      reject(error);
    }); */

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

// --Función recursiva --- Buscar archivos con extensión MD ----
// const extMD = (route) => path.extname(route) === '.md';
/* const recursive = (route) => {
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
console.log(recursive(userPath)); */

/* /* getLinks(userPath).forEach((link) => {
  fetch(link.href)
    .then((response) => {
      if (response.ok) {
        console.log(`Link OK: ${link.href}`);
      } else {
        console.log(`Link Fail: ${link.href}`);
      }
    })
    .catch((error) => {
      console.log(`Hubo un problema con la petición Fetch: ${error.message}`);
    });
  return allLinks;
}; */
//----------------
/* const verifyLinks = (links) => {
  links.forEach((link) => {
    fetch(link.href)
      .then((response) => {
        if (response.ok) {
          console.log('Ruta', link.file, 'Link', link.href, 'OK'.bgGreen, `${response.status}\n`);
        } else {
          console.log('Ruta', link.file, 'Link', link.href, 'Fail'.bgRed, `${response.status}\n`);
        }
      })
      .catch((error) => {
        console.log(`Hubo un problema con la petición Fetch: ${error.message}`);
      });
  });
}; */
//------------------
/* const statsAndV = (links) => {
  const broken = [];
  const unique = [];

  links.forEach((item) => {
    if (!unique.includes(item.href)) {
      unique.push(item.href);
    }
    if (item.message === 'fail') {
      broken.push(item);
    }
  });

  return {
    Total: links.length,
    Unique: unique.length,
    Broken: broken.length,
  };
}; */

/* const validate = {
  Ruta: link.file,
  Link: link.href,
  Status: response.status,
  StatusText: response.statusText,
}; */
/*    const validate = `Ruta: ${link.file}
 Link: ${link.href}
 Status: ${response.status}
 StatusText: ${response.statusText}`;
return validate;
}) */
// [FAIL GOOGLE](https://www.googlx.com)
