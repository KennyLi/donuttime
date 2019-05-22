//Canvas Setup
var canvas = document.getElementById("playground");
var ctx = canvas.getContext("2d");
var content = document.getElementById("content");
canvas.width = content.offsetWidth / 2;
canvas.height = content.offsetHeight / 2;
console.log(content);
var color = document.getElementById("color")
console.log(color.innerHTML)
ctx.fillStyle = "#FFFFFF";
ctx.fillRect(0,0,canvas.width,canvas.height)
chistory[ctx] = [];
credo[ctx] = [];

//Transparent Image Setup
var checker = document.getElementById("checker");
checker.addEventListener("click", function(e) {
    e.preventDefault();
})
checker.width = canvas.width;
checker.height = canvas.height;

var canvasIsWhite = false;
var img = document.getElementById("img")
if (img != null) {
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
} else {
    $(document).ready(function () {
        $('#myModal').modal('show');
    });
    document.getElementById("w").addEventListener("click",function(e){
        ctx.fillStyle = "#FFFFFF"
        ctx.fillRect(0,0,canvas.width,canvas.height)
        //Initialize "history" of the canvas
        addHistory(saveStates());
	canvasIsWhite = true;
    })
    document.getElementById("t").addEventListener("click",function(e){
        ctx.clearRect(0,0,canvas.width,canvas.height)
        //Initialize "history" of the canvas
        addHistory(saveStates());
    })
}
