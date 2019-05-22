var images = document.getElementsByClassName("thumbnail")

for(var i = 0; i < images.length; i++) {
    images[i].getElementsByTagName("img")[0].addEventListener("click", function() {
        $("#drawing").val(this.src);
        $("#name").val(this.parentElement.getElementsByTagName("p")[0].innerHTML)
        $("#form").submit();
    })
}