const values = {
  url: {
    INDEX: '/',
    GAME: '/game',
    JOIN: '/join',
    READY: '/done',
    DATA: '/data',
    TIME: '/time',
    EXIT: '/exit'
  },
  cookie: {
    SESSION_ID_KEY: 'sessionId',
  },
  error: {
    INVALID_NAME: 'Your name must be 3 to 8 characters long, and only include letters.',
    INVALID_ROOM_ID: 'Your room ID must be 4 numbers.',
    ROOM_STARTED: 'This game has already started.',
    NAME_TAKEN: 'This name has already been taken in this room.',
    INVALID_SESSION_ID: 'The session ID provided is invalid.',
    PLAYER_CONNECTED: 'You have already joined this game.',
    ROOM_NOT_STARTED: 'The game has not started yet.',
    PLAYER_READY: 'You are already ready.',
    ROOM_ENDED: 'The game has already ended.',
    TIME_LIMIT: 'The game has exceeded the time limit',
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
    IDEA: 'idea.html',
    DRAW: 'draw.html',
    GUESS: 'guess.html',
    REPLAY: 'replay.html',
    WAIT: 'wait.html',
  },
  regex: {
    NAME: /^[a-zA-Z]{3,8}$/,
    ROOM_ID: /^[0-9]{4}$/,
    SESSION_ID: /^[0-9]{10}$/,
  },
  next: {
    LOBBY: 'IDEA',
    IDEA: 'DRAW',
    DRAW: 'GUESS',
    GUESS: 'DRAW',
    REPLAY: 'REPLAY',
    MAX_ROUNDS: 5,
  },
  socket: {
    RELOAD: 'RELOAD',
    UPDATE_PLAYERS: 'UPDATE_PLAYERS',
  },
  time: {
    IDEA: 60 *1000,
    DRAW: 120 *1000,
    GUESS: 30 *1000,
    PUT_DATA_INTERVAL: 10 *1000, // every n seconds their data is uploaded
    PUT_DATA_FINAL: 3 *1000, // time before finish which data is uploaded
    CONNECT: 30 *1000, // non connected players have n seconds to re-connect or be removed
  }
}


try {
  module.exports = values;
} catch (err) {
  console.log('This is not node!');
}
