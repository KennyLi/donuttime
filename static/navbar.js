var downloadButton = document.getElementById("download")
var savedButton = document.getElementById("saved")
var logoutButton = document.getElementById("logout")

var download = function (e) {
    e.preventDefault();
    var name = document.getElementById("name").value
    //Combine all the layers
    let combine = document.createElement("canvas");
    let cctx = combine.getContext("2d");
    combine.width = canvas.width;
    combine.height = canvas.height;
    for (let i = 0; i < canvasesOrdering.length; i++) {
        let layer = canvases[canvasesOrdering[i]]
        cctx.drawImage(layer, 0, 0);
    }
    combine.toBlob(function (blob) {
        var formData = new FormData();
        formData.append("drawing_name", name);
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


var saved = function(e) {
    e.preventDefault();
    window.location.href="/saved"
}

var logout = function(e) {
    e.preventDefault();
    window.location.href="logout"
}

if (downloadButton != undefined && downloadButton != null) {
    downloadButton.addEventListener("click", download)
    savedButton.addEventListener("click", saved)
    logoutButton.addEventListener("click", logout)
}
