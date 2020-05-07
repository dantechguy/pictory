function generateReplay() {
  for (let i=0, n=promptData.length; i<n; i++) {
    let item = promptData[i];
    let prompt = item.prompt;
    let name = item.name;

    let isText = typeof prompt === 'string';
    let elementName = isText ? 'showTextPrompt' : 'showCanvasPrompt';

    let replayContainer = document.getElementById(values.dom.CONTAINER_ID_PREFIX + values.dom.replay.attributes.id)
    let container = document.createElement('div');
    let elementId = values.dom[elementName].attributes.id + '-' + i;
    let containerId = values.dom.CONTAINER_ID_PREFIX + elementId;
    let nameElement = document.createElement('div');
    nameElement.textContent = name;
    container.appendChild(nameElement);
    container.id = containerId;
    replayContainer.appendChild(container);
    createElement(elementName, elementId);
    promptElement = document.getElementById(elementId);
    if (isText) {
      promptElement.textContent = prompt;
    } else {
      showDrawing(prompt, false, elementId);
    }
    container.appendChild(promptElement);
  }
}
