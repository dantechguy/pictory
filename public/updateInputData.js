/* global client variables
state
data
*/

function updateInputData() {
  switch(state) {

    case values.state.LOBBY:
      let nameElementId = values.dom.name.attributes.id;
      let roomIdElementId = values.dom.name.attributes.id;
      let nameElement = document.getElementById(nameElementId);
      let roomIdElement = document.getElementById(roomIdElementId);
      data = {
        name: nameElement.value,
        roomId: roomIdElement.value,
      };
      break;

    case values.state.IDEA || values.state.GUESS:
      let inputTextPromptElementId = values.dom.inputTextPrompt.attributes.id;
      let inputTextPromptElement = document.getElementById(inputTextPromptElementId);
      data = {
        data: inputPromptElement.value,
      }
      break;

    // canvas input does not need to be updated
    // as it automatically uses 'data' as its src
  }
}
