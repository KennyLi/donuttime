// COLOR PICKER
var colorGrad = document.getElementById('color-grad');
var colorGradContext = colorGrad.getContext('2d');
var currColor = document.getElementById('curr-color');
// colorGradContext.rect(20, 20, 150, 100);
// colorGradContext.stroke();

var gradient = new Image();
gradient.onload = () => {
    colorGradContext.drawImage(gradient, 0, 0);
}
gradient.src = '/static/gradientwithblack.png';

grad_mousedown = false;

colorGrad.addEventListener('mousedown', (e) => {
    grad_mousedown = true;
    var data = colorGradContext.getImageData(e.offsetX, e.offsetY, 1, 1);
    var data_color = data.data;
    color = `rgba(${data_color[0]}, ${data_color[1]}, ${data_color[2]}, ${data_color[3]})`;
    currColor.style.color = color;
})

colorGrad.addEventListener('mouseup', () => {
    grad_mousedown = false;
})

colorGrad.addEventListener('mousemove', (e) => {
    if (grad_mousedown) {
        var data = colorGradContext.getImageData(e.offsetX, e.offsetY, 1, 1);
        var data_color = data.data;
        color = `rgba(${data_color[0]}, ${data_color[1]}, ${data_color[2]}, ${data_color[3]})`
        currColor.style.color = color;
    }
})

// BRUSH SIZE PICKER
var slider = document.getElementById('brush-slider');
var sizeIndicator = document.getElementById('curr-brush-size');

slider.addEventListener('input', (e) => {
    val = e.target.value;
    brushSize = parseInt(val);
    sizeIndicator.innerHTML = val;
});