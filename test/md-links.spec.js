const path = require('path');
const {
  recursive,
  pathExists,
  absolutePath,
  getLinks,
  verifyLinks,
  statsLinks,
} = require('../functions');
// const mdLinks = require('../index');
const mdLinks = require('../cli');

describe('Funciones', () => {
  it('debería devolver true si la ruta existe', () => {
    const userPath = '/Users/carolinavera/Desktop/LABORATORIA/DEV005-md-links/prueba/prueba.md';
    const exists = pathExists(userPath);
    expect(exists).toBe(true);
  });
  it('Retorna una ruta absoluta', () => {
    const userPath = './DEV005-data-lovers/FAQ.md';
    const Path = path.resolve(userPath);
    const result = absolutePath(userPath);
    expect(result).toBe(Path);
  });
  it('Buscar archivos con extension .md', () => {
    const userPath = '/Users/carolinavera/Desktop/LABORATORIA/DEV005-md-links/prueba';
    const expectedArray = [
      '/Users/carolinavera/Desktop/LABORATORIA/DEV005-md-links/prueba/carpeta2/pinterest.md',
      '/Users/carolinavera/Desktop/LABORATORIA/DEV005-md-links/prueba/carpeta2/probando4.md',
      '/Users/carolinavera/Desktop/LABORATORIA/DEV005-md-links/prueba/prueba.md',
      '/Users/carolinavera/Desktop/LABORATORIA/DEV005-md-links/prueba/prueba2.md',
    ];
    const resultArray = recursive(userPath);
    expect(resultArray).toEqual(expectedArray);
  });
  it('Retorna un array de objetos con href, text, file', () => {
    const fileRoute = '/Users/carolinavera/Desktop/LABORATORIA/DEV005-md-links/prueba/carpeta2/pinterest.md';
    const dataOfFile = '[Pinterest](https://www.pinterest.cl/pin/591871576049876172/)';
    const arrayLinkInfo = [
      {
        href: 'https://www.pinterest.cl/pin/591871576049876172/',
        text: 'Pinterest',
        file: '/Users/carolinavera/Desktop/LABORATORIA/DEV005-md-links/prueba/carpeta2/pinterest.md',
      },
    ];
    expect(getLinks(dataOfFile, fileRoute)).toEqual(arrayLinkInfo);
  });
});

const userOptions = '--validate';
const userOptions2 = undefined;
const userPath = '/Users/carolinavera/Desktop/LABORATORIA/DEV005-md-links/prueba/carpeta2/pinterest.md';
const expectedOutput = [
  {
    Ruta: '/Users/carolinavera/Desktop/LABORATORIA/DEV005-md-links/prueba/carpeta2/pinterest.md',
    Link: 'https://www.pinterest.cl/pin/591871576049876172/',
    Status: 200,
    StatusText: 'OK',
  },
];

jest.mock('./mdLinks', () => jest.fn().mockResolvedValue(expectedOutput));

describe('mdLinks', () => {
  it('Se espera validate true', () => {
    const resultPromise = verifyLinks(userPath, userOptions, userOptions2);

    expect(mdLinks).toHaveBeenCalledWith(userPath, { validate: true });

    return resultPromise.then(() => {
      expectedOutput.forEach((link) => {
        expect(console.log).toHaveBeenCalledWith(`Ruta: ${link.Ruta}`);
        expect(console.log).toHaveBeenCalledWith(`Link: ${link.Link}`);
        expect(console.log).toHaveBeenCalledWith(`Status: ${link.Status}`);
        expect(console.log).toHaveBeenCalledWith(`StatusText: ${link.StatusText}`);
        expect(console.log).toHaveBeenCalledWith('');
      });
    });
  });
});

/* describe('mdLinks', () => {
  it('should...', () => {
    console.log('FIX ME!');
  });
}); */
