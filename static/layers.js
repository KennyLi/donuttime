//Layers
var canvases = [canvas];

var newLayer = function() {
    let c = document.createElement("canvas");
    c.className += " helpercanvas";
    c.width = canvas.width;
    c.height = canvas.height;
    content.insertBefore(c, cursorCanvas)
    canvases.push(c);
}

newLayer()
newLayer()

var radios = document.forms["layer-form"].children;
for(var i = 0; i < radios.length; i++) {
    radios[i].onclick = function() {
        changeActiveLayer(this);
    }
}

var changeActiveLayer = function(e) {
    canvas = canvases[parseInt(e.value)];
    ctx = canvas.getContext("2d");
    chistory[0] = [ctx,ctx.getImageData(0,0,canvas.width,canvas.height)]
}
