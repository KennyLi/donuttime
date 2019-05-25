tool("crop",true)


var startX
var startY
var imgData
eventFunction("crop", "mousedown", function(x0,y0,e){
  let x1 = e.offsetX;
  let y1 = e.offsetY;
  startX = x1
  startY = y1
  imgData = ctx.getImageData(0,0,canvas.width,canvas.height)
});
eventFunction("crop", "mouseup", function(x0,y0,e){
    var imgData
    if(startX > e.offsetX){
        if(startY > e.offsetY){
            imgData = ctx.getImageData(startX - 1 ,startY - 1,e.offsetX - startX + 2, e.offsetY - startY + 2);
        }
        else{
            imgData = ctx.getImageData(startX - 1,startY + 1,e.offsetX - startX + 2, e.offsetY - startY - 2);
        }
    }
    else{
        if(startY > e.offsetY){
            imgData = ctx.getImageData(startX + 1,startY - 1,e.offsetX - startX - 2, e.offsetY - startY + 2);
        }
        else{
            imgData = ctx.getImageData(startX + 1,startY + 1,e.offsetX - startX - 2, e.offsetY - startY - 2);
        }
    }
    var newCanvas = document.createElement("canvas");
    newCanvas.width = imgData.width;
    newCanvas.height = imgData.height;
    newCanvas.getContext("2d").putImageData(imgData,0,0)
    ctx.clearRect(0,0,canvas.width,canvas.height)
    for (var i = 0; i < canvasesOrdering.length; i++) {
        canvasesOrdering[i].width = imgData.width;
        canvasesOrdering[i].height = imgData.height;
    }
    bkg.width = imgData.width;
    bkg.height = imgData.height;
    bCtx.drawImage(bImg, 0,0,bkg.width,bkg.height);
    ctx.drawImage(newCanvas,0,0)
});
eventFunction("crop", "mousemove", function(x0,y0,e){
    if (!(mousedown) || x0 == undefined || y0 == undefined) {
        return
    }
    ctx.moveTo(x0,y0);
    let x1 = e.offsetX;
    let y1 = e.offsetY;
    ctx.lineWidth = 1;
    ctx.beginPath()
    ctx.clearRect(0,0,canvas.width,canvas.height)
    ctx.lineJoin = 'miter';
    ctx.putImageData(imgData,0,0)
    ctx.rect(startX,startY,x1 - startX, y1 - startY);
    ctx.stroke();
});
cursor("crop", function(e) {
    cursorCtx.save();
    cursorCtx.setLineDash([]);
    cursorCtx.beginPath();
    cursorCtx.arc(e.offsetX,e.offsetY, 1,0,2 *Math.PI);
    cursorCtx.closePath();
    cursorCtx.strokeStyle = "#000000";
    cursorCtx.stroke();
    cursorCtx.restore();
})
