//Erases from canvas
tool("eraser")

eventFunction("eraser","mousedown", function(x0,y0,e) {
    ctx.beginPath();
    ctx.moveTo(x0,y0);
});

eventFunction("eraser","mousemove", function(x0,y0,e) {
    if (!(mousedown)) {
        return
    }
    let x1 = e.offsetX;
    let y1 = e.offsetY;
    ctx.lineWidth = 50;
    ctx.strokeStyle = "#FFFFFF";
    ctx.fillStyle = "#FFFFFF";
    ctx.lineTo(x1,y1)
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(x1,y1,25, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
    ctx.moveTo(x1,y1)
})
