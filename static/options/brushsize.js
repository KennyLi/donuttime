// BRUSH SIZE PICKER
var brushSlider = document.getElementById('brush-slider');
var sizeSelector = document.getElementById('curr-brush-size');

brushSlider.addEventListener('input', (e) => {
    val = e.target.value;
    brushSize = parseInt(val);
    sizeSelector.value = val;
});

sizeSelector.addEventListener('input', (e) => {
    val = e.target.value;
    brushSize = parseInt(val);
    brushSlider.value = val;
})
