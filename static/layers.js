//Layers
var canvases = {0: canvas};
var canvasesOrdering = [0];
var canvasIDCounter = 0;
var layerForm = document.forms["layer-form"];
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
    let newDiv = document.createElement("div");
    //Add radio button div
    var radio = document.createElement("input")
    radio.type = "radio";
    radio.name = "layer";
    radio.value = (canvasIDCounter).toString();
    newDiv.addEventListener("click", function() {
        changeActiveLayer(this.children[0]);
    });
    newDiv.appendChild(radio);
    newDiv.innerHTML +=  " " + (canvasIDCounter + 1).toString() + "<br>";
    layerForm.insertBefore(newDiv, layerForm.firstChild);


}

var radios = layerForm.children;
for(var i = 0; i < radios.length; i++) {
    radios[i].addEventListener("click", function() {
        changeActiveLayer(this.children[0]);
    });
}

var changeActiveLayer = function(e) {
    canvas = canvases[parseInt(e.value)];
    ctx = canvas.getContext("2d");
}

//Adding Layers
var addLayerButton = document.getElementById("addlayer");
addLayerButton.addEventListener("click", newLayer);
