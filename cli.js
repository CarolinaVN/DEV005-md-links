const { mdLinks, userPath } = require('./index');
const { statsLinks } = require('./functions');

const userOptions = process.argv[3];

mdLinks(userPath, userOptions)
  .then((links) => {
    // console.log(links, 'hooooola');
    if (userOptions === '--stats') {
      console.log(statsLinks(links));
      console.log('Estamos trabajando para usted :D'.bgYellow);
    } else {
      console.log(links);
    }
  })
  .catch((error) => {
    console.error('*******************+', error);
  });

/* const cli = (validate) => new Promise((resolve, reject) => {
  mdLinks(userPath)
    .then((links) => {
      if (validate === userPath2(true)) {
        verifyLinks(links);
      } else {
        console.log(links);
      }
    })
    .catch((error) => {
      reject(error);
    });
});
console.log(cli(userPath2)); */

/* mdLinks(userPath)
  .then((links) => verifyLinks(links))
   console.log(links))
  .catch((error) => {
    console.error('*******************+', error);
  }); */
