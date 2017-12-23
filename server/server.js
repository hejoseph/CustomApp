const express = require('express');
const path = require('path');
const routes = require('./routes');
const app = express();
// const app = express.createServer();
const port = process.env.PORT || 3000;
const router = express.Router();
const bodyParser = require('body-parser');

var socket = require('./socket.js');


app.set('view engine', 'html');

app.use([bodyParser.json(), bodyParser.urlencoded({extended: true})]);
app.use(express.static(path.join(__dirname, '../client')));
app.use('/socket.io', express.static(__dirname + '/../node_modules/socket.io-client/dist'));
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send('Server Error');
});
app.use('/api', routes);

router.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'index.html'));
});


// app.listen(port, (err) => {
//   err
//     ? console.log('Cannot connect...', err)
//     : console.log(`Connected! Server is listening on port ${port}`);
// });

var http = require('http');
var server = http.createServer(app);

server.listen(port, (err) => {
  err
    ? console.log('Cannot connect...', err)
    : console.log(`Connected! Server is listening on port ${port}`);
});
// Hook Socket.io into Express
var io = require('socket.io').listen(server);

io.sockets.on('connection', socket);