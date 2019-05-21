//Layers
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
