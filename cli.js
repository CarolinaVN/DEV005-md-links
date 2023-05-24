const { mdLinks, userPath } = require('./index');
const { verifyLinks } = require('./functions');

const userPath2 = process.argv[3];

const cli = (validate) => {
  mdLinks(userPath)
    .then((links) => {
      if (validate) {
        verifyLinks(links);
      } else {
        console.log(links);
      }
    })
    .catch((error) => {
      console.error('*******************+', error);
    });
};

cli(userPath2);

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
