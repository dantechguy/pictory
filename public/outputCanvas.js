function showDrawing(drawingData, instant, customElementId) {
  let canvasId = customElementId ||
    (values.dom[state === values.state.DRAW ? 'inputCanvasPrompt' : 'showCanvasPrompt'].attributes.id);
  let canvas = document.getElementById(canvasId);
  let context = canvas.getContext('2d');
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.lineJoin = 'round';
  context.lineCap = 'round';

  let cumulativeDelay = 0;
  let size = {width: canvas.width, height: canvas.height};
  let delay = instant ? 0 : values.drawing.duration / totalPointsInDraw(drawingData);

  // drawingData.forEach((stroke) => {
  for (let i=0, n=drawingData.length; i<n; i++) {
    let stroke = drawingData[i];

    if (delay === 0) {
      drawStroke(stroke, context, size, delay);
    } else {
      setTimeout(
        () => drawStroke(stroke, context, size, delay),
        cumulativeDelay,
      );
      cumulativeDelay += stroke.points.length * delay;
    };

  };
}

function drawStroke(stroke, context, size, delay) {
  let points = stroke.points;
  let type = stroke.type;

  // set thickness and colour
  context.lineWidth = values.drawing.big[type.big];
  context.strokeStyle = values.drawing.dark[type.dark];

  // initial point, for dots
  context.beginPath();
  context.arc(points[0].x * size.width, points[0].y * size.height, values.drawing.big[stroke.type.big]/16, 0, 2*Math.PI);
  context.stroke();

  // rest of line
  if (delay === 0) {
    instantStroke(points, context, size);
  } else {
    delayStroke(points, context, size, delay, type);
  }
}

function instantStroke(points, context, size) {
  context.beginPath();
  context.moveTo(points[0].x * size.width, points[0].y * size.height);
  for (let i=0, n=points.length; i<n; i++) {
    let point = points[i];
    context.lineTo(point.x * size.width, point.y * size.height);
  };
  context.stroke();
}

function delayStroke(points, context, size, delay, type) {
  context.lineWidth = values.drawing.big[type.big];
  context.strokeStyle = values.drawing.dark[type.dark];
  for (let i=1, n=points.length; i<n; i++) {
    let previousPoint = points[i-1];
    let point = points[i];
    setTimeout(
      () => {
        context.beginPath();
        context.moveTo(previousPoint.x * size.width, previousPoint.y * size.height);
        context.lineTo(point.x * size.width, point.y * size.height);
        context.stroke();
      },
      delay * i,
    );
  };
}

function totalPointsInDraw(drawingData) {
  let total = 0;
  for (let strokeI=0, n=drawingData.length; strokeI<n; strokeI++) {
    let stroke = drawingData[strokeI];
    let points = stroke.points;
    for (let pointI=0, m=points.length; pointI<m; pointI++) {
      total ++;
    };
  };
  return total;
}
