const http = require('http');
const hostname = '127.0.0.1';
var cors = require('cors')
const port = process.env.PORT || 8000;
const path = require('path');
const accountRouter = require('./routes/account');
const indexRouter = require('./routes');
const stockRouter = require('./routes/stocks');
const userRouter = require('./routes/users');
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const app = express();
const db = require('./models');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const store = new SequelizeStore({ db: db.sequelize });
require('dotenv').config();

store.sync();

app.use(cors())
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store,
    cookie: {
      secure: false,
      maxAge: 2592000,
    },
  })
);
app.use(express.static(path.join(__dirname, '../client/build')));
app.use(express.json());
app.use(accountRouter);
app.use(indexRouter);
app.use(stockRouter);
app.use(userRouter);

const server = http.createServer(app);

// app.get('*', (req, res) => {
//   res.redirect('/');
// });

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
