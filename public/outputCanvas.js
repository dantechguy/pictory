function showDrawing(drawingData, instant, customElementId) {
  let canvasId = customElementId ||
    (values.dom[state === values.state.DRAW ? 'inputCanvasPrompt' : 'showCanvasPrompt'].attributes.id);
  let canvas = document.getElementById(canvasId);
  let context = canvas.getContext('2d');
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.imageSmoothingEnabled = false;
  context.lineJoin = 'round';
  context.lineCap = 'round';

  let size = {width: canvas.width, height: canvas.height};
  let totalPoints = totalPointsInDraw(drawingData);

  if (instant) {
    drawData(drawingData, context, size, {stroke: 0, point: 0}, totalPoints);
  } else {
    requestAnimationFrame(() => {
      let timePerPoint = values.time.DRAW_DELAY / totalPoints;
      drawDataDelay(drawingData, context, size, timePerPoint, new Date());
    });
  }
}

function totalPointsInDraw(drawingData) {
  let total = 0;
  for (let strokeIndex=0, n=drawingData.length; strokeIndex<n; strokeIndex++) {
    let stroke = drawingData[strokeIndex];
    let points = stroke.points;
    total += points.length;
  };
  return total;
}

function drawDataDelay(drawingData, context, size, timePerPoint, previousDrawTime, newStartSliceIndex) {
  let startSliceIndex = newStartSliceIndex || {stroke: 0, point: 0};
  let currentTime = new Date();
  let timePassedSincePreviousDraw = currentTime - previousDrawTime;
  let maxPointsToDraw = Math.ceil(timePassedSincePreviousDraw / timePerPoint);
  let nextSliceData = increaseDrawingDataIndex(drawingData, startSliceIndex, maxPointsToDraw);
  let nextSliceIndex = nextSliceData.sliceIndex;
  let endSliceData = increaseDrawingDataIndex(drawingData, nextSliceIndex, 1);
  let endSliceIndex = endSliceData.sliceIndex;
  let pointsToDraw = nextSliceData.pointsToDraw + endSliceData.pointsToDraw;

  drawData(drawingData, context, size, startSliceIndex, pointsToDraw)

  if (!atEndOfDrawingData(drawingData, endSliceIndex)) {
    requestAnimationFrame(() => {
      // overlap current endSliceIndex and next startSliceIndex, so that stroke points are joined
      drawDataDelay(drawingData, context, size, timePerPoint, currentTime, nextSliceIndex);
    });
  };
}

function atEndOfDrawingData(drawingData, sliceIndex) {
  return sliceIndex.stroke === drawingData.length-1
    && sliceIndex.point === drawingData[sliceIndex.stroke].points.length-1;
}

function increaseDrawingDataIndex(drawingData, startSliceIndex, pointsToDraw) {
  let stroke, pointsLeftInStroke, endSliceIndex = {...startSliceIndex}, pointsDrawn = 0;
  while (pointsDrawn < pointsToDraw) {
    stroke = drawingData[endSliceIndex.stroke];
    pointsLeftInStroke = stroke.points.length-1 - endSliceIndex.point;
    pointsToRemove = Math.min(pointsLeftInStroke, pointsToDraw-pointsDrawn);

    pointsDrawn += pointsToRemove;
    endSliceIndex.point += pointsToRemove;

    // if no more points to draw, or reached end of drawingData, end
    if (pointsDrawn === pointsToDraw || atEndOfDrawingData(drawingData, endSliceIndex)) {
      break;
    } else { // if still points to draw, and not at end of drawingData
      endSliceIndex.stroke++;
      endSliceIndex.point = 0;
      pointsDrawn++; // moving to the next stroke counts as moving one point
    };
  };
  return {sliceIndex: endSliceIndex, pointsToDraw: pointsDrawn};
}



function drawData(drawingData, context, size, startSliceIndex, pointsToDraw) {

  for (let strokeIndex=startSliceIndex.stroke; pointsToDraw>0; strokeIndex++) {
    let stroke = drawingData[strokeIndex];
    let points = stroke.points;

    // set thickness and colour
    context.lineWidth = values.drawing.big[stroke.type.big];
    context.strokeStyle = values.drawing.dark[stroke.type.dark];

    if (points.length === 0) { // only one point, a dot
      context.beginPath();
      context.arc(points[0].x * size.width, points[0].y * size.height, values.drawing.big[stroke.type.big]/16, 0, 2*Math.PI);
      context.stroke();
    } else { // a line
      context.beginPath();
      let startPointIndex = strokeIndex === startSliceIndex.stroke ? startSliceIndex.point : 0;
      context.moveTo(points[startPointIndex].x * size.width, points[startPointIndex].y * size.height);

      for (let pointIndex=startPointIndex; pointsToDraw>0 && pointIndex<points.length; pointIndex++) {
        let point = points[pointIndex];
        context.lineTo(point.x * size.width, point.y * size.height);
        pointsToDraw--;
      };
      context.stroke();
    };
  };
}
