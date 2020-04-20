const values = {
  url: {
    INDEX: '/',
    GAME: '/game',
    JOIN: '/join',
    READY: '/done',
    DATA: '/data',
    TIME: '/time',
    EXIT: '/exit',
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
    REPLAY: 'REPLAY',
    WAIT: 'WAIT',
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
    READY_ICON: '/public/ready.svg',
    NOT_READY_ICON: '/public/notReady.svg',
    CONNECTED_ICON: '/public/connected.svg',
    NOT_CONNECTED_ICON: '/public/notConnected.svg',
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
    RETRY: 5 *1000, // how often client retries for /time and /data on error
    TIMER: 0.1 *1000, // how precise the timer is
    TIMER_DP: 1 // how many decimal places the timer is to
  },
  dom: {
    CONTAINER_ID_PREFIX: 'container-',
    name: {
      ELEMENT: 'input',
      attributes: {
        id: 'name',
        type: 'text',
        placeholder: 'name',
      }
    },
    roomId: {
      ELEMENT: 'input',
      attributes: {
        id: 'roomid',
        type:'text',
        placeholder: 'room id',
      }
    },
    submit: {
      ELEMENT: 'button',
      attributes: {
        id: 'submit',
        type: 'button',
        textContent: 'submit',
        onclick: 'submit()',
      }
    },
    reJoin: {
      ELEMENT: 'button',
      attributes: {
        id: 'rejoin',
        type: 'button',
        textContent: 're-join game',
        onclick: 'reJoin()',
      }
    },
    playerList: {
      ELEMENT: 'ul',
      attributes: {
        id: 'playerlist',
      }
    },
    exit: {
      ELEMENT: 'button',
      attributes: {
        id: 'exit',
        type: 'button',
        textContent: 'leave',
        onclick: 'setToExit()',
      }
    },
    timer: {
      ELEMENT: 'div',
      attributes: {
        id: 'timer',
      }
    },
    inputTextPrompt: {
      ELEMENT: 'input',
      attributes: {
        id: 'inputtextprompt'
      }
    },
    showTextPrompt: {
      ELEMENT: 'div',
      attributes: {
        id: 'showtextprompt',
      }
    },
    inputCanvasPrompt: {
      ELEMENT: 'canvas',
      attributes: {
        id: 'inputcanvasprompt',
        width: 400,
        height: 500,
        ontouchstart: 'touchStart()',
        ontouchend: 'touchEnd()',
        ontouchcancel: 'touchEnd()',
        ontouchmove: 'touchMove()',
      }
    },
    showCanvasPrompt: {
      ELEMENT: 'canvas',
      attributes: {
        id: 'showcanvasprompt',
        width: 400,
        height: 500,
      }
    },
    clearDrawing: {
      ELEMENT: 'button',
      attributes: {
        id: 'cleardrawing',
        type: 'button',
        onclick: 'clearDrawing()',
      }
    },
    penColour: {
      ELEMENT: 'button',
      attributes: {
        id: 'pencolour',
        type: 'button',
        onclick: 'penColour()',
      }
    },
    penSize: {
      ELEMENT: 'button',
      attributes: {
        id: 'pensize',
        type: 'button',
        onclick: 'penSize()',
      }
    },
  },
  drawing: {
    big: {
      true: 10,
      false: 5,
    },
    dark: {
      true: '#000',
      false: '888',
    },
    delay: 0.1 *1000, // delay between drawing frames
  }
}

try {
  module.exports = values;
} catch (err) {
  console.log('This is not node!');
}
