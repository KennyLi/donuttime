var opacitySlider = document.getElementById('opacity-slider');
var opacitySelector = document.getElementById('curr-opacity');

opacitySlider.addEventListener('input', (e) => {
    val = e.target.value;
    opacity = parseInt(val) / 100;
    opacitySelector.value = val;
    color[3] = opacity; //update color opacity
})

opacitySelector.addEventListener('input', (e) => {
    val = e.target.value;
    opacity = parseInt(val) / 100;
    opacitySlider.value = val;
    color[3] = opacity; //update color opacity
    if (opacity > 1) {
	opacity = 1;
	opacitySelector.value = 100;
	opacitySlider.value = 100;
    }
    console.log(val);
    if (val === '') {
	opacity = 1;
	opacitySlider.value = 100;
    }
})

