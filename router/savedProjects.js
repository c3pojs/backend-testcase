const express = require('express');
const router = express.Router();
const { Projects, UsersProjects } = require('../model');
// const User = require("../model/users")
const passport = require('../configs/passport');

router.get('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
	const list = await Projects.findAll({
		include: [
			{
				model: UsersProjects,
				as: 'projects',
				where: {
					userId: req.user.id
				},
				required: true
			}
		]
	});
	console.log(list);

	return res.send(list);
});

router.post('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
	const [project, isNew] = await Projects.findOrCreate({ where: req.body, defaults: req.body });
	const newBound = await UsersProjects.findOrCreate({
		where: {
			userId: req.user.id,
			projectId: project.id
		},
		defaults: {
			userId: req.user.id,
			projectId: project.id
		}
	});
	

	return res.status(200).send( project);
});

router.delete('/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
	const userProject = await UsersProjects.destroy({
		where: { projectId: parseInt(req.params.id), userId: parseInt(req.user.id) }
	});
	console.log(userProject, req.params.id, req.user.id);
	res.status(200).send({msg: "delete success"})
});

module.exports = router;
