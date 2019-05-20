var chistory = [];
var credo = [];

window.addEventListener("keypress", function (e) {
    console.log(e.keyCode, keysPressed);
    if (e.keyCode == 90 && 17 in keysPressed) {
	console.log("holy moly");
	a = chistory.pop();
	ctx.putImageData(a);
	credo.push(a);
    }

});
