//Erases from canvas
tool("eraser",true)

var initial
eventFunction("eraser","mousedown", function(x0,y0,e) {
    initial = saveStates();
    let x1 = e.offsetX;
    let y1 = e.offsetY;
    ctx.strokeStyle = "#FFFFFF";
    ctx.fillStyle = "#FFFFFF";
    lineWidth = 1;
	ctx.globalCompositeOperation = 'destination-out'; //Erases and actually clears the portion rather than fill white
    ctx.beginPath();
    ctx.arc(x1,y1,brushSize/2, 0, 2 * Math.PI);
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
    ctx.strokeStyle = "#FFFFFF";
    ctx.fillStyle = "#FFFFFF";
	ctx.globalCompositeOperation = 'destination-out'; //Erases and actually clears the portion rather than fill white
    ctx.beginPath();
    ctx.arc(x1,y1,brushSize/2, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(x0,y0);
    ctx.lineTo(x1,y1);
    ctx.lineWidth = brushSize;
    ctx.stroke();
    ctx.lineWidth = 1;
    ctx.closePath();
    ctx.globalCompositeOperation = "source-over";
}, function(e) {
    ctx.moveTo(e.offsetX,e.offsetY);
});

eventFunction("eraser", "mouseup", function(x0,y0,e) {
    //History
    addHistory([["canvas",[initial,saveStates()]]]);
});
//=============================For the dotted circle effect=========================
cursor("eraser", function(e) {
    cursorCtx.save();
    cursorCtx.setLineDash([]);
    cursorCtx.beginPath();
    cursorCtx.arc(e.offsetX,e.offsetY,brushSize/2 + 1,0,2 *Math.PI);
    cursorCtx.closePath();
    cursorCtx.strokeStyle = "#000000";
    cursorCtx.stroke();
    cursorCtx.restore();

})
