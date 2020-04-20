function newStroke(event) {
  let type = data[data.length-1].type || {big:false, dark:true};
  data.push({type:type, points:[]});
}

function newPoint() {
  let point = getTouchCoordinates(event);
  data[data.length-1].points.push(point);
  showDrawing(true);
}

function touchStart(event) {
  event.preventDefault();
  if (!data) { // if data is empty
    newStroke(event)
  };
  newPoint(event);
}

function touchMove(event) {
  event.preventDefault();
  newPoint(event);
}

function touchEnd(event) {
  event.preventDefault();
  newStroke(event);
}

function getTouchCoordinates(event) {
  let touch = event.touches[0];
  let canvasElement = document.getElementById(values.dom.inputCanvasPrompt.attributes.id);
  // pageY is from top of page content (include scrolling)
  // divided by width to get value 0-1 for x and y
  return {
    x: (touch.pageX - canvasElement.pageX) / canvasElement.clientWidth,
    y: (touch.pageY - canvasElement.pageY) / canvasElement.clientHeight,
  };
}
