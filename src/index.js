const express = require('express');


const path = require('path');

const exphbs = require('express-handlebars');


//inicializacion
const app = express();     // Se ejecuta la función para crear una instancia de una aplicación Express. 
require('./database');     // Requiere de database.js que contiene la conexión a MongoBD

//configuracion
app.set('puerto', process.env.PORT||3000); //define la variable puerto, la del servidor o 3000

app.listen(app.get('puerto'),() => {
    console.log('Servidor web en puerto',app.get('puerto'));
    });
    
app.set('views', path.join(__dirname,'vistas')); //define la variable, la cual es la ruta a VISTAS

app.engine('.hbs', exphbs.engine({      //estableciendo los parametros del motor express-handlebars
    defaultLayout:'Biblioteca',            //maqueta principal se llama inacap.hbs
    runtimeOptions:{
        allowProtoMethodsByDefault:true,
        allowedProtoMethods:true },
    layoutsDir: path.join(app.get('views'),'maquetas'),  //ruta de las maquetas de handlebars 
    partialsDir: path.join(app.get('views'),'parciales'),  //ruta de los parciales
    extname:'hbs'   
}));

app.set('view engine','hbs');           //Se define que el motor de plantillas es hbs

app.use(express.urlencoded({extended: false}));

app.use(require('./rutas/index'));      //Donde se almacenan la gestión de las rutas del servidor
