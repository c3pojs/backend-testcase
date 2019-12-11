const express = require('express');
const router = express.Router();
const UsersSavedProject = require('../model/usersSavedProjects');
const SavedProjects = require('../model/savedProject');
const User = require('../model/user');
const passport = require('../configs/passport');

router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
	console.log("SavedProjects",SavedProjects);
	// SavedProjects.addUsersSavedProject(req.user).then(res => console.log(res));
	// UsersSavedProject.findOne({ where: { userId: req.user.id } })
	// 	.then(projects => {
	// 		console.log('projects', projects);
	// 		res.send(projects);
	// 	})
	// 	.catch(err => console.log('ERROR', err));
});

router.post('/add', passport.authenticate('jwt', { session: false }), (req, res) => {
	SavedProjects.findOne({ where: { id: 1 } })
		.then(projects => {
			console.log('projects', projects);
			User.findOne({ where: { id: req.user.id } }).then(s => {
                projects.createSavedProject(s);
                s.addSavedProject(projects)
                
			});

			// req.user.addUsersSavedProject(projects)
			res.send(projects);
		})
		.catch(err => console.log('ERROR', err));

	// req.user.addUsersSavedProject();
});

module.exports = router;
