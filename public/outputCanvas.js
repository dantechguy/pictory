function showDrawing(instant) {
  let canvasElement = document.getElementById(values.dom.inputCanvasPrompt)
    || let canvasElement = document.getElementById(values.dom.showCanvasPrompt);
  let context = canvasElement.getContext('2d');
  context.lineJoin = 'round';
  content.lineCap = 'round';
  let width = canvasElement.clientWidth;
  let height = canvasElement.clientHeight;

  data.forEach((stroke) => {
    let points = stroke.points;

    // set thickness and colour
    context.lineWidth = values.drawing.big[stroke.type.big];
    context.strokeStyle = values.drawing.dark[stroke.type.dark];

    // initial point, for dots
    context.beginPath();
    context.arc(points[0].x, points[0].y, values.drawing.big[stroke.type]/2, 0, 2 * Math.PI);
    context.fill();

    // rest of line
    context.beginPath();
    context.moveTo(data[0].x * width, data[0].y * height);
    points.slice(1).forEach((point, index) => {
      if (!instant) {

      }
      context.lineTo(point.x * width, point.y * height);
    });
    context.stroke();
  });

}
