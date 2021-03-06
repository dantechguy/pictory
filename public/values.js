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
    PLAYER_NOT_READY: 'You are not ready.',
    ROOM_ENDED: 'The game has already ended.',
    TIME_LIMIT: 'The game has exceeded the time limit',
  },
  text: {
    SUBMIT_CONFIRM: 'Are you sure you are ready?',
    CLEAR_DRAWING_CONFIRM: 'Are you sure you want to clear?',
    TEXT_PROMPT_SUFFIX: ' said',
    CANVAS_PROMPT_SUFFIX: ' drew',
  },
  state: {
    INDEX: 'INDEX', // pseudo state
    LOBBY: 'LOBBY',
    IDEA: 'IDEA',
    DRAW: 'DRAW',
    GUESS: 'GUESS',
    REPLAY: 'REPLAY',
    WAIT: 'WAIT', // pseudo state
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
    READY_ICON: 'ready.svg',
    NOT_READY_ICON: 'notReady.svg',
    CONNECTED_ICON: 'connected.svg',
    NOT_CONNECTED_ICON: 'notConnected.svg',
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
    MAX_ROUNDS: 9,
  },
  socket: {
    RELOAD: 'RELOAD',
    UPDATE_PLAYERS: 'UPDATE_PLAYERS',
  },
  time: {
    IDEA: 60 *1000,
    DRAW: 120 *1000,
    GUESS: 60 *1000,
    PUT_DATA_FINAL: 3 *1000, // time before finish which data is uploaded
    CONNECT: 30 *1000, // non connected players have n seconds to re-connect or be removed after timer
    RETRY: 5 *1000, // how often client retries for /time and /data on error
    TIMER: 0.1 *1000, // how often the timer updates
    TIMER_DP: 1, // how many decimal places the timer is to
    ROOM_DELETE: 60 * 1000, // how long after everyone has left that the room is deleted
    DRAW_DELAY: 2.5 *1000, // total time to draw prompt
  },
  drawing: {
    big: {
      true: 10,
      false: 5,
    },
    dark: {
      true: '#000',
      false: '#888',
    },
  },
  defaultData: {
    text: '',
    draw: [],
  },
  dom: {
    CONTAINER_ID_PREFIX: 'container-',
    title: {
      ELEMENT: 'img',
      attributes: {
        id: 'title',
        src: 'title.png',
      }
    },
    name: {
      ELEMENT: 'input',
      attributes: {
        id: 'name',
        type: 'text',
        maxLength: 8,
        placeholder: 'name',
        classList: 'border',
      }
    },
    roomId: {
      ELEMENT: 'input',
      attributes: {
        id: 'roomid',
        type: 'text',
        maxLength: 4,
        placeholder: 'room id',
        classList: 'border',
      }
    },
    submit: {
      ELEMENT: 'button',
      attributes: {
        id: 'submit',
        type: 'button',
        classList: 'button',
      },
      functions: {
        onclick: 'submit',
      }
    },
    reJoin: {
      ELEMENT: 'button',
      attributes: {
        id: 'rejoin',
        type: 'button',
        classList: 'button',
        // textContent: 'rejoin game',
      },
      functions: {
        onclick: 'reJoin',
      }
    },
    playerList: {
      ELEMENT: 'ul',
      attributes: {
        id: 'playerlist',
        classList: 'border',
      }
    },
    exit: {
      ELEMENT: 'button',
      attributes: {
        id: 'exit',
        type: 'button',
        classList: 'button',
        // textContent: 'leave',
      },
      functions: {
        onclick: 'setToExit',
      }
    },
    timer: {
      ELEMENT: 'div',
      attributes: {
        id: 'timer',
        classList: 'border',
      }
    },
    inputTextPrompt: {
      ELEMENT: 'input',
      attributes: {
        id: 'inputtextprompt',
        classList: 'border',
      }
    },
    showTextPrompt: {
      ELEMENT: 'div',
      attributes: {
        id: 'showtextprompt',
        classList: 'border',
      }
    },
    inputCanvasPrompt: {
      ELEMENT: 'canvas',
      attributes: {
        id: 'inputcanvasprompt',
        width: 400,
        height: 500,
        classList: 'border crosshair',
      },
      functions: {
        ontouchstart: 'touchStart',
        onmousedown: 'touchStart',
        onmouseup: 'touchEnd',
        ontouchend: 'touchEnd',
        ontouchcancel: 'touchEnd',
        onmouseleave: 'touchEnd',
        onmousemove: 'touchMove',
        ontouchmove: 'touchMove',
      }
    },
    showCanvasPrompt: {
      ELEMENT: 'canvas',
      attributes: {
        id: 'showcanvasprompt',
        width: 400,
        height: 500,
        classList: 'border',
      }
    },
    clearDrawing: {
      ELEMENT: 'button',
      attributes: {
        id: 'cleardrawing',
        type: 'button',
        classList: 'button',
      },
      functions: {
        onclick: 'clearDrawing',
      }
    },
    undoStroke: {
      ELEMENT: 'button',
      attributes: {
        id: 'undostroke',
        type: 'button',
        classList: 'button',
      },
      functions: {
        onclick: 'undoStroke',
      }
    },
    penColour: {
      ELEMENT: 'button',
      attributes: {
        id: 'pencolour',
        type: 'button',
        classList: 'button',
      },
      functions: {
        onclick: 'penColour',
      }
    },
    penSize: {
      ELEMENT: 'button',
      attributes: {
        id: 'pensize',
        type: 'button',
        classList: 'button',
      },
      functions: {
        onclick: 'penSize',
      }
    },
    replay: {
      ELEMENT: '',
      attributes: {
        id: 'replay'
      }
    },
    replayName: {
      ELEMENT: 'div',
      attributes: {
        'id': 'replayname',
      }
    },
  },

}

try {
  module.exports = values;
} catch (err) {
  console.log('This is not node!');
}
