//Layers
var canvases = {0: canvas};
var canvasesOrdering = [0];
var canvasIDCounter = 0;
var newLayer = function() {
    let c = document.createElement("canvas");
    c.className += " helpercanvas";
    c.width = canvas.width;
    c.height = canvas.height;
    canvasIDCounter += 1;
    c.canvasid = canvasIDCounter;
    content.insertBefore(c, cursorCanvas)
    canvases[c.canvasid] = c
    canvasesOrdering.push(c.canvasid);
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
    console.log(e.value);
}
