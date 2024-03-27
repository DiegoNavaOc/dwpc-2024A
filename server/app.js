// Preámbulo
// Ayuda a manejar errores http 
import createError from "http-errors"; 
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
import usersRouter from './routes/users';
import indexRouter from './routes/index';
// Importando la configuración de webpack
import webpackConfig from '../webpack.dev.config';

// Importando winston logger
import log from './config/winston';

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
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(morgan('dev', { stream: log.stream }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// Servidor de archivos estaticos
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  log.info(`404 Pagina no encontrada ${req.method} ${req.originalUrl}`);
  next(createError(404));
});

// error handler 
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Exportando instancia de app 
// usando js moderno 
export default app;