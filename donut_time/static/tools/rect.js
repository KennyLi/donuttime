tool("rectangle", true)

var startX
var startY
var imgData
var drag = false
var initial
eventFunction("rectangle", "mousedown", function(x0,y0,e){
    initial = saveStates();
  let x1 = e.offsetX;
  let y1 = e.offsetY;
  startX = x1
  startY = y1
  imgData = ctx.getImageData(0,0,canvas.width,canvas.height)
  drag = true
});
eventFunction("rectangle", "mouseup", function(x0,y0,e){
  drag = false
  //History
  addHistory([["canvas",[initial,saveStates()]]]);
});
eventFunction("rectangle", "mousemove", function(x0,y0,e){
    if (!(mousedown) || x0 == undefined || y0 == undefined) {
        return
    }
    ctx.moveTo(x0,y0);
    let x1 = e.offsetX;
    let y1 = e.offsetY;
    ctx.lineWidth = 1;
    ctx.beginPath()
    ctx.clearRect(0,0,canvas.width,canvas.height)
    ctx.fillStyle = `rgba(${color.join(',')})`;
    ctx.lineWidth = brushSize;
    ctx.lineJoin = 'miter';
    ctx.strokeStyle = `rgba(${color.join(',')})`;
    ctx.putImageData(imgData,0,0)
    if (16 in keysPressed) {  //If shift is pressed, draw a square
        let a = x1 - startX;
        let b = y1 - startY;
        let m = Math.min(Math.abs(a),Math.abs(b));
        ctx.rect(startX,startY,m * Math.sign(a), m * Math.sign(b));

    } else {
        ctx.rect(startX,startY,x1 - startX, y1 - startY);
    }
    if (cornerbox.checked) {
        ctx.lineJoin = 'round';
    }
    if (fillbox.checked) {
        ctx.fill();
    } else {
	ctx.stroke();
    }
});
cursor("rectangle", function(e) {
    cursorCtx.save();
    cursorCtx.setLineDash([]);
    cursorCtx.beginPath();
    cursorCtx.arc(e.offsetX,e.offsetY, 1,0,2 *Math.PI);
    cursorCtx.closePath();
    cursorCtx.strokeStyle = "#000000";
    cursorCtx.stroke();
    cursorCtx.restore();
})
