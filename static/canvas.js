//Canvas Setup
var canvas = document.getElementById("playground");
var ctx = canvas.getContext("2d");
var content = document.getElementById("content");
canvas.width = content.offsetWidth / 2;
canvas.height = content.offsetHeight / 2;
canvas.canvasid = 0;
var color = document.getElementById("color")
chistory[ctx] = [];
credo[ctx] = [];

//Transparent Image Setup
const bkg = document.getElementById("bkg");
const bCtx = bkg.getContext("2d");
bkg.width = canvas.width;
bkg.height = canvas.height;
const bImg = document.createElement("img");
bImg.src = "/static/imgs/grey_checker.svg";
bImg.onload = function (e) {
    bCtx.drawImage(bImg, 0,0,bkg.width,bkg.height);
}

var img = document.getElementById("img")
if (img != null) {
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
} else {
    $(document).ready(function () {
        $('#myModal').modal('show');
    });
    document.getElementById("w").addEventListener("click", function (e) {
        bCtx.fillStyle = "#FFFFFF"
        bCtx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.fillStyle = "#FFFFFF"
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        //Initialize "history" of the canvas
        addHistory(saveStates());
        var loadTestImg = () => {
            var img = new Image();
            img.onload = () => {
                ctx.drawImage(img, 0, 0);
            };
            img.src = 'static/tools/testimg.png'
        }

        //loadTestImg();
    })
    document.getElementById("t").addEventListener("click", function (e) {
        //Initialize "history" of the canvas
        addHistory(saveStates());
    })
}
