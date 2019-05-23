var brightnessSlider = document.getElementById('brightness-slider');
var brightnessSelector = document.getElementById('curr-brightness');

brightnessSlider.addEventListener('input', (e) => {
    val = e.target.value;
    brightness = parseInt(val) / 8;
    brightnessSelector.value = val;

    let img = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let pixels = img.data;
    for (let i = 0; i < pixels.length; i += 4) {
        pixels[i] += brightness;
        pixels[i + 1] += brightness;
        pixels[i + 2] += brightness;
    }
    ctx.putImageData(img, 0, 0);
})

brightnessSelector.addEventListener('input', (e) => {
    val = e.target.value;
    brightness = parseInt(val) / 4;
    brightnessSlider.value = val;

    let img = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let pixels = img.data;
    for (let i = 0; i < pixels.length; i += 4) {
        pixels[i] += brightness;
        pixels[i + 1] += brightness;
        pixels[i + 2] += brightness;
    }
    ctx.putImageData(img, 0, 0);
})

