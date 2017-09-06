// Final Cap Stone project on security
// John Stone and Jack Hamby and Samir Bekhechi
// 12/6/16

var express = require('express'); 
var app = express();

var spawn = require("child_process").spawn;



/****************/
// JS file include
var sql_func = require('./js/node-js.js');
console.log(typeof sql_func.foo);
/************/



/******************/
// Set up Database
var mysql = require('mysql');
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'breakable',
	password: 'password',
	database: 'sql_injection'
});

app.get('/get_table', function(req, res){
	console.log('Retrieving database info');
	var queryString = 'SELECT * FROM demo_table';
	console.log(queryString);

	connection.query(queryString, function(err, results) {
		console.log(results);
		var string = JSON.stringify(results);
		
		console.log(string);
		res.send(string);
	});
});

connection.query('DROP TABLE IF EXISTS demo_table', function(err) {
	if(err) console.log("ERROR: ", err);
});

var create_table = 'CREATE TABLE demo_table ( name varchar(255), password varchar(255), email varchar(255))';

connection.query( create_table, function(err) {
	if (!err)
		console.log("demo_table successfully created");
	else 
		console.log("ERROR: ", err)
});

var populate_table = "INSERT INTO demo_table VALUES ('Joe', 'pa', 'joe@gmail.com'), ('Jeremey', 'abc', 'jj999@yahoo.com'), ('Kyle', 'nsjc', 'kyle@gmial.com');"

connection.query( populate_table, function(err){
	if (!err)
		console.log("Table successfully populated");
	else 
		console.log("ERROR: ", err);
});

/****************/


//////
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extend: true }));

/*
connection.query('SELECT * from employee', function(err, rows, fields){
	if (!err) console.log('The solution is: ', rows); else 
		console.log('Error while performing Query.');
});
*/
	

/*************/
// Binding express app to port 3000
app.listen(3001, function(){
	console.log('Node server running @ http://162.210.88.93:3000');
});
/*************/


/**********/
// Set up file system
app.use('/node_modules', express.static(__dirname + '/node_modules'));

app.use('/style', express.static(__dirname + '/style'));

app.use('/js', express.static(__dirname + '/js'));

app.use('/images', express.static(__dirname + '/images'));
/********/



/*************/
// Get requests
app.get('/', function(req, res){
	res.sendFile('index.html', {'root': __dirname + '/templates'});
});

// SQL Injections

app.get('/Password_tutorial', function(req, res){
	res.sendFile('password_tutorial.html', {'root': __dirname + '/templates'});
});

app.get('/SQL_tutorial', function(req, res){
	res.sendFile('sql_tutorial.html', {'root': __dirname + '/templates'});
});

app.get('/vulnerable', function(req, res){
	res.sendFile('vulnerable.html', {'root': __dirname + '/templates'});
});

app.get('/prepared', function(req, res){
	res.sendFile('prepared.html', {'root': __dirname + '/templates'});
});

app.get('/loggedin', function(req, res){
	res.sendFile('loggedin.html', {'root': __dirname + '/templates'});
});

app.get('/vulnerable_fail', function(req, res){
	res.sendFile('vulnerable_fail.html', {'root': __dirname + '/templates'});
});

app.get('/prepared_fail', function(req, res){
	res.sendFile('prepared_fail.html', {'root': __dirname + '/templates'});
});

// Password Cracking
app.get('/vulnerable_pass', function(req, res){
	res.sendFile('vulnerable_pass.html', {'root': __dirname + '/templates'});
});

app.get('/vulnerable_pass_fail', function(req, res){
	res.sendFile('vulnerable_pass_fail.html', {'root': __dirname + '/templates'});
});

app.get('/captcha', function(req, res){
	res.sendFile('captcha.html', {'root': __dirname + '/templates'});
});

/// SSI

app.get('/test', function(req, res){
	res.sendFile('test.shtml', {'root': __dirname + '/templates'});
});





/*
app.get('/getDatabase', function(req, res){
	console.log("test getting db info");
	connection.query('SELECT * FROM demo_table', function(err, results) {
		var string = JSON.stringify(results);
		res.json(string);
	});
	console.log("sent json info");
});
*/
	

/*****************/

// Verify User function
// VULNERABLE
app.post('/vulnerable_verifyuser', function(req, res){
	console.log('checking user in database');
	console.log(req.body.name);
	var selectString = 'SELECT * FROM demo_table WHERE email="'+req.body.email+'" AND password="'+req.body.password+'" ';
	console.log(selectString);

	connection.query(selectString, function(err, results) {
		console.log(results);
		var string = JSON.stringify(results);
		
		console.log(string);
		if (string === '[{"COUNT(name)":1}]') {
			res.send('Login Success');
		}
		if (string === '[{"COUNT(name)":0}]') {
			res.send("Login Failed");
		}
		if (string != '[]'){
			res.send('Login Success');
		} else {
			res.send('Login Failed');
		}
	});
});


/*****************/

// Verify User function
// PREPARED STATEMENTS
app.post('/prepared_verifyuser', function(req, res){
	console.log('checking user in database');
	console.log(req.body.email);
	var selectString = 'SELECT * FROM demo_table WHERE email = ? AND password = ?';
	console.log(selectString);

	connection.query(selectString, [req.body.email, req.body.password], function(err, results) {
		console.log(results);
		var string = JSON.stringify(results);
		
		console.log(string);
		if (string === '[{"COUNT(name)":1}]') {
			res.redirect('/loggedin');
		}
		if (string === '[{"COUNT(name)":0}]') {
			res.redirect('/showSignInPageretry');
		}
		if (string != '[]'){
			res.send('Login Success');
		} else {
			res.send('Login Failed');
		}
	});
});


// Password Vulnerable
app.post('/vulnerable_pass_verifyuser', function(req, res){
	console.log('PASSWORD checking user in database');
	console.log(req.body.name);
	var selectString = 'SELECT * FROM demo_table WHERE email="'+req.body.email+'" AND password="'+req.body.password+'" ';
	console.log(selectString);

	connection.query(selectString, function(err, results) {
		console.log(results);
		var string = JSON.stringify(results);
		
		console.log(string);
		if (string != '[]'){
			res.send('Login Success');
		} else {
			res.send('Login Failed');
		}
	});
});


var count = 0;

// Password Vulnerable
app.post('/captcha_verifyuser', function(req, res){
	console.log('checking user in database');
	console.log(req.body.name);
	var selectString = 'SELECT * FROM demo_table WHERE email="'+req.body.email+'" AND password="'+req.body.password+'" ';
	console.log(selectString);

	connection.query(selectString, function(err, results) {
		console.log(results);
		var string = JSON.stringify(results);
		
		console.log(string);
		if (string === '[{"COUNT(name)":1}]') {
			res.redirect('/loggedin');
		}
		if (string === '[{"COUNT(name)":0}]') {
			res.redirect('/showSignInPageretry');
		}
		if (string != '[]'){
			count = 0;
			res.redirect('/loggedin');
		} else {
			count++;
			if (count > 3){
				res.redirect('/');
			} else {	
			 	res.redirect('/vulnerable_fail');
			}
		}
	});
});



app.post('/crack_password', function(req, res){
	console.log('Cracking password');
	
	var py = spawn('python', ['pass2.py']);

	dataString = "";

	py.stdout.on('data', function(data){
		dataString += data.toString();
	});

	py.stdout.on('end', function(){
		console.log(dataString);
		console.log("done");
		res.send(dataString);
	});
	
	py.stdin.write(JSON.stringify(req.body.email));
	py.stdin.end();

});
