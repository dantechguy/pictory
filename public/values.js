const values = {
  url: {
    GAME: '/game',
    JOIN: '/join',
    READY: '/ready',
  },
  cookie: {
    DURATION: 15,
    SESSION_ID_KEY: 'sessionId',
  },
  error: {
    INVALID_NAME: 'Your name must be 3 to 8 characters long, and only include letters.',
    INVALID_ROOM_ID: 'Your room ID must be 4 numbers.',
    ROOM_STARTED: 'This game has already started.',
    NAME_TAKEN: 'This name has already been taken in this room.',
    INVALID_SESSION_ID: 'The session ID provided is invalid.',
    PLAYER_CONNECTED: 'You have already joined this game.'
    ROOM_NOT_STARTED: 'The game has not started yet.',
    PLAYER_READY: 'You are already ready.',
  },
  state: {
    LOBBY: 'LOBBY',
    IDEA: 'IDEA',
    DRAW: 'DRAW',
    GUESS: 'GUESS',
    REPLAY: 'REPLAY'
  },
  file: {
    PUBLIC: './../public/',
    INDEX: 'index.html',
    LOBBY: 'lobby.html',
    DRAW: 'draw.html',
    GUESS: 'guess.html',
    REPLAY: 'replay.html'
  },
  regex: {
    NAME: /^[a-zA-Z]{3,8}$/,
    ROOM_ID: /^[0-9]{4}$/,
    SESSION_ID: /^[0-9]{10}$/,
  }
}


try {
  module.exports = values;
} catch (err) {
  console.log('This is not node!');
}
