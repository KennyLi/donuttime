var chistory = [];
var credo = [];


window.addEventListener("keydown", function (e) {
    if (e.ctrlKey && e.key === "z") {
        if (chistory.length == 1) {
            return
        }
	a = chistory.pop();
        b = chistory[chistory.length - 1];
	for (change in b) {
            action = change[0];
	    args = change[1];
	    //TYPES OF ACTIONS:
	    //name - args
	    //
	    //canvas - [cid, imagedata] Changes the image on a canvas
	    //resize - [cid, oldwidth, oldheight, newwidth, newheight]
	    if (action == "canvas") {
		cid = args[0];
		imageData = args[1];
		canvases[cid].getContext("2d").putImageData(imageData,0,0);
	    }
	    if (action == "resize") {
		
	    }
	}
	credo.push(a);

    }

});
/*
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
*/

var addHistory = function(data) {
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
	    let c = canvases[keys[x]];
	    s[c.canvasid] = [canvasesOrdering.indexOf(c.canvasid),c.getContext("2d").getImageData(0,0,canvas.width,canvas.height)];
    }
    return s;
}

