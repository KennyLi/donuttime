tool("ellipse", true)

var startX
var startY
var imgData
var drag = false
eventFunction("ellipse", "mousedown", function(x0,y0,e){
  let x1 = e.offsetX;
  let y1 = e.offsetY;
  startX = x1
  startY = y1
  imgData = ctx.getImageData(0,0,canvas.width,canvas.height)
  drag = true
});
eventFunction("ellipse", "mouseup", function(x0,y0,e){
  drag = false
});
eventFunction("ellipse", "mousemove", function(x0,y0,e){
    if (!(mousedown) || x0 == undefined || y0 == undefined) {
        return
    }
    ctx.moveTo(x0,y0);
    let x1 = e.offsetX;
    let y1 = e.offsetY;
    ctx.lineWidth = 1;
    ctx.beginPath()
    ctx.clearRect(0,0,canvas.width,canvas.height)
    ctx.fillStyle = "#FFFFFF"
    ctx.lineWidth = brushSize;
    ctx.strokeStyle = `rgba(${color.join(',')})`;
    ctx.putImageData(imgData,0,0);
    if (16 in keysPressed) {  //If shift is pressed, draw a square
        let a = x1 - startX;
        let b = y1 - startY;
        let m = Math.min(Math.abs(a),Math.abs(b));
        ctx.ellipse(startX,startY,m,m, 0, 0, 2 * Math.PI)
    } else {
        ctx.ellipse(startX,startY,Math.abs(x1 - startX),Math.abs(y1 - startY), 0, 0, 2 * Math.PI)
    }
    ctx.stroke();
});
cursor("ellipse", function(e) {
    cursorCtx.save();
    cursorCtx.setLineDash([]);
    cursorCtx.beginPath();
    cursorCtx.arc(e.offsetX,e.offsetY, 1,0,2 *Math.PI);
    cursorCtx.closePath();
    cursorCtx.strokeStyle = "#000000";
    cursorCtx.stroke();
    cursorCtx.restore();
})
