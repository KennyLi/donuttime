tool("smudge", true);

var grad;
var helperCanvas;

var smudge = (x, y) => {
    // on the helper canvas, draw what the smudge would look like.
    var helpCtx = helperCanvas.getContext('2d');
    // source-over just draws over everything
    helpCtx.globalCompositeOperation = "source-over";
    // copy over the section where i clicked or dragged over on the actual canvas
    // it gets where you passed over when you drag the mouse.
    helpCtx.drawImage(ctx.canvas, -1 * (x - brushRadius), -1 * (y - brushRadius));
    // destination in is used to blend the colors. It keeps the overlap. https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation
    helpCtx.globalCompositeOperation = "destination-in";
    // use the gradient to fill so the color looks smudged grayscale so darker -> lighter
    // otherwise it just looks like you went over it with a lighter color.
    helpCtx.fillStyle = grad;
    helpCtx.fillRect(0, 0, brushSize, brushSize);
}

eventFunction("smudge", "mousedown", () => {
    // initialize everything needed for smudging
    brushRadius = brushSize / 2;
    // makes a gradient with two stops. one at white and one at black. so a grayscale.
    grad = ctx.createRadialGradient(brushRadius, brushRadius, 0, brushRadius, brushRadius, brushRadius);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    helperCanvas = makeHelperCanvas(brushSize, brushSize);
})

eventFunction("smudge", "mousemove", (x0, y0, e) => {
    if (!(mousedown) || x0 == undefined || y0 == undefined) {
        return;
    }
    ctx.globalCompositeOperation = "source-over";
    // self-explanatory
    let x = (e.offsetX - x0);
    let y = (e.offsetY - y0);
    var dist = Math.sqrt(x * x + y * y);

    // loop through each pixel dragged over and smudge and then put the smudged image on the original canvas.
    for (let i = 0; i < dist; i++){
        let tosmudge = i / dist;
        smudge(x0 + x * tosmudge, y0 + y * tosmudge);
        tosmudge = (i + 1) / dist;
        ctx.drawImage(helperCanvas, x0 + x * tosmudge - brushRadius, y0 + y * tosmudge - brushRadius);
    }
});

eventFunction('smudge', 'mouseup', () => {
    helperCanvas.getContext('2d').clearRect(0, 0, brushSize, brushSize);
    helperCanvas.remove();
})

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
