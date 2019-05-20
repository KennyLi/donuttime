var images = document.getElementsByTagName('img'); 

for(var i = 0; i < images.length; i++) {
    images[i].addEventListener("click", function() {
        $("#var").val(this.src);
        $("#form").submit();
    })
}