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
    newLi.className += " list-group-item";
    let numberDiv = document.createElement("div");
    //Add new layer div
    newLi.addEventListener("click", function() {
        changeActiveLayer(this.firstElementChild.firstElementChild);
    });
    numberDiv.setAttribute("value",c.canvasid.toString());
    numberDiv.innerHTML +=  (c.canvasid + 1).toString();
    let deleteDiv = document.createElement("div");
    deleteDiv.innerHTML = "X";
    deleteDiv.addEventListener("click", function(e) {
        e.stopPropagation();
        deleteLayer(c.canvasid);
    }, true);
    let moveUpDiv = document.createElement("div");
    let moveDownDiv = document.createElement("div");
    moveUpDiv.addEventListener("click", function(e) {
        e.stopPropagation();
        //up arrow
        if (canvasesOrdering[canvasesOrdering.length-1] != c.canvasid) {
            i = canvasesOrdering.indexOf(c.canvasid);
            swapLayers(c.canvasid,canvasesOrdering[i+1])
        }
    },true);
    moveUpDiv.innerHTML = "▲";
    moveDownDiv.addEventListener("click", function(e) {
        e.stopPropagation();
        //down arrow
        if (canvasesOrdering[0] != c.canvasid) {
            i = canvasesOrdering.indexOf(c.canvasid);
            swapLayers(canvasesOrdering[i-1],c.canvasid)
        }
    },true);
    moveDownDiv.innerHTML = "▼";
    divContainer.className += " layer-container d-flex flex-row justify-content-between";
    divContainer.appendChild(numberDiv);
    divContainer.appendChild(moveUpDiv);
    divContainer.appendChild(moveDownDiv);
    divContainer.appendChild(deleteDiv);
    layerForm.firstElementChild.insertBefore(newLi, layerForm.firstElementChild.firstChild);

    divs[c.canvasid] = divContainer;
    addHistory(saveStates());
}

var divs = {0: layerForm.firstElementChild.firstElementChild.firstElementChild};
divs[0].parentNode.addEventListener("click", function() {
    changeActiveLayer(this.firstElementChild.firstElementChild);
});
divs[0].children[1].addEventListener("click", function(e) {
    e.stopPropagation();
    //up arrow
    if (canvasesOrdering[canvasesOrdering.length-1] != 0) {
        i = canvasesOrdering.indexOf(0);
        swapLayers(0,canvasesOrdering[i+1])
    }
},true);
divs[0].children[2].addEventListener("click", function(e) {
    e.stopPropagation();
    //down arrow
    if (canvasesOrdering[0] != 0) {
        i = canvasesOrdering.indexOf(0);
        swapLayers(canvasesOrdering[i-1],0)
    }
},true);
divs[0].lastChild.addEventListener("click", function(e) {
    e.stopPropagation();
    deleteLayer(0);
},true);

var changeActiveLayer = function(e) {
    divs[canvas.canvasid].parentNode.className = "list-group-item";
    canvas = canvases[parseInt(e.attributes.value.value)];
    ctx = canvas.getContext("2d");
    divs[canvas.canvasid].parentNode.className = "list-group-item active-layer";
}

//Adding Layers
var addLayerButton = document.getElementById("addlayer");
addLayerButton.addEventListener("click", newLayer);


//Deleting Layers
var deleteLayer = function(cid) {
    if (canvasesOrdering[0] == cid) {
        return
    }
    canvases[cid].remove()
    delete canvases[cid];
    canvasesOrdering.splice(canvasesOrdering.indexOf(cid), 1);
    divs[cid].parentNode.remove();
    delete divs[cid];
    changeActiveLayer(divs[0].children[0]);
}

//Swapping Layers RIGHT TO LEFT
var swapLayers = function(a,b) {
    var c = canvasesOrdering;
    [c[a],c[b]] = [c[b],c[a]];
    swap(divs[b].parentNode,divs[a].parentNode);
    swap(canvases[a],canvases[b]);

}


function swap(a,b) {
    console.log(a,b);
    var div = a.parentNode;
    var after = b.nextElementSibling;
    div.insertBefore(b,a);
    div.insertBefore(a,after);
}
