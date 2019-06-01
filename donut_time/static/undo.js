var chistory = [];
var credo = [];


window.addEventListener("keydown", function (e) {
    if (e.ctrlKey && e.key === "z") {
        if (chistory.length == 1) {
            return
        }
        a = chistory.pop();
        //TYPES OF ACTIONS:
        //name - args
        //
        //canvas - [previousImageData, newImageData] Changes the image on a canvas
        //resize - [oldwidth, oldheight, newwidth, newheight]
        //layerSwap - [layer0.id,layer1.id]
        //layerAdd - [layer0.id]
        //layerDelete - [layer0.id, index]
        //layerVisibility - [layer0.id]
        for (var change in a) {
            action = a[change][0];
            args = a[change][1];
            if (action == "resize") {
                keys = Object.keys(canvases);
                for (var i = 0; i < keys.length; i++) {
                    canvases[keys[i]].width = args[0];
                    canvases[keys[i]].height = args[1];
                }
            }
            if (action == "layerSwap") {
                swapLayers(args[1],args[0]);
            }
            if (action == "layerVisibility") {
                c = canvases[args[0]]
                if (c.style.visibility == '') {
                    c.style.visibility = 'hidden';
                    divs[args[0]].children[3].firstElementChild.src = "/static/icons/eye-slash-solid.svg";
                } else {
                    c.style.visibility = '';
                    divs[args[0]].children[3].firstElementChild.src = "/static/icons/eye-solid.svg";
                }
            }
            if (action == "layerAdd") {
                deleteLayer(args[0]);
            }
            if (action == "layerDelete") {
                newLayer(undefined, args[0]);
                for (var i = canvasesOrdering.length-1; i > args[1]; i--) {
                    swapLayers(canvasesOrdering[i-1],canvasesOrdering[i]);
                }
            }
            if (action == "canvas") {
                data = args[0];
                keys = Object.keys(data)
                for (var i = 0; i < keys.length; i++) {
                    cid = keys[i];
                    canvases[cid].getContext("2d").putImageData(data[cid],0,0);
                }
            }
        }
        credo.push(a);

    }

});

window.addEventListener("keydown", function (e) {
    if (e.ctrlKey && e.key === "y") {
        if (credo.length == 0) {
            return
        }
        a = credo.pop();
        for (var change in a) {
            action = a[change][0];
            args = a[change][1];
            if (action == "resize") {
                keys = Object.keys(canvases);
                for (var i = 0; i < keys.length; i++) {
                    canvases[keys[i]].width = args[2];
                    canvases[keys[i]].height = args[3];
                }
            }
            if (action == "layerSwap") {
                swapLayers(args[0],args[1]);
            }
            if (action == "layerAdd") {
                newLayer(undefined, args[0]);
            }
            if (action == "layerDelete") {
                deleteLayer(args[0])
            }
            if (action == "layerVisibility") {
                c = canvases[args[0]]
                if (c.style.visibility == '') {
                    c.style.visibility = 'hidden';
                    divs[args[0]].children[3].firstElementChild.src = "/static/icons/eye-slash-solid.svg";
                } else {
                    c.style.visibility = '';
                    divs[args[0]].children[3].firstElementChild.src = "/static/icons/eye-solid.svg";
                }
            }
            if (action == "canvas") {
                data = args[1];
                keys = Object.keys(data)
                for (var i = 0; i < keys.length; i++) {
                    cid = keys[i];
                    canvases[cid].getContext("2d").putImageData(data[cid],0,0);
                }
            }
        }
	    chistory.push(a);
    }
});

var addHistory = function(data) {
    credo = [];
    chistory.push(data);
    //console.log(data)
};

var addRedo = function(data) {
    credo.push(data);
};

var saveStates = function() {
    let s = {};
    keys = Object.keys(canvases)
    for (let x = 0; x < keys.length; x++) {
        if (keys[x] == -1) {
            s[-1] = bCtx.getImageData(0,0,canvas.width,canvas.height);
        } else if (keys[x] == -2) {

        } else {
            let c = canvases[keys[x]];
            s[c.canvasid] = c.getContext("2d").getImageData(0,0,canvas.width,canvas.height);
        }
    }
    return s;
}
