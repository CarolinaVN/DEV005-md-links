const path = require('path');
const {
  recursive,
  pathExists,
  absolutePath,
  getLinks,
} = require('../functions');

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
  it('should return an array with the info of each link as an object (href, text, file)', () => {
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

/* describe('mdLinks', () => {
  it('should...', () => {
    console.log('FIX ME!');
  });
}); */
