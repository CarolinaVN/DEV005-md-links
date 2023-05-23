const fs = require('fs');
const path = require('path');
const MarkdownIt = require('markdown-it');
const { JSDOM } = require('jsdom');
const {
  pathExists,
  absolutePath,
  recursive,
  // getLinks,
  readMDs,
} = require('../functions');
// getLinks,
// readMDs,
// eslint-disable-next-line import/extensions

describe('Funciones', () => {
  it('la ruta existe', () => {
    const userPath = '/Users/carolinavera/Desktop/LABORATORIA/DEV005-md-links/prueba/prueba.md';
    expect(pathExists(userPath)).toBe(true);
  });

  it('Retorna una ruta absoluta', () => {
    const userPath = './DEV005-data-lovers/FAQ.md';
    const Path = path.resolve(userPath);
    const result = absolutePath(userPath);
    expect(result).toBe(Path);
  });

  it('buscar archivos con extension .md', () => {
    const userPath = '/Users/carolinavera/Desktop/LABORATORIA/DEV005-md-links/prueba';
    const expectedArray = [
      '/Users/carolinavera/Desktop/LABORATORIA/DEV005-md-links/prueba/carpeta2/probando4.md',
      '/Users/carolinavera/Desktop/LABORATORIA/DEV005-md-links/prueba/prueba.md',
      '/Users/carolinavera/Desktop/LABORATORIA/DEV005-md-links/prueba/prueba2.md',
    ];
    const resultArray = recursive(userPath);
    expect(resultArray).toEqual(expectedArray);
  });
});
/* describe('mdLinks', () => {
  it('should...', () => {
    console.log('FIX ME!');
  });
}); */
