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
		r.db('onlylyon').table('festivals').limit(7).orderBy('dateheure').run(connection, (err, cursor) => {
			cursor.toArray((err, result) => {
				return res.json(result)
			})
		})
	});
	// Filter with a search
	app.get('/filter/', (req, res) => {
		let search = req.query.search;
		let orderbyintitule = req.query.orderbyintitule
		console.log(req.query)
		console.log(req.params)
		console.log(search)
		console.log('Je suis dans le GET')
		if (search !== '') {
			console.log('Je suis dans mon premier if')
			r.db('onlylyon').table('festivals').limit(7).orderBy('dateheure').filter(function (doc) {
				return doc('intitule').match(`(?i)${search}`)
			}).run(connection, (err, cursor) => {
				cursor.toArray((err, result) => {
					return res.json(result)
				})
			})
		}
		if (orderbyintitule !== '') {
			r.db('onlylyon').table('festivals').limit(7).orderBy(r.asc('intitule')).run(connection, (err, cursor) => {
				cursor.toArray((err, result) => {
					return res.json(result)
				})
			})
		} else {
			r.db('onlylyon').table('festivals').limit(7).orderBy('dateheure').run(connection, (err, cursor) => {
				cursor.toArray((err, result) => {
					return res.json(result)
				});
			});
		}
	});
	// Change price in free 
	app.post('/gratuit/:id', (req, res) => {
		let id = req.params.id;
		console.log(id)
		r.db('onlylyon').table('festivals').get(id).update({ payant: false, prix: null }).run(connection, (err, cursor) => {
			if (err) throw err;
			r.db('onlylyon').table('festivals').limit(7).orderBy('dateheure').run(connection, (err, cursor) => {
				cursor.toArray((err, result) => {
					return res.json(result)
				});
			});
		});
	});

	app.post('/payant/:id', (req, res) => {
		let id = req.params.id;
		console.log(id)
		r.db('onlylyon').table('festivals').get(id).update({ payant: true, prix: 10 }).run(connection, (err, cursor) => {
			if (err) throw err;
			r.db('onlylyon').table('festivals').limit(7).orderBy('dateheure').run(connection, (err, cursor) => {
				cursor.toArray((err, result) => {
					return res.json(result)
				});
			});
		});
	});

	/* Requete pour trier par ordre croissant les prix r.db('onlylyon').table('festivals').limit(7).orderBy(r.asc('prix'))*/

});

app.listen(3000, function () {
	console.log('Listened on port 3000!')
})