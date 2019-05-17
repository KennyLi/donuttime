//Pencil tool that gets passed in events
tool("pencil",true)

eventFunction("pencil", "mousedown", function (x0, y0, e) {
    ctx.beginPath();
    ctx.moveTo(x0, y0);
});

eventFunction("pencil", "mousemove", function (x0, y0, e) {
    if (!(mousedown) || x0 == undefined || y0 == undefined) {
        return
    }
    ctx.moveTo(x0,y0);
    let x1 = e.offsetX;
    let y1 = e.offsetY;
    ctx.lineWidth = 1;
    ctx.strokeStyle = `rgba(${color.join(',')})`;
    ctx.lineTo(x1, y1);
    ctx.stroke();
}, function (e) {
    ctx.moveTo(e.offsetX,e.offsetY);
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