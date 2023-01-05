require('dotenv').config();
const express = require('express');
const fp = require('path');
const bodyParser = require('body-parser');
const app = express();
const Router = require('./routes');

const port = process.env.PORT || 80;


function relative(path) {
    return fp.join(__dirname, path);
}
fp.baseUrl = __dirname;
//Loads the handlebars module
const handlebars = require('express-handlebars');
const errorHandlerMiddleware = require('./middleware/error');
const notFound = require('./middleware/notFound');

//Sets our app to use the handlebars engine
app.set('view engine', 'handlebars');

//Sets handlebars configurations (we will go through them later on)
app.engine('handlebars', handlebars.engine({
    partialsDir: [relative('views/partials'), relative('views/partials-other')],
    layoutsDir: relative('views/layouts'),
    defaultLayout: relative('views/layouts/main.handlebars')
}));

app.use(express.static(fp.join(__dirname,'assets')));
//middleware
app.use(express.json())
//parsing html
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser()); TODO
//routes
app.use(Router);
//notfound middleware
app.use(notFound);

//erroe midlleware
app.use(errorHandlerMiddleware);



app.listen(port, () => console.log(`App listening to port ${port}`));




/**
 * app.get('/', (req, res) => {
    //Serves the body of the page aka "main.handlebars" to the container //aka "index.handlebars"
    res.render('home', { title: 'home page', layout: 'main' });
});


app.get('/about', (req, res) => {
    //Serves the body of the page aka "main.handlebars" to the container //aka "index.handlebars"
    res.render('about',{ title: 'about', layout: 'main' });
});

 */