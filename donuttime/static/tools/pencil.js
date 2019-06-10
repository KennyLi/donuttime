
// pencil using points and bezier curves
tool("pencil", true);

//Save the points to make smooth bezier curve
pencilToDraw = [];
var initial;
var mdpnt = (p0, p1) => {
    return [(p0[0] + p1[0]) / 2, (p1[1] + p0[1]) / 2];
}

//A save of how the image looked before the click
var pencilSave = undefined;

//When mouse is clicked, save the canvas, and draw a dot
eventFunction("pencil", "mousedown", (x0, y0, e) => {
    initial = saveStates();
    ctx.fillStyle = `rgba(${color.join(',')})`;
    pencilSave = canvas.toDataURL();
    ctx.beginPath();
    ctx.arc(e.offsetX,e.offsetY, 1, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();
    pencilToDraw.push([e.offsetX, e.offsetY]);
});

//When moved
eventFunction("pencil", "mousemove", function (x0, y0, e) {
    if (!(mousedown) || x0 == undefined || y0 == undefined) {
        return
    }

    pencilToDraw.push([e.offsetX, e.offsetY]); //add the point

    ctx.beginPath();
    ctx.moveTo(pencilToDraw[0], pencilToDraw[1]); //Draw a beizer curve with all the saved points

    var start = pencilToDraw[0];
    var next = pencilToDraw[1];
    for (var i = 1; i < pencilToDraw.length; i++){

        var mid = mdpnt(start, next);
        ctx.quadraticCurveTo(start[0], start[1], mid[0], mid[1])
        start = pencilToDraw[i];
        next = pencilToDraw[i + 1];
    }
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.lineWidth = 1;
    ctx.strokeStyle = `rgba(${color.join(',')})`;
    //clear the last curve drawn and draw the newer one
    let img = document.createElement("img");
    img.src = pencilSave;
    ctx.globalCompositeOperation = "copy";
    ctx.drawImage(img, 0, 0);
    ctx.globalCompositeOperation = "source-over";
    //draw the curve
    ctx.stroke();
    ctx.lineWidth = 1;
}, function (e) {
    ctx.moveTo(e.offsetX,e.offsetY);
});

eventFunction('pencil', 'mouseup', (x0, y0, e) => {
    pencilToDraw.length = 0;
    ctx.beginPath();
    pencilSave = undefined;

    //History
    addHistory([["canvas",[initial,saveStates()]]]);
});

//Cursor
cursor("pencil", function(e) {
    cursorCtx.save();
    cursorCtx.setLineDash([]);
    cursorCtx.beginPath();
    cursorCtx.arc(e.offsetX,e.offsetY, 1,0,2 *Math.PI);
    cursorCtx.closePath();
    cursorCtx.strokeStyle = "#000000";
    cursorCtx.stroke();
    cursorCtx.restore();
})
