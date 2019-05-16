tool("eyedrop", true);

eventFunction("eyedrop", "mousedown", (x0, y0, e) => {
    var data = ctx.getImageData(e.offsetX, e.offsetY, 1, 1);
    var data_color = data.data;
    color = `rgba(${data_color[0]}, ${data_color[1]}, ${data_color[2]}, ${data_color[3]})`;
    currColor.style.color = color;
});