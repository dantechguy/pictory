// return a function, which when passed io, will return another function
// the returned function, which when passed a roomId, returns another function
// the second returned function will send socketio message
function sendRoomMessage(io) {
  return (roomid) => {
    return (event, data) => {
      io.in(roomId).emit(event, data);
    }
  }
}


module.exports = sendRoomMessage;
