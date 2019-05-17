tool("eyedrop", true);

var getColor = (x0, y0, e) => {
    var data = ctx.getImageData(e.offsetX, e.offsetY, 1, 1);
    var data_color = data.data;
    color = `rgba(${data_color[0]}, ${data_color[1]}, ${data_color[2]}, ${data_color[3]})`;
    currColor.style.color = color;
}

eventFunction("eyedrop", "mousedown", getColor);
eventFunction("eyedrop", "mousemove", getColor);

//Cursor
cursor("eyedrop", function(e) {
    cursorCtx.fillStyle = ctx.getImageData(e.offsetX,e.offsetY, 1, 1).data;
    cursorCtx.fillRect(e.offsetX,e.offsetY, 2, 2);
})
