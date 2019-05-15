//Pencil tool that gets passed in events
tool("pencil",true)

eventFunction("pencil", "mousedown", function (x0, y0, e) {
    ctx.beginPath();
    ctx.moveTo(x0, y0);
});

eventFunction("pencil", "mousemove", function (x0, y0, e) {
    if (!(mousedown)) {
        return
    }
    let x1 = e.offsetX;
    let y1 = e.offsetY;
    ctx.lineWidth = 1;
    ctx.strokeStyle = color;
    ctx.lineTo(x1, y1);
    ctx.stroke();
})
