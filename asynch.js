var bcrypt = require('bcryptjs');
var SALT_WORK_FACTOR = 10;
var clearText = "Hi, How are you";


console.log("-----Bcryptjs example Asynch-----")
bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(clearText, salt, function(err, hash) {
        console.log("Original Text=%s \n HashedText=%s", clearText, hash);

        clearText = "abcd";
        console.log("\n\n-- bcrypt compare method-- comparing [%s] with [%s]", clearText, hash);
        bcrypt.compare(clearText, hash, function(err, isMatch) {
            if (!err){
                console.log("comparing with Original Text->%s", isMatch);
            }
        });//compare
    });
});
 
