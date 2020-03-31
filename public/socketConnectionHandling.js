/* add the following script tag just above this file's script tag:
<script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.2.0/socket.io.js" integrity="sha256-yr4fRk/GU1ehYJPAs8P4JlTgu0Hdsp4ZKrx8bDEDC3I=" crossorigin="anonymous"></script>
*/

var socket = io();

var playerStatusJson = {};

// socket.on('connection', function(data) {});

socket.on(values.socket.UPDATE_PLAYERS, function(data) {
  playerStatusJson = data;
})
