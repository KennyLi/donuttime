var colorGrad = document.getElementById('color-grad');
var colorGradContext = colorGrad.getContext('2d');
var currColor = document.getElementById('curr-color');
// colorGradContext.rect(20, 20, 150, 100);
// colorGradContext.stroke();

var gradient = new Image();
gradient.onload = () => {
    colorGradContext.drawImage(gradient, 0, 0);
}
gradient.src = '/static/gradient.png';

grad_mousedown = false;

colorGrad.addEventListener('mousedown', (e) => {
    console.log('down');
    grad_mousedown = true;
    var data = colorGradContext.getImageData(e.offsetX, e.offsetY, 1, 1);
    var data_color = data.data;
    color = `rgba(${data_color[0]}, ${data_color[1]}, ${data_color[2]}, ${data_color[3]})`;
    currColor.innerHTML = color;
})

colorGrad.addEventListener('mouseup', () => {
    console.log('up');
    grad_mousedown = false;
})

colorGrad.addEventListener('mousemove', (e) => {
    console.log('hihih');
    if (grad_mousedown) {
        var data = colorGradContext.getImageData(e.offsetX, e.offsetY, 1, 1);
        var data_color = data.data;
        color = `rgba(${data_color[0]}, ${data_color[1]}, ${data_color[2]}, ${data_color[3]})`
        currColor.innerHTML = color;
    }
})