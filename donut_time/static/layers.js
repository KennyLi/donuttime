//Layers
var canvasIDCounter = 0;
var canvasdiv = document.getElementById("canvases");
var layerForm = document.forms["layer-form"];
var newLayer = function(e = undefined, id = undefined) {
    let c = document.createElement("canvas");
    c.className += " helpercanvas";
    c.width = canvas.width;
    c.height = canvas.height;
    if (id == undefined) {
        canvasIDCounter += 1;
        c.canvasid = canvasIDCounter;

    } else {
        c.canvasid = id
    }
    canvasesOrdering.push(c.canvasid);
    canvasdiv.appendChild(c);
    canvases[c.canvasid] = c
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
        addHistory([["layerDelete", [c.canvasid,canvasesOrdering.indexOf(c.canvasid)]],["canvas", [saveStates(),saveStates()]]])
        deleteLayer(c.canvasid);
    }, true);
    let moveUpDiv = document.createElement("div");
    let moveDownDiv = document.createElement("div");
    moveUpDiv.addEventListener("click", function(e) {
        e.stopPropagation();
        //up arrow
        if (canvasesOrdering[canvasesOrdering.length-1] != c.canvasid) {
            i = canvasesOrdering.indexOf(c.canvasid);
            addHistory([["layerSwap", [c.canvasid,canvasesOrdering[i+1]]]])
            swapLayers(c.canvasid,canvasesOrdering[i+1])

        }
    },true);
    moveUpDiv.innerHTML = "▲";
    moveDownDiv.addEventListener("click", function(e) {
        e.stopPropagation();
        //down arrow
        if (canvasesOrdering[0] != c.canvasid) {
            i = canvasesOrdering.indexOf(c.canvasid);
            addHistory([["layerSwap", [canvasesOrdering[i-1],c.canvasid]]])
            swapLayers(canvasesOrdering[i-1],c.canvasid)

        }
    },true);
    moveDownDiv.innerHTML = "▼";
    let visibilityDiv = document.createElement("div");
    let eyeimg = document.createElement("img");
    eyeimg.width = 24;
    eyeimg.width = 22;
    eyeimg.src = "/static/icons/eye-solid.svg";
    visibilityDiv.appendChild(eyeimg);
    visibilityDiv.addEventListener("click", function(e) {
        e.stopPropagation();
        addHistory([["layerVisibility", [c.canvasid]]])
        if (c.style.visibility == '') {
            c.style.visibility = 'hidden';
            this.firstElementChild.src = "/static/icons/eye-slash-solid.svg";
        } else {
            c.style.visibility = '';
            this.firstElementChild.src = "/static/icons/eye-solid.svg";
        }
    }, true);
    divContainer.className += " layer-container d-flex flex-row justify-content-between";
    divContainer.appendChild(numberDiv);
    divContainer.appendChild(moveUpDiv);
    divContainer.appendChild(moveDownDiv);
    divContainer.appendChild(visibilityDiv);
    divContainer.appendChild(deleteDiv);
    layerForm.firstElementChild.insertBefore(newLi, layerForm.firstElementChild.firstChild);

    divs[c.canvasid] = divContainer;
    if (id == undefined) {
        addHistory([["layerAdd", [c.canvasid]]]);
    }
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
        addHistory([["layerSwap", [0,canvasesOrdering[i+1]]]])
        swapLayers(0,canvasesOrdering[i+1])

    }
},true);
divs[0].children[2].addEventListener("click", function(e) {
    e.stopPropagation();
    //down arrow
    if (canvasesOrdering[0] != 0) {
        i = canvasesOrdering.indexOf(0);
        addHistory([["layerSwap", [canvasesOrdering[i-1],0]]])
        swapLayers(canvasesOrdering[i-1],0)

    }
},true);
divs[0].children[3].addEventListener("click", function(e) {
    e.stopPropagation();
    addHistory([["layerVisibility", [0]]])
    if (canvases[0].style.visibility == '') {
        canvases[0].style.visibility = 'hidden';
        this.firstElementChild.src = "/static/icons/eye-slash-solid.svg";
    } else {
        canvases[0].style.visibility = '';
        this.firstElementChild.src = "/static/icons/eye-solid.svg";
    }
},true);
divs[0].lastElementChild.addEventListener("click", function(e) {
    e.stopPropagation();
    addHistory([["layerDelete", [0,canvasesOrdering.indexOf(0)]],["canvas", [saveStates(),saveStates()]]])
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
    if (canvasesOrdering.length == 1) {
        return
    }
    if (canvasesOrdering.indexOf(cid) == 0) {
        changeActiveLayer(divs[canvasesOrdering[1]].children[0]);
    } else {
        changeActiveLayer(divs[canvasesOrdering[0]].children[0]);
    }
    canvases[cid].remove()
    delete canvases[cid];
    canvasesOrdering.splice(canvasesOrdering.indexOf(cid), 1);
    divs[cid].parentNode.remove();
    delete divs[cid];

}

//Swapping Layers RIGHT TO LEFT
var swapLayers = function(a,b) {
    var c = canvasesOrdering;
    i = c.indexOf(a);
    j = c.indexOf(b);
    [c[i],c[j]] = [c[j],c[i]];
    swap(divs[b].parentNode,divs[a].parentNode);
    swap(canvases[a],canvases[b]);

}


function swap(a,b) {
    var div = a.parentNode;
    var after = b.nextElementSibling;
    div.insertBefore(b,a);
    div.insertBefore(a,after);
}
