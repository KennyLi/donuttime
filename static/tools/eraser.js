//Erases from canvas
tool("eraser",true)

eventFunction("eraser","mousedown", function(x0,y0,e) {
    let x1 = e.offsetX;
    let y1 = e.offsetY;
    ctx.strokeStyle = "#FF00FF";
    ctx.fillStyle = "#FF00FF";
    lineWidth = 1;
    ctx.globalCompositeOperation = 'destination-out'; //Erases and actually clears the portion rather than fill white
    ctx.beginPath();
    ctx.arc(x1,y1,20, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
    ctx.globalCompositeOperation = "source-over";
});

eventFunction("eraser","mousemove", function(x0,y0,e) {
    if (!(mousedown)) {
        return
    }
    let x1 = e.offsetX;
    let y1 = e.offsetY;
    ctx.strokeStyle = "#FF00FF";
    ctx.fillStyle = "#FF00FF";
    ctx.globalCompositeOperation = 'destination-out'; //Erases and actually clears the portion rather than fill white
    ctx.beginPath();
        ctx.arc(x1,y1,20, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
    ctx.beginPath();
        ctx.moveTo(x0,y0);
        ctx.lineTo(x1,y1);
        ctx.lineWidth = 40;
        ctx.stroke();
        ctx.lineWidth = 1;
    ctx.closePath();
    ctx.globalCompositeOperation = "source-over";
}, function(e) {
    ctx.moveTo(e.offsetX,e.offsetY);
});















//=============================For the dotted circle effect=========================
eraserCanvas = document.createElement("canvas");
eraserCtx = eraserCanvas.getContext("2d");
eraserCanvas.height = 720;
eraserCanvas.width = 1280;
eraserCanvas.className += " helpercanvas";
eraserCtx.setLineDash([5,3]);
content.addEventListener("mousemove", function(e) {
    eraserCtx.clearRect(0, 0, eraserCanvas.width, eraserCanvas.height);
    if (currentTool != 'eraser' || !(inCanvas(e,eraserCanvas))){
        return
    }
    eraserCtx.beginPath();
    eraserCtx.arc(e.offsetX,e.offsetY,21,0,2 *Math.PI);
    eraserCtx.closePath();
    eraserCtx.strokeStyle = "#000000";
    eraserCtx.stroke();

});
content.appendChild(eraserCanvas);
