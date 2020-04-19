const express = require('express');
const cors = require('cors');

app = express();
app.use(cors());
app.use(express.json());

require('./db/db');
require('./routes/articles');
require('./routes/comments');
require('./routes/auth/auth');

app.listen(3000, '127.0.0.1', function() {
  console.log('Server started on host: localhost, port: 3000');
});


