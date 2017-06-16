/**
 * Initiation de Express
 */

let express = require('express')
let app = express()


/**
 * Modules de Securité d'une API (logs, XSS securité etc...)
 */
let cors = require('cors');
let bodyParser = require('body-parser');
let logger = require('morgan');
let helmet = require('helmet');
let passport = require('passport');
app.use(logger('dev'));
app.use(require('cookie-parser')());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(require('express-session')({ secret: 'hK34B23B4HJ', resave: false, saveUninitialized: false }));
app.use(bodyParser.json());
app.use(cors());
logger('tiny')
app.use(helmet());


/**
 * Module RethinkDb
 */
let r = require('rethinkdb');


app.use(function (error, request, response, next) {
	response.status(error.status || 500);
	response.json({ error: error.message });
});


let connection = r.connect({
	db: "test" //your database
}).then((connection) => { // une fois qu'il a effectuer une connexion 

	app.get('/', (req, res) => {
		r.db('onlylyon').table('festivals').limit(7).orderBy('dateheure').pluck('type', 'intitule', 'url', 'payant', 'prix').run(connection, (err, cursor) => {
			cursor.toArray((err, result) => {
				return res.json(result)
			})
		})
	});
	// Filter with a search
	//Mes requetes fonctionnent , elles marchent sur Rethinkdb, mais je n'arrive pas et je ne comprends pas comment faire le lien...
	app.get('/filter', (req, res) => {
		let search = req.query.search;
		console.log(req.query)
		console.log(req.params)
		console.log(search)
		console.log('Je suis dans le GET')
		if (search !== '') {
			console.log('Je suis dans mon premier if')
			r.db('onlylyon').table('festivals').limit(7).orderBy('dateheure').filter(function (doc) {
				return doc('intitule').match(`(?i)${search}`)
			}).pluck('type', 'intitule', 'url', 'payant', 'prix').run(connection, (err, cursor) => {
				cursor.toArray((err, result) => {
					return res.json(result)
				})
			})
		} else {
			r.db('onlylyon').table('festivals').limit(7).orderBy('dateheure').pluck('type', 'intitule', 'url', 'payant', 'prix').run(connection, (err, cursor) => {
				cursor.toArray((err, result) => {
					return res.json(result)
				})
			});
		}
	});
});

app.listen(3000, function () {
	console.log('Listened on port 3000!')
})