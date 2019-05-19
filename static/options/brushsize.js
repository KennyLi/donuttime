// BRUSH SIZE PICKER
var brushSlider = document.getElementById('brush-slider');
var sizeIndicator = document.getElementById('curr-brush-size');

brushSlider.addEventListener('input', (e) => {
    val = e.target.value;
    brushSize = parseInt(val);
    sizeIndicator.innerHTML = val;
});
