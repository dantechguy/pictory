function generateReplay() {
  for (let i=0, n=promptData.length; i<n; i++) {
    let item = promptData[i];
    let prompt = item.prompt;
    let name = item.name;

    let isText = typeof prompt === 'string';
    let elementName = isText ? 'showTextPrompt' : 'showCanvasPrompt';

    // the overall one container for all content
    let replayContainerId = values.dom.CONTAINER_ID_PREFIX + values.dom.replay.attributes.id;
    // the name of the user who created the prompt
    let nameElementId = createElement('replayName', replayContainerId, i);
    let nameElement = document.getElementById(nameElementId);
    nameElement.textContent = name + values.text[isText ? 'TEXT_PROMPT_SUFFIX' : 'CANVAS_PROMPT_SUFFIX'];
    // the prompt data element
    let promptElementId = createElement(elementName, replayContainerId, i);
    // adds prompt data to element
    if (isText) {
      document.getElementById(promptElementId).textContent = prompt;
    } else {
      showDrawing(prompt, false, promptElementId);
    }
  }
}
