const { mdLinks, userPath } = require('./index');
const { statsLinks } = require('./functions');

const userOptions = process.argv[3];
const userOptions2 = process.argv[4];

if (userOptions === undefined && userOptions2 === undefined) {
  mdLinks(userPath, { validate: false })
    .then((links) => {
      console.log(links);
    });
}
if (userOptions === '--validate' && userOptions2 === undefined) {
  mdLinks(userPath, { validate: true })
    .then((links) => {
      console.log(links);
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
      console.log(links);
      console.log(statsLinks(links, true));
    });
}
