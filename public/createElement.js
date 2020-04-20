function createElement (type) {
  elementData = values.dom[type];

  let containerId = `.${values.dom.CONTAINER_ID_PREFIX}${elementData.id}`;
  let elementContainer = document.getElementById(containerId);

  let element = document.createElement(elementData.ELEMENT);

  let dataKeys = Object.keys(elementData);
  for (let i=0; i<dataKeys.length; i++) { // set attributes
    key = dataKeys[i];
    element[key] = elementData[key];
  }

  elementContainer.appendChild(element);
}
