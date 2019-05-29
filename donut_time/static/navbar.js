var downloadButton = document.getElementById("download")
var savedButton = document.getElementById("saved")
var logoutButton = document.getElementById("logout")
var confirmButton = document.getElementById("confirm")
var replaceMsg = document.getElementById("replace")

var confirm = function (e) {
    let formData = new FormData();
    let name = document.getElementById("name").value
    formData.append("drawing_name", name);    
    $.ajax({
        type: 'POST',
        url: '/confirm',
        data: formData,
        cache: false,
        processData: false,
        contentType: false,
        success: function(data) {
          if (data == "true") {
            replaceMsg.innerHTML = "'" + name + "' already exists. Do you want to overwrite it?"
            $(document).ready(function () {
                $('#overwrite').modal('show');
            });
          } else {
            download()
          }
        }
      })
}

var download = function(e) {
    let name = document.getElementById("name").value
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
        let formData = new FormData();
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


confirmButton.addEventListener("click", download)

if (downloadButton != undefined && downloadButton != null) {
    downloadButton.addEventListener("click", confirm)
    savedButton.addEventListener("click", saved)
    logoutButton.addEventListener("click", logout)
}
