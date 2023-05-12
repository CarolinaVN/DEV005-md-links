const fs = require('fs');
const path = require('path');
//const colors = require('colors');


const route = '/Users/carolinavera/Desktop/LABORATORIA/DEV005-data-lovers/FAQ.md';
//const routeFail = '/Users/carolinavera/Desktop/LABORATORIA/DEV005-data-lovers/Fail.md';
const relativePath = './DEV005-data-lovers/FAQ.md'
// Valida sí la ruta existe 
/* const existRoute = (route)=>existsSync(route)
console.log(existRoute); */

let docExists = fs.existsSync(route);
console.log('exists:', docExists);

/* let docExistsFail = fs.existsSync(routeFail);
console.log('exists:', docExistsFail); */


console.log(path.join(relativePath));