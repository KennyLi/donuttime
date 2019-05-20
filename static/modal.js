$(document).ready(function () {
    $('#myModal').modal('show');
});
document.getElementById("w").addEventListener("click",function(e){
    ctx.fillStyle = "#FFFFFF"
    ctx.fillRect(0,0,canvas.width,canvas.height)
})
document.getElementById("t").addEventListener("click",function(e){
    ctx.clearRect(0,0,canvas.width,canvas.height)
})
