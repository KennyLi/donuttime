tool("select",true)

var startX
var startY
var startXO
var startXY
var rectW
var rectH
var imageData
var drag = false
var xDis
var yDis
var originalID
var imgData
var selCanvas
var initial;
eventFunction("select", "mousedown", function(x0,y0,e){
    if(!drag){
        let x1 = e.offsetX;
        let y1 = e.offsetY;
        startX = x1
        startY = y1
        imageData = ctx.getImageData(0,0,canvas.width,canvas.height)
        originalID = ctx.getImageData(0,0,canvas.width,canvas.height)
        initial = saveStates();
    }
    else{
        if(rectW < 0 && rectH < 0){
            if(e.offsetX < startX && e.offsetX > startX + rectW && e.offsetY < startY && e.offsetY > startY + rectH){
                ctx.putImageData(originalID,0,0)
                imgData = ctx.getImageData(startX,startY,rectW,rectH)
                drag = true;
                xDis = e.offsetX - startX - rectW
                yDis = e.offsetY - startY - rectH
                startXO = startX
                startYO = startY
            }
            else{
                ctx.putImageData(originalID,0,0)
                drag = false
                let x1 = e.offsetX;
                let y1 = e.offsetY;
                startX = x1
                startY = y1
            }
        }
        else if (rectW < 0 && rectH > 0) {
            if(e.offsetX < startX && e.offsetX > startX + rectW && e.offsetY > startY && e.offsetY < startY + rectH){
                ctx.putImageData(originalID,0,0)
                imgData = ctx.getImageData(startX,startY,rectW,rectH)
                drag = true;
                xDis = e.offsetX - startX - rectW
                yDis = e.offsetY - startY
                startXO = startX
                startYO = startY
            }
            else{
                ctx.putImageData(originalID,0,0)
                drag = false
                let x1 = e.offsetX;
                let y1 = e.offsetY;
                startX = x1
                startY = y1
            }
        }
        else if(rectW > 0 && rectH < 0){
            if(e.offsetX > startX && e.offsetX < startX + rectW && e.offsetY < startY && e.offsetY > startY + rectH){
                ctx.putImageData(originalID,0,0)
                imgData = ctx.getImageData(startX,startY,rectW,rectH)
                drag = true;
                xDis = e.offsetX - startX
                yDis = e.offsetY - startY - rectH
                startXO = startX
                startYO = startY
            }
            else{
                ctx.putImageData(originalID,0,0)
                drag = false
                let x1 = e.offsetX;
                let y1 = e.offsetY;
                startX = x1
                startY = y1
            }
        }
        else{
            if(e.offsetX > startX && e.offsetX < startX + rectW && e.offsetY > startY && e.offsetY < startY + rectH){
                ctx.putImageData(originalID,0,0)
                imgData = ctx.getImageData(startX,startY,rectW,rectH)
                drag = true;
                xDis = e.offsetX - startX
                yDis = e.offsetY - startY
                startXO = startX
                startYO = startY
            }
            else{
                ctx.putImageData(originalID,0,0)
                drag = false
                let x1 = e.offsetX;
                let y1 = e.offsetY;
                startX = x1
                startY = y1
            }
        }
    }
});
eventFunction("select", "mouseup", function(x0,y0,e){
    if(!drag){
        drag = true
    }
    else if(drag){
        drag = false;
        originalID = ctx.getImageData(0,0,canvas.width,canvas.height)
        //History
        addHistory([["canvas",[initial,saveStates()]]]);
    }
});
eventFunction("select", "mousemove", function(x0,y0,e){
    if (!(mousedown) || x0 == undefined || y0 == undefined) {
        return
    }
    if(!drag){
        ctx.strokeStyle = "#000000"
        ctx.moveTo(x0,y0);
        let x1 = e.offsetX;
        let y1 = e.offsetY;
        rectW = x1 - startX
        rectH = y1 - startY
        ctx.lineWidth = 1;
        ctx.beginPath()
        ctx.clearRect(0,0,canvas.width,canvas.height)
        ctx.lineJoin = 'miter';
        ctx.putImageData(imageData,0,0)
        ctx.rect(startX,startY,rectW, rectH);
        ctx.stroke();
    }
    else{
        startX = e.offsetX - xDis
        startY = e.offsetY - yDis
        ctx.putImageData(originalID,0,0)
        ctx.clearRect(startXO,startYO,rectW,rectH)
        selCanvas = document.createElement("canvas")
        selCanvas.width = canvas.width
        selCanvas.height = canvas.height
        selCtx = selCanvas.getContext("2d")
        selCtx.putImageData(imgData,startX,startY)
        ctx.drawImage(selCanvas,0,0)
    }
});
cursor("select", function(e) {
    cursorCtx.save();
    cursorCtx.setLineDash([]);
    cursorCtx.beginPath();
    cursorCtx.arc(e.offsetX,e.offsetY, 1,0,2 *Math.PI);
    cursorCtx.closePath();
    cursorCtx.strokeStyle = "#000000";
    cursorCtx.stroke();
    cursorCtx.restore();
})
