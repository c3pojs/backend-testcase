const express = require('express');
const router = express.Router();
const SavedProject = require('../model/savedProject');
const User = require("../model/user")
const passport = require('../configs/passport');

router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
	SavedProject.findAll({ where: {userId: req.user.id} })
		.then(projects => {
			console.log('projects', projects);
			res.send(projects);
		})
		.catch(err => console.log('ERROR', err));
});

router.post('/add', passport.authenticate('jwt', { session: false }), (req, res) => {
	console.log(req.headers.authorization);
	SavedProject.create(req.body)
		.then(projects => {
			console.log('projects', projects);
			User.findByPk(req.user.id).then(user => {
				console.log(user);
				console.log(projects);
				projects.setUser(user)
			})
			
			res.send(projects);
		})
		.catch(err => {
			console.log(err);
			res.status(500).send({ message: 'Server Error' });
		});
});
router.delete('/delete/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
	SavedProject.destroy({ where: { id: parseInt(req.params.id) } })
		.then(projects => {
			console.log('projects', projects);
			res.send({ message: 'success' });
		})
		.catch(err => {
			console.log(err);
			res.status(500).send({ message: 'Server Error' });
		});
});

module.exports = router;
