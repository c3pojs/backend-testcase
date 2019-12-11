const express = require('express');
const app = express();
const sequelize = require('./configs/seqDB');
const bodyParser = require('body-parser');
const passport = require('./configs/passport');
const User = require('./model/user');
const SavedProjects = require('./model/savedProject');

const auth = require('./router/auth');
const savedProjects = require('./router/savedProjects');
const usersSavedProjects = require('./router/usersSavedProjects');

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
app.use('/projects', savedProjects);
app.use('/userProjects', usersSavedProjects);
app.use(passport.initialize());

User.hasMany(SavedProjects);
SavedProjects.belongsTo(User);

sequelize
	.sync()
	.then(() => {
		app.listen(8080, function() {
			console.log('server start magic on 8080...');
		});
	})
	.catch(err => console.log(err));
