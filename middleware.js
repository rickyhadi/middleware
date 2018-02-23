var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var compression = require('compression');
var helmet = require('helmet');

function middleware (controller, rootdir, theme){

	var app = express();

	// view engine setup
	app.set('views', path.join(rootdir, 'views'));
	app.set('view engine', 'hbs');

	// uncomment after placing your favicon in /public
	app.use(favicon(path.join(rootdir, 'public', theme, 'favicon.ico')));
	app.use(compression())
	app.use(logger('dev'));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(cookieParser());
	app.use(express.static(path.join(rootdir, 'public', theme)));
	console.log(path.join(rootdir, 'public', theme))
	app.use(helmet());

	controller(app);

	// catch 404 and forward to error handler
	app.use(function(req, res, next) {
	  var err = new Error('Not Found');
	  err.status = 404;
	  next(err);
	});

	// error handler
	app.use(function(err, req, res, next) {
	  // set locals, only providing error in development
	  res.locals.message = err.message;
	  res.locals.error = req.app.get('env') === 'development' ? err : {};

	  // render the error page
	  res.status(err.status || 500);
	  res.render('error');
	});
	
	return app;
}

module.exports = middleware;
