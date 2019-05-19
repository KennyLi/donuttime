var opacitySlider = document.getElementById('opacity-slider');
var opacityIndicator = document.getElementById('curr-opacity');

opacitySlider.addEventListener('input', (e) => {
    val = e.target.value;
    opacity = parseInt(val) / 100;
    opacityIndicator.innerHTML = val;
    color[3] = opacity; //update color opacity
})
// REPEATED CODE. MAKE BETTER LATER
