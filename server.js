// required files
const setupRoutingAndReturnServer = require('./routing/routing');
const setupSockets = require('./sockets/sockets');
const values = require('./public/values')
const Rooms = require('./dataStructures/rooms');
const Players = require('./dataStructures/players');



// global.rooms, global.players, global.values; // why is this needed?

// setup global values
global.values = values;
global.l = console.log;

// call setup functions
var server = setupRoutingAndReturnServer();
global.io = setupSockets(server); // function to send socket messages


// setup data structures
global.rooms = new Rooms();
global.players = new Players();



console.log('Server running');
