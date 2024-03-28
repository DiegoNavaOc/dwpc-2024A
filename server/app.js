// Preámbulo
// Ayuda a crear servidores web 
import express from "express"; 
// Nucleo de node, ayuda al manejo de las rutas 
import path from "path";
// Ayuda al manejo de cookies 
import cookieParser from "cookie-parser"; 
// Maneja el log de peticiones http 
import morgan from "morgan"; 

// Importando las dependencias de webpack
import webpack from 'webpack';
import WebpackDevMiddleware from 'webpack-dev-middleware';
import WebpackHotMiddleware from 'webpack-hot-middleware';

// Importando las rutas
import router from "./router";

// Importando la configuración de webpack
import webpackConfig from '../webpack.dev.config';

// Importando winston logger
import log from './config/winston';

// Importing template-engine
import configTemplateEngine from './config/templateEngine';

const app = express();

// Obteniendo el modo de ejecución de la app
const nodeEviroment = process.env.NODE_ENV || 'production';

// Configurando el entorno de desarrollo
if(nodeEviroment === 'developement'){
  console.log("🛠 Ejecutando en modo desarrollo");
  // Agregando el modo de ejecución a la Configuración
  webpackConfig.mode = 'development';
  // Estableciendo el puerto del servidor de desarrollo
  webpackConfig.devServer.port = process.env.PORT;
  // Configurando el HMR (Hot Module Replacement)
  webpackConfig.entry = [
    'webpack-hot-middleware/client?reload=true&timeout=1000',
    webpackConfig.entry
  ];
  // Agregar el plugin a la configuración de desarrollo de Webpack
  webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
  // Generando el empaquetado de (bundle) de webpack
  const bundle = webpack(webpackConfig);
  // Agregando el middleware de webpack
  app.use(WebpackDevMiddleware(bundle, {
    publicPath: webpackConfig.output.publicPath
  }));
  // Agregando el middleware de HMR
  app.use(WebpackHotMiddleware(bundle));
}else{
  console.log("🚀 Ejecutando en modo producción")
}

// view engine setup
configTemplateEngine(app);

app.use(morgan('dev', { stream: log.stream }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// Servidor de archivos estaticos
app.use(express.static(path.join(__dirname, '..', 'public')));

// Agregando las rutas
router.addRoutes(app);

// Exportando instancia de app 
// usando js moderno 
export default app;