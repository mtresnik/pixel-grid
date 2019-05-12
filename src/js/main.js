

function main(){
	const canvas = document.querySelector("#glCanvas");
	const gl = canvas.getContext("webgl",  { preserveDrawingBuffer: true});
	
	initGL(canvas, gl);
	var elem = new GLElements(canvas, gl);
}

class GLElements {
	constructor(canvas, gl){
		this.universe = new Universe(canvas, gl);
		this.universe.draw(canvas, gl);
		GLElements.initListeners(this, canvas, gl);
		this.resize(null, canvas, gl);
		closeNav();
		var pixelRadio = document.getElementById("pixelRadio");
		pixelRadio.checked = true;
		var colorChoice = document.getElementById("colorChoice");
		colorChoice.value = "#ff0000";
		var randomCheck = document.getElementById("randomCheck");
		randomCheck.checked = false;
		
	}
	static initListeners(glelements, canvas, gl){
		window.onresize = function(event){
			glelements.resize(event, canvas, gl);
		};
		canvas.onclick = function(event){
			var _button = document.getElementById("feedback");
			// console.log(_button.width);
			var inBound = inBounds(event.clientX, event.clientY, _button);
			// console.log("in button:" + inBound);
			
			if(true){
				glelements.universe.onClick(event, canvas, gl);
			}
			// glelements.resize(event, canvas, paneCanvas, openPane, closePane, gl);
		};
		document.addEventListener("canvasEnter", function(event){
			glelements.universe.clickNable = true;
		});
		document.addEventListener("canvasLeave", function(event){
			glelements.universe.clickNable = false;
		});
		document.addEventListener("clearGrid", function(event){
			// console.log("clear");
			glelements.universe.clear(canvas, gl);
		});
		document.addEventListener("openNavEvent", function(event){
			document.getElementById("mySidenav").style.width = "250px";
			canvas.style.left = "250px";
			canvas.style.width = window.innerWidth - 250;
			glelements.resize(event, canvas, gl);
		});
		document.addEventListener("closeNavEvent", function(event){
			document.getElementById("mySidenav").style.width = "0px";
			canvas.style.left = "0px";
			canvas.style.width = window.innerWidth;
			glelements.resize(event, canvas, gl);
			glelements.universe.clickNable = false;
		});
		document.addEventListener("setMode", function(event){
			glelements.universe.grid.mode = event.detail;
			glelements.universe.grid.clearHighlighted();
		});
		window.onmousemove = function(event){
			var navWidth = parseInt(document.getElementById("mySidenav").style.width, 10);
			var pXY = [event.clientX - navWidth, event.clientY];
			var XYSnapped = glelements.universe.grid.pXY_to_XYSnapped(canvas, pXY);
			var hovered = document.getElementById("hovered");
			hovered.textContent = "Hovered: (" + XYSnapped.toString() + ")";
		};
		document.addEventListener("colorChanged", function(event){
			// console.log(event.detail);
			var rgba = hexToRgb(event.detail);
			glelements.universe.grid.color = rgba;
		});
		document.addEventListener("randomCheck", function(event){
			console.log(event.detail);
			glelements.universe.grid.randColor = event.detail;
		});
		
	}
	resize(event, canvas, gl){
			this.universe.resize(event, canvas, gl);
	}
	updateElements(event, canvas, gl){
		this.resize(event, canvas, gl);
	}
}

/* Set the width of the side navigation to 250px and the left margin of the page content to 250px */
function openNav() {
	// console.log("Open nav");
	var event = new CustomEvent("openNavEvent", { "detail": "Open Nav Pane" });
	document.dispatchEvent(event);
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
function closeNav() {
	var event = new CustomEvent("closeNavEvent", { "detail": "Close Nav Pane" });
	document.dispatchEvent(event);
} 

function clearGrid(){
	var event = new CustomEvent("clearGrid", { "detail": "Clear Grid" });
	// Dispatch/Trigger/Fire the event
	document.dispatchEvent(event);
}

function clickCanvas(){
	// enables canvas
	var event = new CustomEvent("enable", { "detail": "Close Panel" });

	// Dispatch/Trigger/Fire the event
	document.dispatchEvent(event);
}

function canvasOnMouseEnter(){
	// on mouse enter
	var event = new CustomEvent("canvasEnter", { "detail": "Enter canvas" });

	// Dispatch/Trigger/Fire the event
	document.dispatchEvent(event);
}

function canvasOnMouseLeave(){
	// console.log("left");
	// on mouse leave
	var event = new CustomEvent("canvasLeave", { "detail": "Leave canvas" });

	// Dispatch/Trigger/Fire the event
	document.dispatchEvent(event);
}

function inBounds(x, y, component){
		var _left = parseInt(component.style.left, 10);
		var _right = parseInt(component.style.right, 10);
		var _bottom = parseInt(component.style.bottom, 10);
		var _top = parseInt(component.style.top, 10);
		var _width = component.style.width;
		// console.log(component.style);
		// console.log("x:" + x + " y:" + y + " comp:" + _left + " " + _right + " " + _top + " " + _bottom + " width:" + _width);
		if(x>_left && x < _right){
			if(y < _down && y > _top){
				return true;
			}
		}
		return false;
}
function initGL(canvas, gl){
	
	function testGL(canvas, gl) {
  if (!gl) {
    alert("Unable to initialize WebGL. Your browser or machine may not support it.");
    return;
  }else{
	  // console.log("GL is present, proceeding to initialize program.");
  }
}

	function blackBox(canvas, gl){
  // Set clear color to black, fully opaque
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  // Clear the color buffer with specified clear color
  gl.clear(gl.COLOR_BUFFER_BIT);
}


	testGL(canvas, gl);
	clearCanvas(canvas, gl);
	// console.log("Initialized");
}

function clearCanvas(canvas, gl){
	gl.clearColor(1.0, 1.0, 1.0, 1.0);
	gl.enable(gl.DEPTH_TEST);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);	
}


function setDrawMode(mode){
	var event = new CustomEvent("setMode", { "detail": mode });
	// Dispatch/Trigger/Fire the event
	document.dispatchEvent(event);
}

function colorChanged(){
	var colorChoice = document.getElementById("colorChoice");
	var event = new CustomEvent("colorChanged", {"detail" : colorChoice.value});
	document.dispatchEvent(event);
	var randomCheck = document.getElementById("randomCheck");
	randomCheck.checked = false;
	var eventRC = new CustomEvent("randomCheck", {"detail" : false});
	document.dispatchEvent(eventRC);
}

function setRandom(){
	var randomCheck = document.getElementById("randomCheck");
	var event = new CustomEvent("randomCheck", {"detail" : randomCheck.checked});
	document.dispatchEvent(event);
}

