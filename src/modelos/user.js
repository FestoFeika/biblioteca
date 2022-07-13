const mongoose = require('mongoose');    //requerimos de mongoose para utilizar el esquema
const { Schema } = mongoose;


const UserSchema = new Schema({      //se define el equema de los libros
    email: String,
    password: String
});


module.exports = mongoose.model('User', UserSchema);
 