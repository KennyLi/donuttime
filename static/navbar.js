var downloadButton = document.getElementById("download")
var savedButton = document.getElementById("saved")
var logoutButton = document.getElementById("logout")

var download = function (e) {
    e.preventDefault();
    var name = document.getElementById("name").value
    canvas.toBlob(function (blob) {
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

downloadButton.addEventListener("click", download)
savedButton.addEventListener("click", saved)
logoutButton.addEventListener("click", logout)
