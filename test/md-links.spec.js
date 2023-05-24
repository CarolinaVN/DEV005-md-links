const {
  recursive,
} = require('../functions');

describe('Funciones', () => {
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

/* describe('Función pathExists', () => {
  it('no es una funcion', () => {
    const userPath = pathExists;
    expect(typeof userPath).not.toBe('function');
  });
  it('debería devolver true si la ruta existe', () => {
    const userPath = '/Users/carolinavera/Desktop/LABORATORIA/DEV005-md-links/prueba/prueba.md';
    const exists = pathExists(userPath);
    expect(exists).toBe(true);
  });

  it('debería devolver false si la ruta no existe', () => {
    const userPath = '/ruta/que/no/existe';
    const exists = pathExists(userPath);
    expect(exists).toBe(false);
  });
}); */

/*  it('la ruta existe', () => {
    const userPath = '/Users/carolinavera/Desktop/LABORATORIA/DEV005-md-links/prueba/prueba.md';
    expect(pathExists(userPath)).toBe(true);
  });

  it('Retorna una ruta absoluta', () => {
    const userPath = './DEV005-data-lovers/FAQ.md';
    const Path = path.resolve(userPath);
    const result = absolutePath(userPath);
    expect(result).toBe(Path);
  }); */
/* describe('mdLinks', () => {
  it('should...', () => {
    console.log('FIX ME!');
  });
}); */
