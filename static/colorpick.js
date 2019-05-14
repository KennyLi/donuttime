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

colorGrad.addEventListener('mousedown', () => {
    console.log('down');
    grad_mousedown = true;
})

colorGrad.addEventListener('mouseup', () => {
    console.log('up');
    grad_mousedown = false;
})

colorGrad.addEventListener('mousemove', (e) => {
    console.log('hihih');
    if (grad_mousedown) {
        var data = colorGradContext.getImageData(e.offsetX, e.offsetY, 1, 1);
        var color = data.data;
        currColor.innerHTML = `(${color[0]}, ${color[1]}, ${color[2]}, ${color[3]})`;
    }
})