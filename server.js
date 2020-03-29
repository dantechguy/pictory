// required files
var setupRoutingAndReturnServer = require('./routing/routing');
var setupSockets = require('./sockets/sockets');
const values = require('./public/values')
var Rooms = require('./dataStructures/rooms');
var Players = require('./dataStructures/players');


// setup data structures
global.rooms, global.players, global.values;
global.rooms = new Rooms();
global.players = new Players();
global.values = values;

// call setup functions
var server = setupRoutingAndReturnServer();
setupSockets(server);



console.log('Server running');
