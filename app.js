
/**
 * Module dependencies.
 */

var express = require('express'),
    formidable = require('formidable');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(require('stylus').middleware({ src: __dirname + '/public' }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Site Configuration:
var sitename = ' - Whistle.co.uk';

// Form:

var forms = require('forms'),
    fields = forms.fields,
    validators = forms.validators;

var reg_form = forms.create({
    username: fields.string({required: true}),
    password: fields.password({required: true}),
    confirm:  fields.password({
        required: true,
        validators: [validators.matchField('password')]
    }),
    email: fields.email()
});

var login_form = forms.create({
    email: fields.email({required: true}),
    password: fields.password({required: true})
    });
    
var login_form_method = 

// Rou

app.get('/test', function (req, res) {
  res.render('form', {
  	title: 'Welcome Test!!' +sitename,
  	login_form: login_form.toHTML()
  });
//  res.writeHead(200, {'Content-Type': 'text/plain'});
//  res.end(reg_form.toHTML());
//  // res.end('Whistle NODEJS Test Server :-)\n');
});

app.get('/login', function (req, res) {
  res.render('form', {
  	title: 'Thanks for Loggin In !!' +sitename,
  	login: login_form.toHTML()
  });
//  res.writeHead(200, {'Content-Type': 'text/plain'});
//  res.end(reg_form.toHTML());
//  // res.end('Whistle NODEJS Test Server :-)\n');
});


app.get('/', function(req, res){
  res.render('index', {
    title: 'Express'  +sitename,
    login_form: login_form.toHTML(),
    reg_form: reg_form.toHTML()
  });
});

app.listen(80);
console.log("Express server listening on port %d", app.address().port);
