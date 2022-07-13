/* Mongoose proporciona una solución sencilla basada en esquemas para modelar los datos de la aplicación,
conectandose a un servidor MongoDB (local o cloud)
comando para instalar:        npm install mongoose --save    */
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://Rodrigo:Navarrete@cluster0.k4wsczd.mongodb.net/Biblioteca?retryWrites=true&w=majority')       //conexión local a BD zoologico
                            
    .then(db => console.log('Se conecto la base de datos'))
    .catch(err => console.error(err));

// URL?: mongodb+srv://Rodrigo:Navarrete@cluster0.lhyakza.mongodb.net/Biblioteca?retryWrites=true&w=majority
