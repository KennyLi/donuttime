//Layers
var canvasIDCounter = 0;
var canvasdiv = document.getElementById("canvases");
var layerForm = document.forms["layer-form"];
var newLayer = function() {
    let c = document.createElement("canvas");
    c.className += " helpercanvas";
    c.width = canvas.width;
    c.height = canvas.height;
    canvasIDCounter += 1;
    c.canvasid = canvasIDCounter;
    canvasdiv.appendChild(c);
    canvases[c.canvasid] = c
    canvasesOrdering.push(c.canvasid);
    let newLi = document.createElement("li");
    let divContainer = document.createElement("div");
    newLi.appendChild(divContainer);
    let newDiv = document.createElement("div");
    //Add new layer div
    newDiv.addEventListener("click", function() {
        changeActiveLayer(this);
    });
    newDiv.setAttribute("value",c.canvasid.toString());
    newDiv.innerHTML +=  (c.canvasid + 1).toString() + "<br>";
    let deleteDiv = document.createElement("div");
    deleteDiv.innerHTML = "X";
    deleteDiv.addEventListener("click", function(e) {
        deleteLayer(c.canvasid);
    });
    divContainer.className += " layer-container";
    divContainer.appendChild(newDiv);
    divContainer.appendChild(deleteDiv);
    layerForm.firstElementChild.insertBefore(newLi, layerForm.firstElementChild.firstChild);

    divs[c.canvasid] = divContainer;
    addHistory(saveStates());
}

var divs = {0: layerForm.firstElementChild.firstChild};
divs[0].addEventListener("click", function() {
    changeActiveLayer(this.children[0]);
});

var changeActiveLayer = function(e) {
    canvas = canvases[parseInt(e.attributes.value.value)];
    ctx = canvas.getContext("2d");
}

//Adding Layers
var addLayerButton = document.getElementById("addlayer");
addLayerButton.addEventListener("click", newLayer);


//Deleting Layers
var deleteLayer = function(cid) {
    canvases[cid].remove()
    delete canvases[cid];
    canvasesOrdering.splice(canvasesOrdering.indexOf(cid), 1);
    divs[cid].remove();
    delete divs[cid];
    changeActiveLayer(divs[0].children[0]);
}

//Swapping Layers RIGHT TO LEFT
var swapLayers = function(a,b) {
    var c = canvasesOrdering;
    [c[a],c[b]] = [c[b],c[a]];
    swap(divs[b],divs[a]);
    swap(canvases[a],canvases[b]);
    
}


function swap(a,b) {
    console.log(a,b);
    var div = a.parentNode;
    var after = b.nextElementSibling;
    div.insertBefore(b,a);
    div.insertBefore(a,after);
}
