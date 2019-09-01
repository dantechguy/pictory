// variables
let roomIdErrorMessage = 'Your room ID must be 4 numbers.';
let nameErrorMessage = 'Your name must be 3 to 8 characters long, and only include lowercase and uppercase letters.';
let roomHasStartedErrorMessage = 'This game has already started.';
let nameIsTakenErrorMessage = 'This name has already been used in this room.';


// functions
function whatIsWrongWithNameAndRoomId(data) {
  let whatIsWrongList = generateWhatIsWrongList(data);
  let whatIsWrongText = whatIsWrongList.join(' ');
  return whatIsWrongText;
}

function generateWhatIsWrongList(data) {
  let name = data.name;
  let roomId = data.roomId;
  let whatIsWrongList = [];

  if (!roomIdIsValid(roomId)) {
    whatIsWrongList.push(roomIdErrorMessage);
  };
  if (!nameIsValid(name)) {
    whatIsWrongList.push(nameErrorMessage);
  };
  if (!roomDoesntExistOrIsInLobbyState(roomId)) {
    whatIsWrongList.push(roomHasStartedErrorMessage);
  };
  if (!ifRoomIsInLobbyStateThenNameIsntTaken(data)) {
    whatIsWrongList.push(nameIsTakenErrorMessage);
  };
  return whatIsWrongList;
}



module.exports = whatIsWrongWithNameAndRoomId;