var test = document.getElementById("test");

var redirect = function() {
    $("#var").val(test.src);
    $("#form").submit();
}

test.addEventListener("click", redirect);


