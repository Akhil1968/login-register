var bcrypt = require('bcryptjs');
var SALT_WORK_FACTOR = 10;

console.log("-----Bcryptjs example  Synch-----")
var salt = bcrypt.genSaltSync(SALT_WORK_FACTOR);
var textToHash = "Hi, How are you";
var hash = bcrypt.hashSync(textToHash, salt);

console.log("Original Text=%s   HashedText=%s", textToHash, hash);

console.log("-- bcrypt compare method--");
console.log("comparing with Original Text->%s", bcrypt.compareSync(textToHash, hash)); 
console.log("comparing with abcd->%s", bcrypt.compareSync("abcd", hash)); 

