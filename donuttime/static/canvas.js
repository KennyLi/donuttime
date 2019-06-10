//Canvas Setup
var canvas = document.getElementById("playground");
var canvases = {0: canvas};
var canvasesOrdering = [0];
var ctx = canvas.getContext("2d");
var content = document.getElementById("content");
canvas.width = content.offsetWidth / 2;
canvas.height = content.offsetHeight / 2;
canvas.canvasid = 0;
var color = document.getElementById("color")
chistory[ctx] = [];
credo[ctx] = [];
var bgColor


//Transparent Image Setup
const bkg = document.getElementById("bkg");
canvases[-1] = bkg;
const bCtx = bkg.getContext("2d");
bkg.width = canvas.width;
bkg.height = canvas.height;
const bImg = document.createElement("img");
bImg.src = "/static/imgs/grey_checker.svg";
bImg.onload = function (e) {
    if (img == null) {
        bCtx.drawImage(bImg, 0,0,bkg.width,bkg.height);
    }
}

var reSize = function(rCanvas,width,height){
    rCanvas.width = width
    rCanvas.height = height
}

var img = document.getElementById("img")
if (img != null) {
    bgColor = document.getElementById("background").innerHTML
    var cWidth = img.width
    var cHeight = img.height
    for(var i = 0; i < canvasesOrdering.length;i++){
        canvases[i].width = cWidth
        canvases[i].height = cHeight
    }
    bkg.width = cWidth
    bkg.height = cHeight
    if(bgColor == "White"){
        bCtx.fillStyle = "#FFFFFF"
        bCtx.fillRect(0,0,bkg.width,bkg.height)
    } else {
        bCtx.drawImage(bImg, 0,0,bkg.width,bkg.height);
    }
    ctx.drawImage(img,0,0)
    addHistory(saveStates());
} else {
    $(document).ready(function () {
        $('#myModal').modal('show');
    });
    document.getElementById("w").addEventListener("click", function (e) {
        bgColor = "White"
        bCtx.fillStyle = "#FFFFFF"
        bCtx.fillRect(0, 0, canvas.width, canvas.height)

        // var loadTestImg = () => {
        //     var img = new Image();
        //     img.onload = () => {
        //         ctx.drawImage(img, 0, 0);
        //         addHistory(saveStates());
        //     };
        //     img.src = 'static/tools/testimg.png'
        // }

        // loadTestImg();
        //Initialize "history" of the canvas
        addHistory(saveStates());
    })
    document.getElementById("t").addEventListener("click", function (e) {
        bgColor = "Transparent"
        //Initialize "history" of the canvas
        addHistory(saveStates());
    })
}
