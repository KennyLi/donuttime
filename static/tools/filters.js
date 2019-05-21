// this should stay one file 

const grayscale = document.getElementById('grayscale');
const invert = document.getElementById('invert');

// ctx.filter only applies to new things so i have to redraw the
// canvas into a buffer that has the filter then copy it back
// but it don't work. fix soon.

grayscale.addEventListener('click', () => {
    let img = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let pixels = img.data;

    for (let i = 0; i < pixels.length; i += 4) {
        // get avg color
        let avg = parseInt((pixels[i] + pixels[i + 1] + pixels[i + 2]) / 3);
        // set rgb to the avg color
        pixels[i] = avg;
        pixels[i + 1] = avg;
        pixels[i + 2] = avg;
    }
    ctx.putImageData(img, 0, 0);
});

invert.addEventListener('click', () => {
    let img = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let pixels = img.data;

    for (let i = 0; i < pixels.length; i += 4) {

        pixels[i] = 255 - pixels[i];
        pixels[i + 1] = 255 - pixels[i + 1];
        pixels[i + 2] = 255 - pixels[i + 2];
    }
    ctx.putImageData(img, 0, 0);
});

