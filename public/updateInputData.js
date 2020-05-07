/* global client variables
state
data
*/
function updateInputData() {
  if (state === values.state.INDEX) {

    let nameInputDom = document.getElementById(values.dom.name.attributes.id);
    let roomIdInputDom = document.getElementById(values.dom.roomId.attributes.id);
    submitData = {
      name: nameInputDom.value,
      roomId: roomIdInputDom.value

    };
  } else if (state === values.state.IDEA || state == values.state.GUESS) {

    let inputTextPromptElement = document.getElementById(values.dom.inputTextPrompt.attributes.id);
    submitData = inputTextPromptElement.value;

  };

  // canvas input does not need to be updated
  // as it automatically uses 'data' as its storage
}
