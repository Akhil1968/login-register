var chalk = require('chalk');
var mongoose = require('mongoose');

var bcrypt = require('bcryptjs');
var SALT_WORK_FACTOR = 10;

//var dbURI = 'mongodb://127.0.0.1/abcDB';
var dbURI =  'mongodb://edu:edu@ds015879.mlab.com:15879/edurekadb';
console.log("Establishing connection to the DB");

mongoose.connect(dbURI);

mongoose.connection.on('connected', function () {
  console.log(chalk.yellow('Mongoose connected to ' + dbURI));
});

mongoose.connection.on('error', function (err) {
  console.log(chalk.red('Mongoose connection error: ' + err));
});

mongoose.connection.on('disconnected', function () {
  console.log(chalk.red('Mongoose disconnected'));
});

// ***** *******  *  *****   Schema defs
var userSchema = new mongoose.Schema({
  username: {type: String, unique:true},
  password: String
}, {collection: 'bcryptusers'});



userSchema.pre('save', function(next) {
     var user = this;
     console.log("----Password hashing before saving new user data----");

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        console.log("SALT_WORK_FACTOR=%s  Salt=%s", SALT_WORK_FACTOR, salt);
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
            console.log("user.password = [%s]  Hash = [%s]", user.password, hash);
            // override the cleartext password with the hashed one
            user.password = hash;

            next();
        });
    });
});


// register the User model
mongoose.model( 'UserModel', userSchema);
