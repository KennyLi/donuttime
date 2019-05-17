var test = document.getElementById("test");


test.addEventListener("click", redirect);

$("#test").click(function(){
    $.redirect(/,
        {
            data: test.src,
        });
});
