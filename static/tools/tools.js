var color = 'black';

var currentTool = undefined;

var general = function (event) {
    if (currentTool == undefined) {
        return
    }

    //Execute event if it exists in list of all functions
    if (event.type in allTools[currentTool]) {
        allTools[currentTool][event.type](event,inCanvas(event,canvas));
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
//Used to see if mouse in canvas
var inCanvas = function(e,c) {
    return e.pageX > c.offsetLeft && e.pageX < c.offsetLeft + c.width && e.pageY > c.offsetTop && e.pageY < c.offsetTop + c.height
}
window.addEventListener("mousedown", updateMouse, false)
window.addEventListener("mouseup", updateMouse, false)
content.addEventListener("mousedown", general, false)
content.addEventListener("mousemove", general, false)
content.addEventListener("mouseup", general, false)
content.addEventListener("keydown", general, false)

//Tool-ify a class
var tool = function (name, image=false) {

    //Add a button of the fxn to the toolbar
    let button = document.createElement("button");
    button.className += " btn btn-link";
    if(image) {
	let img = document.createElement("IMG");
	img.className += " toolicon"
	img.src = '/static/icons/' + name + '.png';
	img.width = 35;
	img.height = 35;
	button.appendChild(img);
    } else {
	button.innerHTML = name;
    }

    button.addEventListener('click', function (e) {
        currentTool = name;
        console.log("Switched tool to: " + currentTool)
    });
    let toolbar = document.getElementById("toolbar");
    toolbar.appendChild(button);
}



var lastClicked = [undefined, undefined];
var allTools = {};
var mousedown = false;

var eventFunction = function (toolName, type, fxn, fxn1 = undefined) {
    //Create the inner function
    let inner = function (e, inside) {
        if (type == "mousemove" && !inside && fxn1 != undefined){ //For mousemove, a lot of things go wrong if the mouse is held and dragged off canvas.
            fxn1(e)
            lastClicked = [undefined,undefined]
        }
        else if (e.type == type) {
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
