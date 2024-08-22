var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser');

// custom require package
var cors = require('cors');

const fileUpload = require('express-fileupload');

var swaggerUi = require('swagger-ui-express');
// var swaggerSpec = require('./swaggerDefinition');
const fs = require('fs');
const https = require('https');
const helper = require("./config/helper");

// Port assign
const PORT = 5000;
const HTTPS_PORT = 5443;

var indexRouter = require('./routes/index');
var authRouter  = require('./routes/auth');
var apiRouter  = require('./routes/api');

var app = express();

// Redirect HTTP to HTTPS
app.use((req, res, next) => {
  if (req.secure) {
    return next();
  }
  res.redirect(`https://${req.headers.host}${req.url}`);
});

// create server
const http = require("http").createServer(app);

// Optionally create HTTPS server
let httpsServer;
if (fs.existsSync('path/to/your/ssl/key.pem') && fs.existsSync('path/to/your/ssl/cert.pem')) {
  const sslOptions = {
    key: fs.readFileSync('path/to/your/ssl/key.pem'),
    cert: fs.readFileSync('path/to/your/ssl/cert.pem')
  };
  httpsServer = https.createServer(sslOptions, app);
}

const ipAddress = helper.getIPAddress();
const protocol = httpsServer ? 'https' : 'http';
// Dynamic URL for Swagger
const swaggerUrl = `${protocol}://${ipAddress}:${protocol === 'https' ? HTTPS_PORT : PORT}/api`;
const createSwaggerSpec = require('./swaggerDefinition');
const swaggerSpec = createSwaggerSpec(swaggerUrl);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// // Configure the CORS middleware to allow all origins
// const corsOptions = {
//   // origin: true,  // This will allow all origins
//   origin: '*',
// };

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

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

// Listen to the HTTP server
http.listen(PORT, () => {
  console.log(`Server Running on http://${ipAddress}:${PORT}`);
});

if (httpsServer) {
  httpsServer.listen(HTTPS_PORT, () => {
    console.log(`Server Running on https://${ipAddress}:${HTTPS_PORT}`);
  });
}

module.exports = app;
