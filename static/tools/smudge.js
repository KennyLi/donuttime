tool("smudge", true);



//Cursor
cursor("smudge", function(e) {
    cursorCtx.save();
    cursorCtx.setLineDash([]);
    cursorCtx.beginPath();
    cursorCtx.arc(e.offsetX,e.offsetY,brushSize/2 + 1,0,2 *Math.PI);
    cursorCtx.closePath();
    cursorCtx.strokeStyle = "#000000";
    cursorCtx.stroke();
    cursorCtx.restore();
})
