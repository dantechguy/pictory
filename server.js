// required files
const setupRoutingAndReturnServer = require('./routing/routing');
const setupSockets = require('./sockets/sockets');
const values = require('./public/values')
const Rooms = require('./dataStructures/rooms');
const Players = require('./dataStructures/players');


// setup data structures
global.rooms, global.players, global.values;
global.rooms = new Rooms();
global.players = new Players();
global.values = values;

// call setup functions
var server = setupRoutingAndReturnServer();
setupSockets(server);



console.log('Server running');
