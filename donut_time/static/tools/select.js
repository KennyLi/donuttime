tool("select",true)

var startX
var startY
var rectW
var rectH
var select = false
var imageData
var originalID
var imgData
eventFunction("select", "mousedown", function(x0,y0,e){
    if(!select){
        let x1 = e.offsetX;
        let y1 = e.offsetY;
        startX = x1
        startY = y1
        imageData = ctx.getImageData(0,0,canvas.width,canvas.height)
        originalID = ctx.getImageData(0,0,canvas.width,canvas.height)
    }
    else{
        if(rectW < 0 && rectH < 0){
            if(e.offsetX < startX && e.offsetX > startX + rectW && e.offsetY < startY && e.offsetY > startY + rectH){
                imgData = ctx.getImageData(startX,startY,startX + rectW, startY + rectH)
                
            }
            else{
                ctx.putImageData(originalID,0,0)
                select = false
                let x1 = e.offsetX;
                let y1 = e.offsetY;
                startX = x1
                startY = y1
            }
        }
        else if (rectW < 0 && rectH > 0) {
            if(e.offsetX < startX && e.offsetX > startX + rectW && e.offsetY > startY && e.offsetY < startY + rectH){
                imgData = ctx.getImageData(startX,startY,startX + rectW, startY + rectH)
            }
            else{
                ctx.putImageData(originalID,0,0)
                select = false
                let x1 = e.offsetX;
                let y1 = e.offsetY;
                startX = x1
                startY = y1
            }
        }
        else if(rectW > 0 && rectH < 0){
            if(e.offsetX > startX && e.offsetX < startX + rectW && e.offsetY < startY && e.offsetY > startY + rectH){
                imgData = ctx.getImageData(startX,startY,startX + rectW, startY + rectH)
            }
            else{
                ctx.putImageData(originalID,0,0)
                select = false
                let x1 = e.offsetX;
                let y1 = e.offsetY;
                startX = x1
                startY = y1
            }
        }
        else{
            if(e.offsetX > startX && e.offsetX < startX + rectW && e.offsetY > startY && e.offsetY < startY + rectH){
                imgData = ctx.getImageData(startX,startY,startX + rectW, startY + rectH)
            }
            else{
                ctx.putImageData(originalID,0,0)
                select = false
                let x1 = e.offsetX;
                let y1 = e.offsetY;
                startX = x1
                startY = y1
            }
        }
    }
});
eventFunction("select", "mouseup", function(x0,y0,e){
    select = true
});
eventFunction("select", "mousemove", function(x0,y0,e){
    if (!(mousedown) || x0 == undefined || y0 == undefined) {
        return
    }
    if(!select){
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
