const express = require('express');
const dbConnect = require('./config/bdConnect');
const bodyParser = require('body-parser');
const app = express();
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 3000;
const { notFound, errorHandler } = require('./middlewares/errorHandler');

const morgan = require("morgan");
const cors = require('cors');

const authRouter = require('./routes/authRoute');

dbConnect();

app.use(morgan("dev"));

// Enable CORS for all origins
app.use(cors());
app.options('*', cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRouter);

// Show Error, Not found
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server is running at PORT ${PORT}`);
})
