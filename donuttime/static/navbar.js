var downloadButton = document.getElementById("download")
var savedButton = document.getElementById("saved")
var logoutButton = document.getElementById("logout")
var confirmButton = document.getElementById("confirm")
var replaceMsg = document.getElementById("replace")
var localButton = document.getElementById("local")

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
        formData.append("background", bgColor)

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

var local = function(e) {
    e.preventDefault()
    let name = document.getElementById("name").value
    //Combine all the layers
    let combine = document.createElement("canvas");
    let cctx = combine.getContext("2d");
    combine.width = canvas.width;
    combine.height = canvas.height;
    if (bgColor == "White") {
    cctx.fillStyle = "#FFFFFF"
    cctx.fillRect(0,0,combine.width,combine.height)
    }    
    for (let i = 0; i < canvasesOrdering.length; i++) {
        let layer = canvases[canvasesOrdering[i]]
        cctx.drawImage(layer, 0, 0);
    }
    let a = document.createElement("a");
    a.href = combine.toDataURL();
    a.download = name + ".png";
    let event = new MouseEvent("click");
    a.dispatchEvent(event);
}

confirmButton.addEventListener("click", download)
localButton.addEventListener("click", local)

if (downloadButton != undefined && downloadButton != null) {
    downloadButton.addEventListener("click", confirm)
    savedButton.addEventListener("click", saved)
    logoutButton.addEventListener("click", logout)
}
