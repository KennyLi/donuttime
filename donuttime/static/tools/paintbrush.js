// paintbrush using points and bezier curves
tool("paintbrush", true);

//Save the points to make smooth bezier curve
pointsToDraw = [];
var initial;
var mdpnt = (p0, p1) => {
    return [(p0[0] + p1[0]) / 2, (p1[1] + p0[1]) / 2];
}

//A save of how the image looked before the click
var paintSave = undefined;

//When mouse is clicked, save the canvas, and draw a dot
eventFunction("paintbrush", "mousedown", (x0, y0, e) => {
    initial = saveStates();
    ctx.fillStyle = `rgba(${color.join(',')})`;
    paintSave = canvas.toDataURL();
    ctx.beginPath();
    ctx.arc(e.offsetX,e.offsetY,brushSize/2, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();
    pointsToDraw.push([e.offsetX, e.offsetY]);
});

//When moved
eventFunction("paintbrush", "mousemove", function (x0, y0, e) {
    if (!(mousedown) || x0 == undefined || y0 == undefined) {
        return
    }

    pointsToDraw.push([e.offsetX, e.offsetY]); //add the point

    ctx.beginPath();
    ctx.moveTo(pointsToDraw[0], pointsToDraw[1]); //Draw a beizer curve with all the saved points

    var start = pointsToDraw[0];
    var next = pointsToDraw[1];
    for (var i = 1; i < pointsToDraw.length; i++){

        var mid = mdpnt(start, next);
        ctx.quadraticCurveTo(start[0], start[1], mid[0], mid[1])
        start = pointsToDraw[i];
        next = pointsToDraw[i + 1];
    }
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.lineWidth = brushSize;
    ctx.strokeStyle = `rgba(${color.join(',')})`;
    //clear the last curve drawn and draw the newer one
    let img = document.createElement("img");
    img.src = paintSave;
    ctx.globalCompositeOperation = "copy";
    ctx.drawImage(img, 0, 0);
    ctx.globalCompositeOperation = "source-over";
    //draw the curve
    ctx.stroke();
    ctx.lineWidth = 1;
}, function (e) {
    ctx.moveTo(e.offsetX,e.offsetY);
});

eventFunction('paintbrush', 'mouseup', (x0, y0, e) => {
    pointsToDraw.length = 0;
    ctx.beginPath();
    paintSave = undefined;

    //History
    addHistory([["canvas",[initial,saveStates()]]]);
});

//Default tool
var el = document.createEvent('Events');
el.initEvent("click", true, false);
buttons["paintbrush"].dispatchEvent(el);

//Cursor
cursor("paintbrush", function(e) {
    cursorCtx.save();
    cursorCtx.setLineDash([]);
    cursorCtx.beginPath();
    cursorCtx.arc(e.offsetX,e.offsetY,brushSize/2 + 1,0,2 *Math.PI);
    cursorCtx.closePath();
    cursorCtx.strokeStyle = "#000000";
    cursorCtx.stroke();
    cursorCtx.restore();
})
