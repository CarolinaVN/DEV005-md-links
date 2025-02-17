#!/usr/bin/env node

// const colors = require('colors');
const { mdLinks, userPath } = require('./index');
const { statsLinks, broken } = require('./functions');

const userOptions = process.argv[3];
const userOptions2 = process.argv[4];

if (userOptions === undefined && userOptions2 === undefined) {
  mdLinks(userPath, { validate: false })
    .then((links) => {
      console.log(`${' ✯☆★ Links encontrados ✯☆★'.bgCyan}`);
      links.forEach((link) => {
        console.log(`Ruta: ${link.file}`);
        console.log(`Link: ${link.href}`);
        console.log(`Texto: ${link.text}`);
        console.log('');
      });
    });
}
if (userOptions === '--validate' && userOptions2 === undefined) {
  mdLinks(userPath, { validate: true })
    .then((links) => {
      console.log(`${' ✯☆★ Links con status ✯☆★'.bgCyan}`);
      links.forEach((link) => {
        console.log(`Route: ${link.Ruta}`);
        console.log(`Texto: ${link.Text}`);
        console.log(`Link: ${link.Link}`);
        console.log(`Code: ${link.Code}`);
        console.log(`Status: ${link.Status}`);
        console.log('');
      });
    });
}
if (userOptions === '--stats' && userOptions2 === undefined) {
  mdLinks(userPath, { validate: false })
    .then((links) => {
      console.log(`${' ✯☆★ Estadísticas de los links ✯☆★'.yellow}`);
      console.log(statsLinks(links));
    });
}

if ((userOptions === '--stats' && userOptions2 === '--validate') || (userOptions === '--validate' && userOptions2 === '--stats')) {
  mdLinks(userPath, { validate: false })
    .then((links) => {
      const a = statsLinks(links);
      console.log(`${' ✯☆★ Estadísticas y estado de los links ✯☆★'.magenta}`);
      console.log(`${a} Broken: ${broken.length}`);
    });
}

module.exports = {
  mdLinks,
};
