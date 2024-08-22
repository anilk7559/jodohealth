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


// Define the list of allowed origins
const allowedOrigins = [
  'http://192.168.1.100:3000',
  'http://192.168.29.19:3000',
  'http://192.168.29.127:5173',
  'https://lively-pothos-5ac905.netlify.app',
  'https://marvelous-hummingbird-3c1ac5.netlify.app/login',
  `http://${ipAddress}:${PORT}`
];
console.log(allowedOrigins, "allowedOrigins");

// Configure the CORS middleware
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
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
