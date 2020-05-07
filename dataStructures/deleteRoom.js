function deleteRoomIfAllPlayersDisconnectedOrToExitAfterTimeout(room) {
  l(`  try to delete [${room.getRoomId()}]`);
  if (room.allPlayersDisconnectedOrToExit()) {
    cancelPreviousDeleteRoomTimeout(room);
    l(`  delete [${room.getRoomId()}] in ${values.time.ROOM_DELETE/1000}s`);
    room.timeouts.deleteRoom = setTimeout(
      deleteRoomIfAllPlayersDisconnectedOrToExit,
      values.time.ROOM_DELETE,
      room, // additional parameter
    );
  }
}

function deleteRoomIfAllPlayersDisconnectedOrToExit(room) {
  if (room.allPlayersDisconnectedOrToExit()) {
    l(`  deleting [${room.getRoomId()}]`);
    rooms.deleteRoom(room.getRoomId());
  }
}

function cancelPreviousDeleteRoomTimeout(room) {
  if (room.timeouts.deleteRoom) l(`  cancel [${room.getRoomId()}] deletion`);
  clearTimeout(room.timeouts.deleteRoom);
  room.timeouts.deleteRoom = undefined;
}

module.exports = {
  deleteRoomIfAllPlayersDisconnectedOrToExitAfterTimeout: deleteRoomIfAllPlayersDisconnectedOrToExitAfterTimeout,
  cancelPreviousDeleteRoomTimeout: cancelPreviousDeleteRoomTimeout,
};
