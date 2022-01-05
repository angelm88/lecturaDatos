const express = require('express');
const path = require('path');
const session = require('express-session');
const portNumber = 5001;

// Express app declaration
const app = express();

// App configuration
app.set('view engine', 'ejs');  // view engine config
app.set('views', path.join(__dirname, 'views')); // view engine path config

// Middlewares
app.use(express.urlencoded({extended: false}));
app.use(session({   // Session configuration
    secret: "password",
    resave: true,
    saveUninitialized: true
}));

// Routes
app.use(require('./routes/routes.js'));

// Public
app.use(express.static(path.join(__dirname,'..', 'public'))); // app.use(express.static('/public'));

// Create server
const server = require('http').Server(app); // creates a server which accepts HTTP petitions at app

// Create server socket
const io = require('socket.io')(server); // creation of server's socket (note: it is necessary to first create a Server with HTTP petitions)

// Communication between server and browser through web sockets ("io" object)
io.on('connection', socket => { //"io" object manages all sockets AKA every user connected to server
    socket.on('from_arduino', data => {
        console.log(data);
        io.sockets.emit('from_server', data); // posible cambio
    });
});

server.listen(portNumber, () => {
    console.log(`Server running on port ${portNumber}`);
});