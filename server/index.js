const http = require('http');
var cors = require('cors');
const port = process.env.PORT || 8000;
const path = require('path');
const accountRouter = require('./routes/account');
const indexRouter = require('./routes');
const stockRouter = require('./routes/stocks');
const userRouter = require('./routes/users');
const express = require('express');
const app = express();
require('dotenv').config({
  path: '../.env',
});

app.use(cors());
app.use(express.static(path.join(__dirname, '../client/build')));
app.use(express.json());
app.use(accountRouter);
app.use(indexRouter);
app.use(stockRouter);
app.use(userRouter);

const server = http.createServer(app);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/../client/build/index.html'));
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
