var chistory = [];
var credo = [];

window.addEventListener("keydown", function (e) {
    if (e.ctrlKey && e.key == "z") {
        if (chistory.length == 1) {
            return
        }
	a = chistory.pop();
        b = chistory[chistory.length - 1];
        ctx.putImageData(b,0,0)
	credo.push(a);

    }

});



window.addEventListener("keydown", function (e) {
    if (e.ctrlKey && e.key == "y") {
        if (credo.length == 0) {
            return
        }
	a = credo.pop();
        ctx.putImageData(a,0,0)
	chistory.push(a);

    }

});
