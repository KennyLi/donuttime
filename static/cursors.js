//=============================For the circle effect=========================
cursorCanvas = document.createElement("canvas");
cursorCtx = cursorCanvas.getContext("2d");
cursorCanvas.height = canvas.height;
cursorCanvas.width = canvas.width;
cursorCanvas.className += " helpercanvas";
content.addEventListener("mousemove", function(e) {
    cursorCtx.clearRect(0, 0, cursorCanvas.width, cursorCanvas.height);
    if (!(inCanvas(e,cursorCanvas))){
        return
    }
    if (currentTool in cursors){
        cursors[currentTool](e);
    }

});
content.appendChild(cursorCanvas);

var cursors = {};
var cursor = function(name, fxn) {
    cursors[name] = fxn;
}
