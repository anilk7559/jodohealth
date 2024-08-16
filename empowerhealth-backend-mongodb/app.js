const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const http = require('http');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const helper = require('./config/helper');

dotenv.config();
connectDB();
const app = express();

const apiRoutes = require('./routes/apiRoutes');
const authRoutes = require('./routes/authRoutes');

const corsOptions = {
  origin: true,  
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(fileUpload());

app.use(logger('dev'));

app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/auth', authRoutes);
app.use('/api', apiRoutes);

const PORT = process.env.PORT || 5000;
const httpServer = http.createServer(app);
httpServer.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

app.use((req, res, next) => {
  res.status(404).json({ message: 'Not Found' });
});
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

module.exports = app;
