// Notas importanes
// El archivo de configuración debe usar ES5

// Importar un administrador de rutas de archivos
const path = require('path');

// Exportamos un objeto de configuración
// que sera usado por webpack
module.exports = {
  // 0. Estableciendo el modo produccion
  mode: "production",
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
  // 3. Configuración de los loaders
  module: {
    rules: [
      // 3.1 Reglas para archivos JS
      {
        // 3.1.1 Expresión regular para identificar archivos
        test: /\.js$/,
        // 3.1.2 Excluir archivos de la carpeta node_modules
        exclude: /node_modules/,
        // 3.1.3 Usar el loader de babel
        use:[
          {
            loader: "babel-loader",
            // 3.1.4 Opciones de configuración de babel
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  // 3.1.5 Opciones de configuración de present-env
                  {
                    "modules": false,
                    "useBuiltIns": "usage",
                    // 3.1.6 Corejs para usar con polyfills
                    "targets": '> 0.25%, not dead',
                    "corejs": 3
                  }
                ]
              ]
            }
          }
        ]
      }
    ]   
  }
};