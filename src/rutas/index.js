const {route} = require('.');
const router = require('express').Router();         //accedemos a las rutas definidas para el servidor
const { default: mongoose, mongo } = require('mongoose');
const Libros = require('../modelos/libros');    //utilizamos el esquema de Animales
const User = require('../modelos/user');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const local =('../passport')

router.use(session({
	secret: 'faztwebtutorialexample',
	resave: false,
	saveUninitialized: false
}));
router.use(bodyParser.urlencoded({extended: false}));
router.use(morgan('dev'));
router.use(passport.initialize());
router.use(passport.session());
router.use(flash());

router.get('/agregar', (req, res) => {
    console.log(req.body)
    res.render('agregar');
});

router.post('/agregar', async (req, res) => {
    console.log(req.body.titulo)
    const { titulo, escritor, editorial, estreno, franquicia, catalogo, stock } = req.body;
    const newLibro = new Libros({ 
        titulo:titulo,
        escritor:escritor,
        editorial:editorial, 
        estreno:estreno,
        franquicia:franquicia,
        catalogo:catalogo,
        stock:stock
    });
    await newLibro.save();
    res.redirect('/todos'); 
});

router.get('/',(req,res)=>{
    res.render('primero');
})

router.get('/todos', async (req,res) =>{                //ruta GET para todos los animales                             
    const libros = await Libros.find().lean();      //busca en la BD todos los animales  
    res.render('todos', {libros});                    //redireccionado a la vista todos.hbs
});

router.get('/primer', async (req,res) =>{               //ruta GET para encontrar un solo animal            
    const libro = await Libros.findOne().lean();     //busca en la BD todos los animales 
    res.render('primer', {libro});                     //redireccionado a la vista inicio.hbs
});

router.get('/todos/catalogo/accion', async (req,res) =>{    //ruta GET para todos los animales filtrando por estado
    const libros = await Libros.find({'catalogo': /^accion/}).lean();      
                //busca filtando por el parámetro que recibe por :esp en la ruta  (se para por req.params.est)
    res.render('todos', {libros});                    //redireccionado a la vista todos.hbs (pero filtada)
});

router.get('/todos/catalogo/ficcion', async (req,res) =>{    //ruta GET para todos los animales filtrando por estado
    const libros = await Libros.find({'catalogo': /^ficcion/}).lean();      
                //busca filtando por el parámetro que recibe por :esp en la ruta  (se para por req.params.est)
    res.render('todos', {libros});                    //redireccionado a la vista todos.hbs (pero filtada)
});

router.get('/todos/catalogo/terror', async (req,res) =>{    //ruta GET para todos los animales filtrando por pais
    const libros = await Libros.find({'catalogo': /^terror/}).lean();      
                //busca filtando por el parámetro que recibe por :pais en la ruta  (se para por req.params.pais)
    res.render('todos', {libros});                    //redireccionado a la vista todos.hbs (pero filtada)
});

router.get('/todos/ordenadoA', async (req,res) =>{      //ruta GET para todos los animales ordenados                            
    const libros = await Libros.find().sort({titulo:1}).lean();      //ordena ascendentemente los animales  
    res.render('todos', {libros});                    //redireccionado a la vista todos.hbs
});

router.get('/todos/ordenadoB', async (req,res) =>{      //ruta GET para todos los animales ordenados                            
    const libros = await Libros.find().sort({titulo:-1}).lean();      //ordena descendentemente los animales  
    res.render('todos', {libros});                    //redireccionado a la vista todos.hbs
});

router.get('/editar/:id', async (req, res) => {
    var libros = await Libros.findById(req.params.id).lean();
    res.render('editar', { libros });
});

router.post('/editar/:id', async (req,res) => {
    const { titulo, escritor, editorial, estreno, franquicia, catalogo, stock } = req.body;
    await Libros.findByIdAndUpdate(req.params.id, {
        titulo:titulo,
        escritor:escritor,
        editorial:editorial, 
        estreno:estreno,
        franquicia:franquicia,
        catalogo:catalogo,
        stock:stock
    } );
    res.redirect('/todos');
});

router.get('/signup', async (req, res) => {
    console.log(req.body)
    res.render('signup')}
);
    router.post('/signup', async (req, res) => {
        console.log(req.body.email)
        const emailUser = await User.findOne({email:'$email'});
        if (emailUser){
            req.flash('Error_msg','El email ya esta registrado')
            res.redirect('/signup');}
        else {
            console.log(req.body.email)
            const { email, password } = req.body;
            const newUser = new User({
                email:email,
                password:password});
            await newUser.save();
            res.redirect('/login');
        }
    }
);
router.get('/login', (req, res) => {
    res.render('login', {
    message: req.flash('loginMessage')
    });
    });
    router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/todos',
    failureRedirect: '/login',
    failureFlash: true // permite mensajes flash
    }));
    
module.exports = router;           //exporta las rutas para ser utilizada por otras páginas