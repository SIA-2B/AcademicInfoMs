const  express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const exphbs = require('express-handlebars');
// const me

require('dotenv').config();

const datosRouter = require("./routes/datos.js");
const courseRouter = require("./routes/course.js");

// initiliazations
const app = express();
const port = process.env.PORT || 9040;

// settings
app.set('port', port);
app.set('views', path.join(__dirname, 'views'));
// app.engine('.hbs', exphbs({
// 	defaultLayout: 'main',
// }));

// middleware
app.use(express.json());
app.use('/api', datosRouter);
app.use('/api', courseRouter);

// global variables

//routes
app.get('/', (req, res) => {
	res.send("Hola mi API");
});

// mongodb
// console.log(process.env.MONGODB_URI);
mongoose.connect(process.env.MONGODB_URI)
	.then(() => console.log("connected to MongoDB Atlas"))
	.catch((error) => console.error(error));

// static files
app.listen(app.get('port'), () => {
	console.log('server listening en el pueto', app.get('port'))
});