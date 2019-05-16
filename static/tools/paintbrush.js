// paintbrush using points and bezier curves
tool("paintbrush", true);

pointsToDraw = [];

var mdpnt = (p0, p1) => {
    return [(p0[0] + p1[0]) / 2, (p1[1] + p0[1]) / 2];
}

eventFunction("paintbrush", "mousedown", (x0, y0, e) => {
    pointsToDraw.push([e.offsetX, e.offsetY]);
});

eventFunction("paintbrush", "mousemove", function (x0, y0, e) {
    if (!(mousedown) || x0 == undefined || y0 == undefined) {
        return
    }
    pointsToDraw.push([e.offsetX, e.offsetY]);
    
    ctx.beginPath();
    ctx.moveTo(pointsToDraw[0], pointsToDraw[1]);

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
    ctx.strokeStyle = color;
    ctx.lineTo(start[0], start[1]);
    ctx.stroke();

}, function (e) {
    ctx.moveTo(e.offsetX,e.offsetY);
});

eventFunction('paintbrush', 'mouseup', (x0, y0, e) => {
    pointsToDraw.length = 0;
    ctx.beginPath();
});

