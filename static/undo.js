var chistory = [];
var credo = [];

window.addEventListener("keydown", function (e) {
    if (e.ctrlKey && e.key == "z") {
        if (chistory.length == 1) {
            return
        }
        console.log(chistory)
	a = chistory.pop();
        b = chistory[chistory.length - 1];

	for (let key in b) {
	    key.putImageData(b[key],0,0)
	}
	credo.push(a);

    }

});



window.addEventListener("keydown", function (e) {
    if (e.ctrlKey && e.key == "y") {
        if (credo.length == 0) {
            return
        }
        console.log(credo)
	a = credo.pop();
        for (let key in a) {
	    key.putImageData(a[key],0,0)
	}
	    chistory.push(a);
    }
});

var addHistory = function(data) {
    chistory.push(data);
};

var addRedo = function(data) {
    credo.push(data);
};

var saveStates = function() {
    let s = {};
    for (let x = 0; x < canvases.length; x++) {
	let c = canvases[x];
	s[c] = c.getContext("2d").getImageData(0,0,c.width,c.height);
    }
    return s;
}
