function createElement (type, customElementId) {
  elementData = values.dom[type];

  let elementId = (customElementId || elementData.attributes.id);
  let containerId = values.dom.CONTAINER_ID_PREFIX + elementId;
  let elementContainer = document.getElementById(containerId);

  let element = document.createElement(elementData.ELEMENT);

  let attributeKeys = Object.keys(elementData.attributes);
  for (let i=0; i<attributeKeys.length; i++) { // set attributes
    key = attributeKeys[i];
    element[key] = elementData.attributes[key];
  }

  element.id = elementId; // set id incase of custom element id

  let functionAttributeKeys = Object.keys(elementData.functions || {});
  for (let i=0; i<functionAttributeKeys.length; i++) { // set attributes
    key = functionAttributeKeys[i];
    element[key] = window[elementData.functions[key]];
  }

  elementContainer.appendChild(element);
}
