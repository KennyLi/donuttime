// this should stay one file

const grayscale = document.getElementById('grayscale');
const invert = document.getElementById('invert');
const sepia = document.getElementById('sepia');
var initial
grayscale.addEventListener('click', () => {
    initial = saveStates();
    let img = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let pixels = img.data;

    for (let i = 0; i < pixels.length; i += 4) {
        // calculation for gray value that works better for human eyes
        // formula from wikipedia https://en.wikipedia.org/wiki/Grayscale
        let avg = parseInt(pixels[i] * 0.2126 + pixels[i + 1] * 0.7152 + pixels[i + 2] * 0.722);
        // set rgb to the avg color
        pixels[i] = avg;
        pixels[i + 1] = avg;
        pixels[i + 2] = avg;
    }
    ctx.putImageData(img, 0, 0);
    //History
    addHistory([["canvas",[initial,saveStates()]]]);
});

invert.addEventListener('click', () => {
    initial = saveStates();
    let img = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let pixels = img.data;

    for (let i = 0; i < pixels.length; i += 4) {

        pixels[i] = 255 - pixels[i];
        pixels[i + 1] = 255 - pixels[i + 1];
        pixels[i + 2] = 255 - pixels[i + 2];
    }
    ctx.putImageData(img, 0, 0);
    //History
    addHistory([["canvas",[initial,saveStates()]]]);
});

sepia.addEventListener('click', () => {
    initial = saveStates();
    let img = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let pixels = img.data;
    for (let i = 0; i < pixels.length; i += 4) {
        let avg = parseInt(pixels[i] * 0.2126 + pixels[i + 1] * 0.7152 + pixels[i + 2] * 0.722);
        // lazy implementation of sepia. just gray scale with red and green
        pixels[i] = avg + 100;
        pixels[i + 1] = avg + 50;
        pixels[i + 2] = avg;
    }
    ctx.putImageData(img, 0, 0);
    //History
    addHistory([["canvas",[initial,saveStates()]]]);
});
