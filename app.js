const express = require('express');
const path = require('path');
const users = require('./routes/users');
const cards = require('./routes/cards');
const middleware = require('./middleware/middleware');

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', users);
app.use('/cards', cards);
app.use(middleware);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server started at ${PORT}`);
});
