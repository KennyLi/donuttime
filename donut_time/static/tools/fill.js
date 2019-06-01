tool("fill",true)

var initial
eventFunction("fill", "mousedown", function(x0,y0,e){
    initial = saveStates();
    let x1 = e.offsetX;
    let y1 = e.offsetY;
    var fillColor = color
    if (fillColor[3] <= 1){
      fillColor[3] = color[3] * 255
    }
    var imgData = ctx.getImageData(0,0,canvas.width,canvas.height)
    var frontier = [[x1,y1]]
    var explored = new Set()
    var startPosC = imgData.data.slice((canvas.width * y1 + x1) * 4,(canvas.width * y1 + x1) * 4 + 4)
    if (startPosC[0] == fillColor[0] && startPosC[1] == fillColor[1] && startPosC[2] == fillColor[2] && startPosC[3] == fillColor[3]){
        frontier.pop()
    }
    while(frontier.length > 0){
        newPos = frontier.pop()
        explored.add(newPos)
        index = (canvas.width * newPos[1] + newPos[0]) * 4
        if(imgData.data[index] == startPosC[0] &&
            imgData.data[index + 1] == startPosC[1] &&
            imgData.data[index + 2] == startPosC[2] &&
            imgData.data[index + 3] == startPosC[3]){
                imgData.data[index] = fillColor[0]
                imgData.data[index + 1] = fillColor[1]
                imgData.data[index + 2] = fillColor[2]
                imgData.data[index + 3] = fillColor[3]
                if(newPos[0] - 1 >= 0 && !([newPos[0] - 1,newPos[1]] in explored)){
                    frontier.push([newPos[0] - 1,newPos[1]])
                }
                if(newPos[1] + 1 < canvas.height && !([newPos[0],newPos[1] + 1] in explored)){
                    frontier.push([newPos[0],newPos[1] + 1])
                }
                if(newPos[0] + 1 < canvas.width && !([newPos[0] + 1,newPos[1]] in explored)){
                    frontier.push([newPos[0] + 1,newPos[1]])
                }
                if(newPos[1] - 1 >= 0 && !([newPos[0],newPos[1] - 1] in explored)){
                    frontier.push([newPos[0],newPos[1] - 1])
                }
        }
    }
    ctx.putImageData(imgData,0,0)

})

eventFunction("fill", "mouseup", function(x0,y0,e) {
    //History
    addHistory([["canvas",[initial,saveStates()]]]);
});
cursor("fill", function(e) {
    cursorCtx.save();
    cursorCtx.setLineDash([]);
    cursorCtx.beginPath();
    cursorCtx.arc(e.offsetX,e.offsetY, 1,0,2 *Math.PI);
    cursorCtx.closePath();
    cursorCtx.strokeStyle = "#000000";
    cursorCtx.stroke();
    cursorCtx.restore();
})
