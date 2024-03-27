// Se importa el objeto "engine" y se renombra
// como "exphbs"
import { engine as exphbs } from 'express-handlebars';
import path from 'path';

// Configuración del motor de plantillas
export default (app) => {
    // Registra el motor de plantillas
    app.engine(
      'hbs',
      exphbs({
        // Define la extensión de los archivos de plantilla
        extname: '.hbs',
        // Define el nombre del layout principal
        defaultLayout: 'main',
      }),
    );

    console.log(__dirname);

    // Establece el motor de plantillas
    app.set('view engine', 'hbs');

    // Establece la ruta de las vistas
    app.set('views', path.join(__dirname, '..', 'views'));


    // Se retorna la instancia de la app
    return app;
};