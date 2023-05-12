/* module.exports = () => {
  // ...
};
 */
const fs = require('fs')

fs.readFile('prueba.txt', 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data);
}); 