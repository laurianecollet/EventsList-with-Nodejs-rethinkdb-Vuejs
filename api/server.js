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
		return res.json('Hello')
	});

	app.get('/events', (req, res) => {
		let limitQuery = req.query.limit;
		let limit = 7;
		// Si l'utilisateur a renseigné le parametre limit et donc qu'il est différend d'undefined 
		if (typeof (limitQuery) !== 'undefined') {
			// Je Parseint le parametre que l'utilisateur a renseigné 
			let limitInt = parseInt(limitQuery);
			// Si le parametre saisi est un nombre alors on stock la limit saisi dans la variable limit
			if (!isNaN(limitInt)) {
				limit = limitInt
			}
			// Si cette limit est superieur à 10 alors on impose une limite à 10 par défaut dans ce cas précis
			if (limit > 10) {
				limit = 10;
			}
		}

		// On construit la requête de base
		let requete = r.db('onlylyon').table('festivals').limit(limit);
		let orderBy = req.query.orderBy;

		if (orderBy === 'date') {
			requete = requete.orderBy('dateheure');
		} else if (orderBy === 'nom') {
			requete = requete.orderBy('intitule')
		}

		console.log(limit)
		requete.run(connection, (err, cursor) => {
			cursor.toArray((err, result) => {
				return res.json(result)
			})
		})
	});
	// Filter with a search
	app.get('/search', (req, res) => {
		let tri = req.query.tri;
		let search = req.query.intitule;
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

	app.delete('/events/:id', (req, res) => {
		let id = req.params.id;
		console.log(id)
		r.db('onlylyon').table('festivals').get(id).delete().run(connection, (err, result) => {
			return res.json(result);
		});
	});


	// c'est la partie Detail
	app.get('/events/:id', (req, res) => {
		// :id c'est pour envoyer un parametre à l'url
		let id = req.params.id; // récupérer l'id en get en url
		r.db('onlylyon').table('festivals').get(id).run(connection, (err, result) => { // lancer la requete avec la fonction run()
			return res.json(result);
		})
	});


	// Modification d'un évènement
	app.put('/events/:id', (req, res) => {

		let id = req.params.id;
		let payant = req.body.payant;
		// Il vaut true ou false en fonction de si on veut ajouter un billet ou en enlever 
		let addTicket = req.body.addTicket;
		let requete = r.db('onlylyon').table('festivals').get(id)

		if (typeof (addTicket) !== 'undefined') {
			if (addTicket) {
				requete = requete.update({ nbbillet: r.row("nbbillet").add(1) })
			} else {
				requete = requete.update({ nbbillet: r.row("nbbillet").sub(1) })
			}
		}

		if (typeof (payant) !== 'undefined') {
			let prix = null;
			// Si on veut que l'evenement devienne payant, le prix devient 10
			if (payant) {
				prix = 10;
			}
			requete = requete.update({ payant: payant, prix: prix })
		}

		requete.run(connection, (err, cursor) => {
			r.db('onlylyon').table('festivals').get(id).run(connection, (err, result) => {
				return res.json(result)
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