var c = document.getElementById("canvas");
var ctx = c.getContext("2d");

ctx.beginPath();
ctx.arc(100, 75, 50, 0, 2 * Math.PI);
ctx.stroke();

ctx.beginPath();
ctx.arc(100, 75, 10, 0, 2 * Math.PI);
ctx.stroke();

var button = document.getElementById("blob")

var download = function (e) {
    e.preventDefault();
    canvas.toBlob(function (blob) {
        var formData = new FormData();
        formData.append("drawing_name", "drawing");
        formData.append("file", blob, "blob.png");

        $.ajax({
          type: 'POST',
          url: '/blob',
          data: formData,
          cache: false,
          processData: false,
          contentType: false,
          success: function(data) {
            alert(data)
          }
        })
    }, "image/png");
}


button.addEventListener("click", download)
