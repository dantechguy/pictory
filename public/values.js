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
    NAME: 'Your name must be 3 to 8 characters long, and only include letters.',
    ROOM_ID: 'Your room ID must be 4 numbers.',
    ROOM_STARTED: 'This game has already started.',
    NAME_TAKEN: 'This name has already been taken in this room.',
  },
  state: {
    LOBBY: 'lobby',
    IDEA: 'idea',
    DRAW: 'draw',
    GUESS: 'guess',
    REPLAY: 'replay'
  }
}


try {
  module.exports = values;
} catch (err) {
  console.log('This is not node!');
}
