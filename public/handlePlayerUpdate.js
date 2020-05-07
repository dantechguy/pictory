function handlePlayerUpdate(data) {
  playerStatuses = data;
  if (state == values.state.WAIT || state == values.state.LOBBY) {
    updatePlayerList();
  }
}

function updatePlayerList() {
  let ulId = values.dom.playerList.attributes.id;
  let ul = document.getElementById(ulId);
  // remove all li's
  while (ul.firstChild) {
    ul.removeChild(ul.lastChild);
  };
  let playersNames = Object.keys(playerStatuses);
  for (let i=0; i<playersNames.length; i++) {
    let playerName = playersNames[i];
    li = createLi(playerName);
    ul.appendChild(li);
  }
}

function createLi(playerName) {
  let playerData = playerStatuses[playerName];

  let li = document.createElement('li');
  let readyImg = document.createElement('img');
  let connectedImg = document.createElement('img');
  let textSpan = document.createElement('span');

  // create ready icon
  if (playerData.ready) {
    readyImg.src = values.file.READY_ICON;
  } else {
    readyImg.src = values.file.NOT_READY_ICON;
  };
  // create connected icon
  if (playerData.connected) {
    connectedImg.src = values.file.CONNECTED_ICON;
  } else {
    connectedImg.src = values.file.NOT_CONNECTED_ICON;
  };
  // add in player's name
  textSpan.textContent = playerName;

  li.appendChild(readyImg);
  li.appendChild(connectedImg);
  li.appendChild(textSpan);

  return li;
}
