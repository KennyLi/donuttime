// COLOR PICKER
var colorGrad = document.getElementById('color-grad');
var colorGradContext = colorGrad.getContext('2d');
var currColor = document.getElementById('curr-color');
currColor.style.color = "rgb(0,0,0)";
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
    color = [data_color[0], data_color[1], data_color[2], opacity];
    c = [data_color[0],data_color[1],data_color[2]];
    currColor.style.color = `rgb(${c.join(',')})`;
})

colorGrad.addEventListener('mouseup', () => {
    grad_mousedown = false;
})

colorGrad.addEventListener('mousemove', (e) => {
    if (grad_mousedown) {
        var data = colorGradContext.getImageData(e.offsetX, e.offsetY, 1, 1);
        var data_color = data.data;
        color = [data_color[0], data_color[1], data_color[2], opacity];
	c = [data_color[0],data_color[1],data_color[2]];
        currColor.style.color = `rgb(${c.join(',')})`;
    }
})

// BRUSH SIZE PICKER
var brushSlider = document.getElementById('brush-slider');
var sizeIndicator = document.getElementById('curr-brush-size');

brushSlider.addEventListener('input', (e) => {
    val = e.target.value;
    brushSize = parseInt(val);
    sizeIndicator.innerHTML = val;
});

var opacitySlider = document.getElementById('opacity-slider');
var opacityIndicator = document.getElementById('curr-opacity');

opacitySlider.addEventListener('input', (e) => {
    val = e.target.value;
    opacity = parseInt(val) / 100;
    opacityIndicator.innerHTML = val;
    color[3] = opacity; //update color opacity
})
// REPEATED CODE. MAKE BETTER LATER
