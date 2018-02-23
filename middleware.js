var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var compression = require('compression');
var helmet = require('helmet');

function middleware (controller){
	var rootdir = env.rootdir || __dirname;

	var app = express();

	// view engine setup
	app.set('views', path.join(rootdir, 'views'));
	app.set('view engine', 'hbs');

	// uncomment after placing your favicon in /public
	app.use(favicon(path.join(rootdir, 'public', 'favicon.ico')));
	app.use(compression())
	app.use(logger('dev'));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(cookieParser());
	app.use(express.static(path.join(rootdir, 'public')));
	app.use(helmet());

	controller(app);

	return app;
}

module.exports = middleware;
