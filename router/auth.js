const express = require('express');
const router = express.Router();
const User = require('../model/user');
const passport = require('../passport');
const jwtOptions = require("../jwtOptions");
const jwt = require('jsonwebtoken');

router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
	User.findAll({ raw: true })
		.then(users => {
			console.log('USERS', users);
			res.send(users);
		})
		.catch(err => console.log('ERROR', err));
});

router.post('/register', (req, res) => {
	let body = req.body;
	console.log(body);
	User.create({ login: body.login, password: body.password })
		.then(success => {
			console.log('USERsuccessS', success);
			res.send('success');
		})
		.catch(err => console.log('ERROR', err));
});

router.post('/login', (req, res) => {
	const { login, password } = req.body;
	console.log(req.body);
	if (login && password) {
		User.findOne({ where: { login: login } }).then(
			user => {
				console.log('FIND USER', user);
				if (!user) {
					res.status(401).json({ message: 'No such user found' });
				}
				if (user.password === password) {
					// from now on we'll identify the user by the id and the id is the
					// only personalized value that goes into our token
					let payload = { id: user.id };
					let token = jwt.sign(payload, jwtOptions.secretOrKey);
					res.json({ msg: 'ok', token: token });
				} else {
					res.status(401).json({ msg: 'Password is incorrect' });
				}
			},
			q => console.log(q)
		);
		
	}
});

module.exports = router;
