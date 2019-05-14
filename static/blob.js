var c = document.getElementById("canvas");
var ctx = c.getContext("2d");

ctx.beginPath();
ctx.arc(100, 75, 50, 0, 2 * Math.PI);
ctx.stroke();

var button = document.getElementById("blob")
// var download = function() {
//     var oReq = new XMLHttpRequest();
//     var blob = new Blob(['abc123'], {type: 'text/plain'});
//     oReq.open("GET", window.location.href + "blob?blob=" + blob, true);
//     oReq.send(blob)
// };



var download = function (e) {
    e.preventDefault();
    canvas.toBlob(function (blob) {
        var formData = new FormData();
        formData.append("drawing_name", "Kenny");
        formData.append("test", "test");
        formData.append("file", blob, "blob.png");

        $.ajax({
          type: 'POST',
          url: '/blob',
          data: formData,
          cache: false,
          processData: false,
          contentType: false
        })
    }, "image/png");
}


button.addEventListener("click", download)
