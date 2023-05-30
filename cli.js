const { mdLinks, userPath } = require('./index');
const { statsLinks } = require('./functions');

const userOptions = process.argv[3];
const userOptions2 = process.argv[4];

if (userOptions === undefined && userOptions2 === undefined) {
  mdLinks(userPath, { validate: false })
    .then((links) => {
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
      links.forEach((link) => {
        console.log(`Ruta: ${link.Ruta}`);
        console.log(`Link: ${link.Link}`);
        console.log(`Status: ${link.Status}`);
        console.log(`StatusText: ${link.StatusText}`);
        console.log('');
      });
    });
}
if (userOptions === '--stats' && userOptions2 === undefined) {
  mdLinks(userPath, { validate: false })
    .then((links) => {
      console.log(statsLinks(links));
    });
}

if ((userOptions === '--stats' && userOptions2 === '--validate') || (userOptions === '--validate' && userOptions2 === '--stats')) {
  mdLinks(userPath, { validate: true })
    .then((links) => {
      console.log(statsLinks(links, true));
    });
}

module.exports = {
  mdLinks,
};
