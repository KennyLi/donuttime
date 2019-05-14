tool("text")

var word = ""

eventFunction("text","mousedown", function(x0,y0,e) {
    let x1 = e.offsetX;
    let y1 = e.offsetY;
});

eventFunction("text","keydown", function(x0,y0,e){
    console.log(e.keyCode)
    var valid =
        (e.keyCode > 47 && e.keyCode < 58)   || // number keys
        (e.keyCode > 64 && e.keyCode < 91)   || // letter keys
        (e.keyCode > 95 && e.keyCode < 112)  || // numpad keys
        (e.keyCode > 185 && e.keyCode < 193) || // ;=,-./`
        (e.keyCode > 218 && e.keyCode < 223);   // [\]'
    let x1 = e.offsetX;
    let y1 = e.offsetY;
    ctx.font = "30px Arial";
    ctx.fillText(stringTitle, x1, y1);

})
