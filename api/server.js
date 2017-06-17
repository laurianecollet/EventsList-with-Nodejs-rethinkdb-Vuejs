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
let nodemailer = require('nodemailer'); // module pour envoi d'email
app.use(logger('dev'));
app.use(require('cookie-parser')());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(require('express-session')({ secret: 'hK34B23B4HJ', resave: false, saveUninitialized: false }));
app.use(bodyParser.json());
app.use(cors());
logger('tiny')
app.use(helmet());


var transporter = nodemailer.createTransport({
	host: "smtp.mailtrap.io",
	port: 2525,
	auth: {
		user: "2e45841cd95d56",
		pass: "0e5b9a76556c21"
	}
});

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
		let tri = req.query.tri;
		let search = req.query.search;
		let requete = r.db('onlylyon').table('festivals');

		if (search !== '') {
			requete = requete.filter(function (doc) {
				return doc('intitule').match(`(?i)${search}`)
			})
		}
		if (tri === 'intitule') {
			requete = requete.orderBy(r.asc('intitule'));

		} else if (tri === 'prix') {
			requete = requete.orderBy(r.asc('prix'));
		}

		requete.run(connection, (err, cursor) => {
			cursor.toArray((err, result) => {
				return res.json(result);
			});
		});
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

	app.post('/billetPlus/:id', (req, res) => {
		let id = req.params.id
		console.log(id)
		r.db('onlylyon').table('festivals').get(id).update({ nbbillet: r.row("nbbillet").add(1) }).run(connection, (err, cursor) => {
			if (err) throw err;
			r.db('onlylyon').table('festivals').run(connection, (err, cursor) => {
				cursor.toArray((err, result) => {
					return res.json(result)
				});
			});
		});
	});

	app.post('/billetMoins/:id', (req, res) => {
		let id = req.params.id
		console.log(id)
		r.db('onlylyon').table('festivals').get(id).update({ nbbillet: r.row("nbbillet").sub(1) }).run(connection, (err, cursor) => {
			if (err) throw err;
			r.db('onlylyon').table('festivals').limit(7).orderBy('dateheure').run(connection, (err, cursor) => {
				cursor.toArray((err, result) => {
					return res.json(result)
				});
			});
		});
	});

	app.post('/send', (req, res) => {
		r.db('onlylyon').table('festivals').orderBy(r.desc('dateheure')).limit(5).run(connection, (err, cursor) => {
			cursor.toArray((err, result) => {
				let evenements = '';
				result.forEach((event) => {
					evenements += `${event.intitule} rentre dans la catégorie ${event.type} et il reste seulement ${event.nbbillet} billets</br>`
				});
				let mailOptions = {
					from: '"Lauriane Collet" <laurianecollet@gmail.com>', // sender address
					to: "julien@gmail.com", // list of receivers
					subject: 'La liste des 5 derniers évenements', // Subject line
					text: 'Blabla', // plain text body
					html: `<p>Voici les 5 derniers évenements:</p>
					<p>${evenements}</p>`
				};
				transporter.sendMail(mailOptions, (error, info) => {
					if (error) {
						return console.log(error);
					}
					console.log('Message %s sent: %s', info.messageId, info.response);
					res.json(true);
				});
			});
		});
	});

	/* Requete pour trier par ordre croissant les prix r.db('onlylyon').table('festivals').limit(7).orderBy(r.asc('prix'))*/
});

app.listen(3000, function () {
	console.log('Listened on port 3000!')
})