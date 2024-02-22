// Notas importanes
// El archivo de configuración debe usar ES5

// Importar un administrador de rutas de archivos
const path = require('path');

// Exportamos un Configuration Options Object
module.exports = {
  // 0. Estableciendo el modo produccion
  mode: "development",  
  // 1. Estableciendo el archivo indexador
  // del front-end
  entry: "./client/index.js",
  // 2. Estableciendo el archivo de salida
  output: {
    // 2.1 Ruta Absoluta de Salida
    path: path.resolve(__dirname, "public"),
    // 2.2 Nombre del archivo de salida
    filename: "bundle.js",
    // 2.3 Ruta base de archivos estaticos
    publicPath: "/"
  },
  // 3. Servidor de desarrollo
  devServer: {
    // 3.1 Folder de estaticos
    static: path.join(__dirname, 'public'),
    // 3.2 Puerto del servidor de desarrollo
    port: 8080,
    // 3.3 Definiendo el HOST
    host: '0.0.0.0'
  }
}