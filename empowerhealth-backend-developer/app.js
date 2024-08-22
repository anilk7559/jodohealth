var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser');

// Custom require package
var cors = require('cors');
const fileUpload = require('express-fileupload');
var swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const helper = require("./config/helper");

// Port assignment
const PORT = 5000;

var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');
var apiRouter = require('./routes/api');

var app = express();

// Create HTTP server
const http = require("http").createServer(app);

const ipAddress = helper.getIPAddress();
const protocol = 'http'; // Only HTTP

// Dynamic URL for Swagger
const swaggerUrl = `${protocol}://${ipAddress}:${PORT}`;
const createSwaggerSpec = require('./swaggerDefinition');
const swaggerSpec = createSwaggerSpec(swaggerUrl);

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// CORS configuration
const corsOptions = {
  origin: 'https://www.jodohealth.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

// Middleware to handle file uploads
app.use(fileUpload());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Swagger setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/', indexRouter);
app.use('/api/auth', authRouter);
app.use('/api', apiRouter);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Listen to the HTTP server
http.listen(PORT, () => {
  console.log(`Server Running on http://${ipAddress}:${PORT}`);
});

module.exports = app;
