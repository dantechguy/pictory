function newStroke(event) {
  submitData.push({type:{...canvasData.type}, points:[]});
}

function newPoint() {
  let point = getTouchCoordinates(event);
  submitData[submitData.length-1].points.push(point);
  showDrawing(submitData, true);
}

function touchStart(event) {
  canvasData.mouseDown = true;
  event.preventDefault();
  newStroke(event)
  newPoint(event);
}

function touchMove(event) {
  if (canvasData.mouseDown) {
    event.preventDefault();
    newPoint(event);
  };
}

function touchEnd(event) {
  canvasData.mouseDown = false;
  event.preventDefault();
}

function clearDrawing() {
  if (confirm(values.text.CLEAR_DRAWING_CONFIRM)) {
    submitData = JSON.parse(JSON.stringify(values.defaultData.draw));
    showDrawing(submitData, true);
  };
}

function undoStroke() {
  submitData.pop();
  showDrawing(submitData, true);
}

function penColour() {
  canvasData.type.dark = !canvasData.type.dark;
  let penColour = document.getElementById(values.dom.penColour.attributes.id);
  if (canvasData.type.dark) {
    penColour.style.backgroundImage = "url('dark.svg')";
  } else {
    penColour.style.backgroundImage = "url('light.svg')";
  };
}

function penSize() {
  canvasData.type.big = !canvasData.type.big;
  let penSize = document.getElementById(values.dom.penSize.attributes.id);
  if (canvasData.type.big) {
    penSize.style.backgroundImage = "url('thick.svg')";
  } else {
    penSize.style.backgroundImage = "url('thin.svg')";
  };
}

function getTouchCoordinates(event) {
  let point = event.touches ? event.touches[0] : event;
  let canvasElement = document.getElementById(values.dom.inputCanvasPrompt.attributes.id);
  // pageY is from top of page content (include scrolling)
  // divided by width to get value 0-1 for x and y
  return {
    x: (point.pageX - canvasElement.offsetLeft) / canvasElement.clientWidth,
    y: (point.pageY - canvasElement.offsetTop) / canvasElement.clientHeight,
  };
}

function setupCanvas() {
  submitData = JSON.parse(JSON.stringify(values.defaultData.draw));

  canvasData = {
    type: {big:false, dark:true},
    mouseDown: false,
  };
}
