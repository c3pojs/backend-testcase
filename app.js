const express = require('express');
const Sequelize = require('sequelize');
const app = express();
const sequelize = require('./seqDB');
const bodyParser = require('body-parser');
const passport = require('./passport');

const auth = require('./router/auth');

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
	res.header('Access-Control-Allow-Headers', '*');
	res.header('Access-Control-Allow-Credentials', 'true');
	res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS, PATCH');
	next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', auth);
app.use(passport.initialize());

sequelize
	.sync()
	.then(() => {
		app.listen(8080, function() {
			console.log('server start magic on 8080...');
		});
	})
	.catch(err => console.log(err));