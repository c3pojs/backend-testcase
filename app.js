const express = require('express');
const Sequelize = require('sequelize');
const app = express();
const sequelize = require('./seqDB');
const bodyParser = require('body-parser');
const passport = require('./passport');

const auth = require('./router/auth');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', auth);
app.use(passport.initialize());
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', '*');
	res.header('Access-Control-Allow-Credentials', true);
	res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS, PATCH');
	next();
});

sequelize
	.sync()
	.then(() => {
		app.listen(8080, function() {
			console.log('server start magic on 8080...');
		});
	})
	.catch(err => console.log(err));

// const User = sequelize.define('user', {
// 	id: {
// 		type: Sequelize.INTEGER,
// 		autoIncrement: true,
// 		primaryKey: true,
// 		allowNull: false
// 	},
// 	name: {
// 		type: Sequelize.STRING,
// 		allowNull: false
// 	},
// 	age: {
// 		type: Sequelize.INTEGER,
// 		allowNull: false
// 	}
// });

// User.create({
// 	name: 'Tom',
// 	age: 35
// })
// 	.then(res => {
// 		console.log(res);
// 	})
// 	.catch(err => console.log(err));

// User.findAll({ raw: true })
// 	.then(users => {
// 		console.log(users);
// 	})
// 	.catch(err => console.log(err));
