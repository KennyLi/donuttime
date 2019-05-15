//Canvas Setup
var canvas = document.getElementById("playground");
var ctx = canvas.getContext("2d");
var content = document.getElementById("content");
canvas.width = 1280;
canvas.height = 720;
ctx.fillStyle = "#FFFFFF";
ctx.fillRect(0,0,canvas.width,canvas.height)

//Transparent Image Setup
var checker = document.getElementById("checker");
checker.addEventListener("click", function(e) {
    e.preventDefault();
})
checker.width = 1280;
checker.height = 720;
