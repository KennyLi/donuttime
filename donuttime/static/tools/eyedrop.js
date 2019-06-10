tool("eyedrop", true);

var getColor = (x0, y0, e) => {
    var data = ctx.getImageData(e.offsetX, e.offsetY, 1, 1);
    var data_color = data.data;
    color = [data_color[0], data_color[1], data_color[2], data_color[3]];
    currColor.style.color = `rgba(${color.join(',')})`;
}

eventFunction("eyedrop", "mousedown", getColor);
eventFunction("eyedrop", "mousemove",  (x0, y0, e) => {
    if (!(mousedown) || x0 == undefined || y0 == undefined) {
        return;
    }
    getColor(x0,y0,e);
});

//Cursor
cursor("eyedrop", function(e) {
    cursorCtx.fillStyle = ctx.getImageData(e.offsetX,e.offsetY, 1, 1).data;
    cursorCtx.fillRect(e.offsetX,e.offsetY, 2, 2);
})
