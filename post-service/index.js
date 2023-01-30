const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const postController = require('./controller/post.controller');
const config = require('./config/auth.config');

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ['http://localhost:3000'],
    method: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    maxAge: 24 * 60 * 60 * 1000,
  })
);
app.use(cookieParser());

app.use('/', postController);

app.listen(config.PORT, () => {
  console.log(`Server started on port ${config.PORT}`);
});
