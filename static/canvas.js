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


//Transparent Image Setup
var checker = document.getElementById("checker");
checker.addEventListener("click", function(e) {
    e.preventDefault();
})
checker.width = canvas.width;
checker.height = canvas.height;


var img = document.getElementById("img")
if (img != null) {
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
}
