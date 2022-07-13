const mongoose = require('mongoose');    //requerimos de mongoose para utilizar el esquema
const { Schema } = mongoose;

const LibrosSchema = new Schema({      //se define el equema de los libros
    titulo: String,
    escritor: [String],
    editorial: String,
    estreno: Date,
    franquicia: String,
    catalogo: [String],
    stock: Number
});

module.exports = mongoose.model('Libros', LibrosSchema);  //se exporta el modelo de esquema 
                                                              //para la coleccion de libros