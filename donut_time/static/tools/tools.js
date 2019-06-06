var color = [0, 0, 0, 1]; // r g b a
var brushSize = 10;
var opacity = 1 // 100%
var brightness = 10;

var currentTool = undefined;
var keysPressed = {};
var general = function (event) {
    if (currentTool == undefined) {
        return
    }
    //Execute event if it exists in list of all functions
    if (event.type in allTools[currentTool]) {
        allTools[currentTool][event.type](event, inCanvas(event, canvas));
    }
}

//Used to tell if the mouse is being pressed
var updateGlobal = function (event) {
    //For specific functions
    if (event.type == "mousedown") {
        mousedown = true;
    }
    if (event.type == "mouseup") {
        mousedown = false;
    }
    if (event.type == "keydown") {
        keysPressed[event.keyCode] = true;
    } else if (event.type == "keyup") {
        delete keysPressed[event.keyCode];
    }
}
//Used to see if mouse in canvas
var inCanvas = function (e, c) {
    return e.pageX > c.offsetLeft && e.pageX < c.offsetLeft + c.width && e.pageY > c.offsetTop && e.pageY < c.offsetTop + c.height
}
window.addEventListener("mousedown", updateGlobal, false)
window.addEventListener("mouseup", updateGlobal, false)
window.addEventListener("keydown", updateGlobal, false)
window.addEventListener("keyup", updateGlobal, false)
content.addEventListener("mousedown", general, false)
content.addEventListener("mousemove", general, false)
content.addEventListener("mouseup", general, false)



var buttons = {};
//Tool-ify a class, allowed to include a toolicon and a custom cursor
var tool = function (name, image = false) {

    //Add a button of the fxn to the toolbar
    let button = document.createElement("button");
    button.className += " btn btn-link toolicon";
    if (image) {
        let img = document.createElement("IMG");
        img.src = '/static/icons/' + name + '.png';
        img.width = 35;
        img.height = 35;
        button.appendChild(img);
    } else {
        button.innerHTML = name;
    }
    buttons[name] = button;
    button.addEventListener('click', function (e) {
        if (currentTool != name) {
            button.style.background = "#9ca3db";
            if (currentTool != undefined) {
                buttons[currentTool].style.background = "";
            }
            //Update the current tool
            currentTool = name;
            console.log("Switched tool to: " + currentTool)
        }
    });
    button.setAttribute("data-toggle", "tooltip");
    button.setAttribute("data-placement", "right");
    button.setAttribute("title", name.charAt(0).toUpperCase() + name.slice(1));
    $(button).tooltip(
        {trigger : 'hover'}
    );
    let toolbar = document.getElementById("toolbar");
    toolbar.appendChild(button);
}



var lastClicked = [undefined, undefined];
var allTools = {};
var mousedown = false;

var eventFunction = function (toolName, type, fxn, fxn1 = undefined) {
    //Create the inner function
    let inner = function (e, inside) {
        if (type == "mousemove" && !inside && fxn1 != undefined) { //For mousemove, a lot of things go wrong if the mouse is held and dragged off canvas.
            fxn1(e)
            lastClicked = [undefined, undefined]
        }
        else if (e.type == type && inside) {
            fxn(lastClicked[0], lastClicked[1], e) //Pass in the coords of the click and the previous
            lastClicked = [e.offsetX, e.offsetY] //Update the last clicked
        }
    }

    //Add it to the all tool functions lists
    if (!(toolName in allTools)) {
        allTools[toolName] = {};
        //console.log("CREATED TOOL: " + toolName)
    }
    if (!(type in allTools[toolName])) {
        allTools[toolName][type] = inner;
        //console.log("ADDED TOOL FUNCTION: " + toolName + " " + type)
    }

}

var makeHelperCanvas = (width, height) => {
    let canvas = document.createElement('canvas');
    canvas.width = width
    canvas.height = height;
    return canvas;
}
