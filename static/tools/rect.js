tool("rect", true)

var startX
var startY
var imgData
var drag = false
eventFunction("rect", "mousedown", function(x0,y0,e){
  let x1 = e.offsetX;
  let y1 = e.offsetY;
  startX = x1
  startY = y1
  imgData = ctx.getImageData(0,0,canvas.width,canvas.height)
  drag = true
});
eventFunction("rect", "mouseup", function(x0,y0,e){
  drag = false
});
eventFunction("rect", "mousemove", function(x0,y0,e){
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
    ctx.strokeStyle = `rgba(${color.join(',')})`;
    ctx.putImageData(imgData,0,0)
    ctx.rect(startX,startY,x1 - startX, y1 - startY)
    ctx.stroke();
});
cursor("rect", function(e) {
    cursorCtx.save();
    cursorCtx.setLineDash([]);
    cursorCtx.beginPath();
    cursorCtx.arc(e.offsetX,e.offsetY, 1,0,2 *Math.PI);
    cursorCtx.closePath();
    cursorCtx.strokeStyle = "#000000";
    cursorCtx.stroke();
    cursorCtx.restore();
})
