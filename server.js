// required files
const setupRoutingAndReturnServer = require('./routing/routing');
const setupSockets = require('./sockets/sockets');
const values = require('./public/values')
const Rooms = require('./dataStructures/rooms');
const Players = require('./dataStructures/players');



// global.rooms, global.players, global.values; // why is this needed?

// setup global values
global.values = values;

// call setup functions
var server = setupRoutingAndReturnServer();
sendRoomMessageFunction = setupSockets(server); // function to send socket messages


// setup data structures
global.rooms = new Rooms(sendRoomMessageFunction);
global.players = new Players();



console.log('Server running');
