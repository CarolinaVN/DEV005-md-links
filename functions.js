const fs = require('fs');
const path = require('path');
//const colors = require('colors');

const route = '/Users/carolinavera/Desktop/LABORATORIA/DEV005-data-lovers';
const routeDirectorio = '/Users/carolinavera/Desktop/LABORATORIA/DEV005-md-links/prueba';
//const routeFail = '/Users/carolinavera/Desktop/LABORATORIA/DEV005-data-lovers/Fail.md';
const relativeRoute = './DEV005-data-lovers/FAQ.md'
//const withoutMD = '/Users/carolinavera/Desktop/DocCaro'

// ------------- Valida sí la ruta existe  -------------------
const pathExists = (route) => {
  if (fs.existsSync(route)) {
    console.log('La ruta si existe :p');
  } else {
    console.log('La ruta no existe :c');
  }
};
pathExists(route);

// ---------- Convierte una ruta relativa en absoluta ----------
const absolutePath = path.resolve(relativeRoute);
console.log(absolutePath);

// --Función recursiva --- Buscar archivos con extensión MD ----
const recursive = (route) => {
    let arrayMd = []
  if  (fs.statSync(route).isFile()){
    arrayMd.push(route)
  } else {
    const elements = fs.readdirSync(route)
    elements.forEach(element => {
        let newRoute = path.join(route, element);
        if (fs.statSync(newRoute).isDirectory()){
            arrayMd = arrayMd.concat(recursive(newRoute));
        }else{
            arrayMd.push(newRoute)
        }
    })    
  }
  return arrayMd.filter(file => path.extname(file) === '.md');
}
const arrayMd = recursive(routeDirectorio);
 console.log('Archivos con extensión .md:', recursive(routeDirectorio));

 //------------leer los archivos MD ---------------------
  const readMD = (arrayMd) =>
  new Promise((resolve, reject) => {
    fs.readFile(arrayMd, 'utf8', (err, data) => {
      if (err) reject(new Error(err));
      resolve(data);
    });
  });
  const readMDs = (arrayMd) => {
    return Promise.all(arrayMd.map((element) => readMD(element)))
      .then((results) => {
        console.log('Elementos de los archivos MD', results);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  
  readMDs(arrayMd);

  //----------- Buscar Links ---------------

  //const urlLink = /^\[([\w\s\d]+)\]\((https?:\/\/[\w\d./?=#]+)\)$/



 



// ------------ Buscar archivos con extensión MD ---------------
/* fs.readdir(route, (err, files) => {
  if (err) {
    console.log('Error buscando archivos .md', err);
  }
  const mdFiles = files.filter(file => path.extname(file) === '.md');

  console.log('Archivos .md encontrados:', mdFiles);
}); */

// ------------- Valida sí la ruta existe  -------------------

/* fs.statSync(route, function(err) {
    if(err == null) {
        console.log('La ruta si existe :p');
    } else if(err.code === 'ENOENT') {
        console.log('La ruta no existe :c');
    } else {
        console.log('Hay un error :s', err.code);
    }
}); */

/* let pathExists = fs.existsSync(route);
console.log('exists:', pathExists); */

/* let pathFail = fs.existsSync(routeFail);
console.log('exists:', pathFail); */

 //------------leer los archivos MD ---------------------
/*   fs.readFile('prueba.txt', 'utf8', (err, data) => {
    if (err) throw err;
    console.log(data);
  });  */


module.exports = {
  pathExists,
  absolutePath,
  recursive,
}