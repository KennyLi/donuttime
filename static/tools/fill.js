tool("fill")
console.log(canvas.width)
console.log(canvas.height)

eventFunction("fill", "mousedown", function(x0,y0,e){
    let x1 = e.offsetX;
    let y1 = e.offsetY;
    var fillColor = color
    if(fillColor == "black"){
        fillColor = [0,0,0,255]
    }
    else{
        fillColor = fillColor.substring(fillColor.indexOf("(") + 1,fillColor.indexOf(")")).split(",")
        for(var i = 0 ; i < 4; i++){
            fillColor[i] = parseInt(fillColor[i])
        }
    }
    var imgData = ctx.getImageData(0,0,canvas.width,canvas.height)
    var d32 = new Uint32Array(imgData.data.buffer);
    var frontier = [[x1,y1]]
    var explored = new Set()
    var startPosC = imgData.data.slice((canvas.width * y1 + x1) * 4,(canvas.width * y1 + x1) * 4 + 4)
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
