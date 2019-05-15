var canvas = document.getElementById("playground");
var ctx = canvas.getContext("2d");
var currentTool = undefined;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight
var color = 'black';

var general = function (event) {
    if (currentTool == undefined) {
        return
    }

    //Execute event if it exists in list of all functions
    if (event.type in allTools[currentTool]) {
        allTools[currentTool][event.type](event);
    }
}

//Used to tell if the mouse is being pressed
var updateMouse = function(event) {
    //For specific functions
    if (event.type == "mousedown") {
        mousedown = true;
    }
    if (event.type == "mouseup") {
        mousedown = false;
    }
}

window.addEventListener("mousedown", updateMouse, false)
window.addEventListener("mouseup", updateMouse, false)
canvas.addEventListener("mousedown", general, false)
canvas.addEventListener("mousemove", general, false)
canvas.addEventListener("mouseup", general, false)
canvas.addEventListener("keydown", general, false)

//Tool-ify a class
var tool = function (name) {

    //Add a button of the fxn to the toolbar
    let button = document.createElement("button");
    button.innerHTML = name;
    button.addEventListener('click', function (e) {
        currentTool = name;
        console.log("Switched tool to: " + currentTool)
    });
    let toolbar = document.getElementById("sidebar");
    toolbar.appendChild(button);
}



var lastClicked = [undefined, undefined];
var allTools = {};
var mousedown = false;

var eventFunction = function (toolName, type, fxn) {
    //Create the inner function
    let inner = function (e) {
        if (e.type == type) {
            fxn(lastClicked[0], lastClicked[1], e) //Pass in the coords of the click and the previous
            lastClicked = [e.offsetX, e.offsetY] //Update the last clicked
        }
    }

    //Add it to the all tool functions lists
    if (!(toolName in allTools)) {
        allTools[toolName] = {};
        console.log("CREATED TOOL: " + toolName)
    }
    if (!(type in allTools[toolName])) {
        allTools[toolName][type] = inner;
        console.log("ADDED TOOL FUNCTION: " + toolName + " " + type)
    }

}
