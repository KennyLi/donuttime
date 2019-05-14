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
        // formData.append("blob", blob);
        formData.append("drawing_name", "Kenny");
        formData.append("test", "test");
        // for (var pair of formData.entries()){
        //  console.log(pair[0]+ ', '+ pair[1]);
        // }

        // var oReq = new XMLHttpRequest();
        // var formData = new FormData()
        formData.append("file", blob, "blob.png");
        // formData.append("drawing_name", "Kenny");
        // oReq.open("GET", "/blob", true);
        // oReq.setRequestHeader("Content-type", "multipart/form-data");
        // oReq.send(formData)

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
