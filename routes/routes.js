var mongoose = require( 'mongoose' );
var UserModel = mongoose.model( 'UserModel' );
var bcrypt = require('bcryptjs');

exports.loginHandler = function (req, res){
	console.log("Inside loginHandler");
	res.render('login.handlebars', {});
};//loginHandler

exports.logoutHandler = function (req, res){
	console.log("Inside logoutHandler");
	req.session.destroy();
	res.render('login.handlebars', {});
};//logoutHandler

exports.authHandler = function (req, res){
	var nmReq = req.body.nm;
	var pwdReq = req.body.pwd;
	var loginOutcome;
	console.log( "Inside authHandler--> Login=%s, Password=%s", nmReq, pwdReq);
	mongoose.model('UserModel').findOne({username:nmReq}, function(err, userObj){
	    if(userObj === null){
	     	loginOutcome = "Login Failed: User name does not exist in db";
	     	res.render('login.handlebars', {errorMessage:loginOutcome});
	    } else {  //userObj is Not NULL

			console.log( "Password [%s] being matched with hashed password [%s] using bcrypt.compare", 
						pwdReq, userObj.password);
	    	bcrypt.compare(pwdReq, userObj.password, function(errCompare, isMatch) {
		        if (errCompare) {
		        	loginOutcome = "Login Failed : bcrypt.comare yielded error" ;
					res.render('login.handlebars', {errorMessage:loginOutcome});
		        }else if (isMatch === true){
					loginOutcome = "Login successful";
					res.render('landingpage.handlebars', {MSG:loginOutcome});
				} else{
					loginOutcome = "Login Failed: Password did not match";
					res.render('login.handlebars', {errorMessage:loginOutcome});
				}
				console.log( "Login outcome [%s]", loginOutcome);
				
			});// bcrypt.compare assynch
	   }//userObj is Not NULL
	});//findOne
}; //authHandler


exports.registerFormHandler = function(req, res){
   console.log("Inside registerFormHandler");
   res.render("register.handlebars", {});
}; //registerFormHandler

exports.registerSubmitHandler = function(req, res){
   console.log("Inside registerSubmitHandler");
	
   var usernameReq = req.body.username;
   var passwordReq = req.body.password;

   var newuser = new UserModel();
   newuser.username = usernameReq;
   newuser.password = passwordReq;

   //save to db through model
   newuser.save(function(err, savedUser){
       if(err){
         var message = "A user already exists with that username or email";
         console.log(message);
         res.render("register.handlebars", {errorMessage:message});
         return;
       }else{
         req.session.newuser = savedUser.username;
         res.render('landingpage.handlebars', {MSG:"Registration succesful"});
       }
   });
};//registerSubmitHandler
