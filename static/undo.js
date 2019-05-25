var chistory = [];
var credo = [];

window.addEventListener("keydown", function (e) {
    if (e.ctrlKey && e.key === "z") {
        if (chistory.length == 1) {
            return
        }
	    a = chistory.pop();
        b = chistory[chistory.length - 1];
        //console.log(b)
        let canvasesToDelete = [];
        for (var canvas in Object.keys(canvases)) {
            if (b[canvas] == undefined) {
                canvasesToDelete.push(canvas);
            } else {
                canvases[canvas].getContext("2d").putImageData(b[canvas][1],0,0);
            }
        }
        for (var id in canvasesToDelete) {
            deleteLayer(canvasesToDelete[id]);
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
        for (var canvas in Object.keys(canvases)) {
            if (a[canvas] != undefined) {
                canvases[canvas].getContext("2d").putImageData(a[canvas][1],0,0)
            }
        }
	    chistory.push(a);
    }
});

var addHistory = function(data) {
    chistory.push(data);
    //console.log(data)
};

var addRedo = function(data) {
    credo.push(data);
};

var saveStates = function() {
    let s = {};
    for (let x = 0; x < Object.keys(canvases).length; x++) {
	    let c = canvases[x];
	    s[c.canvasid] = [canvasesOrdering.indexOf(c.canvasid),c.getContext("2d").getImageData(0,0,canvas.width,canvas.height)];
    }
    return s;
}
