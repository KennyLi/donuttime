tool("crop",true)


var startX
var startY
var imageData
var imgData
var cw
var ch
var initial
eventFunction("crop", "mousedown", function(x0,y0,e){
  let x1 = e.offsetX;
  let y1 = e.offsetY;
  startX = x1
  startY = y1
  imageData = ctx.getImageData(0,0,canvas.width,canvas.height)

  //Keeping track of history
  initial = saveStates()
  cw = canvas.width;
  ch = canvas.height;
});
eventFunction("crop", "mouseup", function(x0,y0,e){
    imgData = []
    if(startX > e.offsetX){
        if(startY > e.offsetY){
            for(var i = 0;i < canvasesOrdering.length; i++){
                imgData.push(canvases[i].getContext("2d").getImageData(startX - 1 ,startY - 1,e.offsetX - startX + 2, e.offsetY - startY + 2))
            }
        }
        else{
            for(var i = 0;i < canvasesOrdering.length; i++){
                imgData.push(canvases[i].getContext("2d").getImageData(startX - 1,startY + 1,e.offsetX - startX + 2, e.offsetY - startY - 2))
            }
        }
    }
    else{
        if(startY > e.offsetY){
            for(var i = 0;i < canvasesOrdering.length; i++){
                imgData.push(canvases[i].getContext("2d").getImageData(startX + 1,startY - 1,e.offsetX - startX - 2, e.offsetY - startY + 2))
            }
        }
        else{
            for(var i = 0;i < canvasesOrdering.length; i++){
                imgData.push(canvases[i].getContext("2d").getImageData(startX + 1,startY + 1,e.offsetX - startX - 2, e.offsetY - startY - 2));
            }
        }
    }
    ctx.clearRect(0,0,canvas.width,canvas.height)
    for(var i = 0; i < canvasesOrdering.length;i++){
        reSize(canvases[i],imgData[i].width,imgData[i].height)
    }
    reSize(bkg,canvas.width,canvas.height)
    if(bgColor == "White"){
        bCtx.fillStyle = "#FFFFFF"
        bCtx.fillRect(0, 0, canvas.width, canvas.height)
    }
    else{
        bCtx.fillStyle = "rgba(0,0,0,0)"
        bCtx.fillRect(0, 0, canvas.width, canvas.height)
        bCtx.drawImage(bImg, 0,0,bkg.width,bkg.height);
    }
    for(var i = 0; i < canvasesOrdering.length;i++){
        canvases[i].getContext("2d").putImageData(imgData[i],0,0)
    }
    reSize(cursorCanvas,canvas.width,canvas.height)

    //History
    let allActions = [];
    allActions.push(["resize",[cw,ch,canvas.width,canvas.height]])
    allActions.push(["canvas",[initial,saveStates()]])
    addHistory(allActions)
});
eventFunction("crop", "mousemove", function(x0,y0,e){
    if (!(mousedown) || x0 == undefined || y0 == undefined) {
        return
    }
    ctx.strokeStyle = "#000000"
    ctx.moveTo(x0,y0);
    let x1 = e.offsetX;
    let y1 = e.offsetY;
    ctx.lineWidth = 1;
    ctx.beginPath()
    ctx.clearRect(0,0,canvas.width,canvas.height)
    ctx.lineJoin = 'miter';
    ctx.putImageData(imageData,0,0)
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
