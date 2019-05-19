// this should stay one file 

const grayscale = document.getElementById('grayscale');

// ctx.filter only applies to new things so i have to redraw the
// canvas into a buffer that has the filter then copy it back
// but it don't work. fix soon.

grayscale.addEventListener('click', () => {
    var save  = canvas.toDataURL();
    let img = document.createElement("img");
    img.src = save;

    var filterHelper = makeHelperCanvas(canvas.width, canvas.height);
    var helperCtx = filterHelper.getContext('2d');
    helperCtx.filter = 'grayscale(100)';
    helperCtx.drawImage(img, 0, 0);

    var filtered = filterHelper.toDataURL();
    img = document.createElement("img");
    img.src = filtered;

    ctx.filter = 'grayscale(100)';
    ctx.drawImage(img, 0, 0);
});