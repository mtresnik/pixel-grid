
class Universe{
	constructor(canvas, gl){
		this.grid = new Grid(20);
		this.init(canvas, gl);
	}

	init(canvas, gl){
		Universe.initListeners(this, canvas, gl);
	}
	
	static initListeners(universe, canvas, gl){
		
		
		
	}
	
	onClick(event, canvas, gl){
		if(this.clickNable == false){
			return;
		}
		var navWidth = parseInt(document.getElementById("mySidenav").style.width, 10);
		
		var mouseXY = [event.clientX - navWidth, event.clientY];
		
		this.grid.click(canvas, gl, mouseXY);
	}
	
	resize(event, canvas, gl){
		// console.log("Resize");
		var navWidth = parseInt(document.getElementById("mySidenav").style.width, 10);
		
		canvas.width  = window.innerWidth - navWidth;
		canvas.height = window.innerHeight;
		// console.log("gl:" + gl);
		this.draw(canvas, gl);
	}
	
	draw(canvas, gl){
		this.grid.draw(canvas, gl);
	}

	clear(canvas, gl){
		clearCanvas(canvas, gl);
		this.grid.clear();
		this.draw(canvas, gl);
	}
	}

class Grid{
	constructor(pixelSize){
		this.pixelSize = pixelSize;
		this.init();
	}
	init(){
		this.mode = "pixel";
		this.color = [1.0, 0.0, 0.0, 1.0];
		this.randColor = false;
		// Stores gXY coordinates
		this.highlighted = [];
		this.initPixelMatrix();
	}
	initPixelMatrix(){
		var m = 2160/this.pixelSize;
		var n = 4096/this.pixelSize;
		console.log("m x n:" + m +" " + n);
		this.pixelMatrix = [];
		for(var row = 0; row < m; row++){
			var currentRow = [];
			for(var col = 0; col < n; col++){
				var pixel = {isActive : false, color : []};
				currentRow.push(pixel);
			}
			this.pixelMatrix.push(currentRow);
		}
	}
	draw(canvas, gl){
		this.drawAxes(canvas, gl);
		drawLines(canvas, gl, this.pixelSize);
		var curr = null;
		var rowCol = [0, 0];
		for(var row = 0; row < this.pixelMatrix.length; row++){
			for(var col = 0; col < this.pixelMatrix[0].length; col++){
				curr = this.pixelMatrix[row][col];
				if(curr.isActive){
					// console.log("active @ row:" + row + " col:" + col);
					rowCol = [row, col];
					this.drawPixel(canvas, gl, rowCol, curr.color);
				}
			}
		}
	}
	
	drawAxes(canvas, gl){
		// console.log("DRAWIN AXES");
	var vertices = [
		-1.0, 0.0, 0.0,
		1.0, 0.0, 0.0,
		0.0, -1.0, 0.0,
		0.0, 1.0, 0.0

	];

	// Initialize the buffer object.
	var vertexBuffer = gl.createBuffer();

	// Bind the buffer to the ARRAY_BUFFER.
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

	// Add vertex data to the ARRAY_BUFFER
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

	// Unbind the ARRAY_BUFFER
	gl.bindBuffer(gl.ARRAY_BUFFER, null);


	/*
	A Shader is a program that lives in the GPU.
	*/

	/*
	Vertex Shader deals with transforming vertices from the affine space
	to the projective space (screen).
	*/
	var vertCode =
            'attribute vec3 coordinates;' +
            'void main(void) {' +
               ' gl_Position = vec4(coordinates, 1.0);' +
            '}';
	var vertShader = gl.createShader(gl.VERTEX_SHADER);
	gl.shaderSource(vertShader, vertCode);
	gl.compileShader(vertShader);

	/*
	Fragment Shader deals with coloring the space between vertices starting
	with the edges.
	*/

	var fragCode =
		'void main(void) {' +
			'gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);' +
        '}';
	var fragShader = gl.createShader(gl.FRAGMENT_SHADER);
	gl.shaderSource(fragShader, fragCode);
	gl.compileShader(fragShader);


	/*
	Creates a GPU program to link vertexShader and fragmentShader.
	*/
	var shaderProgram = gl.createProgram();
	gl.attachShader(shaderProgram, vertShader);
	gl.attachShader(shaderProgram, fragShader);
	gl.linkProgram(shaderProgram);
	gl.useProgram(shaderProgram);

	// Binds the vertex buffer to use the freed buffer.
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

	// Gets the attribute location (line in the program) in which the program holds.
	var coord = gl.getAttribLocation(shaderProgram, "coordinates");
	gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0);

	gl.enableVertexAttribArray(coord);

	// Projection Coordinates
	gl.viewport(0,0,canvas.width,canvas.height);

	gl.drawArrays(gl.LINES, 0, 4);
	}
	
	highlight(canvas, gl, gXY){
		this.highlighted.push(gXY);
		// console.log(this.highlighted);
		var XY = this.gXY_to_XY(canvas, gXY);
		// console.log(XY);
		var red = [1.0,0.0,0.0,1.0];
		// this.writePixel(canvas, gl, gXY, red);
		var selected1 = document.getElementById("selected1");
		
		selected1.textContent = "Selected: (" + this.XY_to_XYSnapped(canvas, this.highlighted[0]).toString() + ")";
		
	}
	
	clearHighlighted(){
		this.highlighted = [];
		var selected1 = document.getElementById("selected1");
		selected1.textContent = "Selected: ";
		
	}
	
	xyToRowCol(xy){
		var rowCol = [];
		var medx = this.pixelMatrix[0].length/2;
		var medy = this.pixelMatrix.length/2;
		var add = [xy[0], xy[1]];
		if(add[0] < 0){
			add[0]++;
		}
		if(add[1] < 0){
			add[1]++;
		}

		var col = Math.floor(medx + add[0]);
		var row = Math.floor(medy + add[1]);

		return [row, col];
	}
	
	rowToGrid(canvas, gl, row, col){
		var medx = this.pixelMatrix[0].length/2;
		var medy = this.pixelMatrix.length/2;

		// console.log("medxy:" + medx + " " + medy);

		var x = Math.floor(col - medx);
		var y = Math.floor(row - medy);

		// console.log("drawing:" + col + " " + row);
		// console.log("xy:" + x + " " + y);


		// Find where to draw it on the screen.

		var n = canvas.width/this.pixelSize;
		var m = canvas.height/this.pixelSize;


		var xn = 2*x/n;
		var ym = 2*y/m;

		return [xn, ym, 2/n, 2/m];
	}
	
	fillPixelTest(canvas, gl, row, col){
			var black = [0.0,0.0,0.0,1.0];
			this.drawPixel(canvas, gl, row, col, black);
	}
	
	drawPixel(canvas, gl, rowCol, _color){		
		// Black
		
		var color = this.color;
		if(_color != undefined){
			color = _color;
		}
		if(this.pixelMatrix[rowCol[0]][rowCol[1]].color.length > 0){
			color = this.pixelMatrix[rowCol[0]][rowCol[1]].color;
		}
		
		
		var gXY = this.rowCol_to_gXY(canvas, rowCol);
		
		var x = gXY[0]; var y = gXY[1];
		var dX = 2*this.pixelSize/canvas.width;
		var dY = 2*this.pixelSize/canvas.height;
		
		var vertices = [
			x, y, 0.0,
			x, y - dY, 0.0,
			x + dX, y - dY, 0.0,
			x + dX, y, 0.0
		];

		drawQuadVC(canvas, gl, vertices, color);
	}
	
	writePixel(canvas, gl, XY, _color){
		var color = [0.0, 0.0, 0.0, 1.0];
		if(_color != undefined){
			color = _color;
		}
		var rowCol = this.XY_to_rowCol(canvas, XY);
		// console.log("row:" + rowCol[0] + " col:" + rowCol[1]);
		if(this.pixelMatrix[rowCol[0]][rowCol[1]].isActive){
			// Early Escape
			return;
		}
		this.activate(rowCol);		
		this.drawPixel(canvas, gl, rowCol);
	}
	
	clear(){
		var rowCol = [0, 0];
		for(var row = 0; row < this.pixelMatrix.length; row++){
			for(var col = 0; col < this.pixelMatrix[row].length; col++){
				rowCol = [row, col];
				this.deactivate(rowCol);
			}
		}
		this.clearHighlighted();
	}

	static pXY_to_gXY(canvas, pXY){
		// Center pixels
		var gXY = [0, 0];
		gXY[0] = pXY[0] - canvas.width/2;
		gXY[1] = canvas.height/2 - pXY[1];
		
		gXY[0] /= canvas.width/2;
		gXY[1] /= canvas.height/2;
		
		return gXY;
	}
	
	pXY_to_XY(canvas, pXY){
		var gXY = Grid.pXY_to_gXY(canvas, pXY);
		var XY = this.gXY_to_XY(canvas, gXY);
		return XY;
	}
	
	pXY_to_XYSnapped(canvas, pXY){
		var XY = this.pXY_to_XY(canvas, pXY);
		var rowCol = this.XY_to_rowCol(canvas, XY);
		var XYSnapped = this.rowCol_to_XY(canvas, rowCol);
		return XYSnapped;
	}
	
	gXY_to_XY(canvas, gXY){
		// Returns grid coordinates
		// How many per quadrant
		var m = canvas.height/this.pixelSize;
		var n = canvas.width/this.pixelSize;
		
		var qY = m/2;
		var qX = n/2;
		var XY = [0, 0];
		XY[0] = qX*gXY[0];
		XY[1] = qY*gXY[1];
		
		return XY;
	}
	
	XY_to_XYSnapped(canvas, XY){
		var rowCol = this.XY_to_rowCol(canvas,XY);
		var XYSnapped = this.rowCol_to_XY(canvas,rowCol);
		return XYSnapped;
	}
	
	// Converts double representation to integer rowCol values of matrix
	XY_to_rowCol(canvas, XY){
		// Get middle of pixelMatrix
		var midY = Math.floor(this.pixelMatrix.length/2);
		// Assumes this isn't a jagged matrix
		var midX = Math.floor(this.pixelMatrix[0].length/2);
		
		var rowCol = [0, 0];
		
		rowCol[0] = Math.floor(midY + XY[1]);
		rowCol[1] = Math.floor(midX + XY[0]);
		
		return rowCol;
	}
	
	// Inverse of XY_to_rowCol
	rowCol_to_XY(canvas, rowCol){
		var XY = [0, 0];
		var midY = Math.floor(this.pixelMatrix.length/2);
		var midX = Math.floor(this.pixelMatrix[0].length/2);
		
		XY[0] = rowCol[1] - midX;
		XY[1] = rowCol[0] - midY;
		
		return XY;
	}
	
	XY_to_gXY(canvas, XY){
		var gXY = [0.0, 0.0];
		
		var m = canvas.height/this.pixelSize;
		var n = canvas.width/this.pixelSize;
		
		var qX = n/2;
		var qY = m/2;
		
		gXY[0] = XY[0]/qX;
		gXY[1] = (XY[1]+1)/qY;
		
		return gXY;
	}
	
	gXY_to_rowCol(canvas, gXY){
		var XY = this.gXY_to_XY(canvas, gXY);
		var rowCol = this.XY_to_rowCol(canvas, XY);
		return rowCol;
	}
	
	rowCol_to_gXY(canvas, rowCol){
		var XY = this.rowCol_to_XY(canvas, rowCol);
		var gXY = this.XY_to_gXY(canvas, XY);
		return gXY;
	}
	
	activate(rowCol){
		this.pixelMatrix[rowCol[0]][rowCol[1]].isActive = true;
		if(this.randColor){
			console.log("randColor");
			this.pixelMatrix[rowCol[0]][rowCol[1]].color = randColor();
		}else{
			this.pixelMatrix[rowCol[0]][rowCol[1]].color = this.color;
		}
	}
	
	deactivate(rowCol){
		this.pixelMatrix[rowCol[0]][rowCol[1]].isActive = false;
	}
	
	click(canvas, gl, mouseXY){
		// console.log(mouseXY);
		var gXY = Grid.pXY_to_gXY(canvas, mouseXY);
		// console.log(gXY);
		var XY = this.gXY_to_XY(canvas, gXY);
		// console.log(XY);
		var rowCol = this.XY_to_rowCol(canvas, XY);
		// console.log(rowCol);
		var XYPrime = this.rowCol_to_XY(canvas, rowCol);
		// console.log(XYPrime);
		var gXYPrime = this.XY_to_gXY(canvas, XYPrime);
		// console.log(gXYPrime);
		
		switch(this.mode){
			case "pixel":
				this.writePixel(canvas, gl, XYPrime);
				break;
			case "line":
				this.lineDraw(canvas, gl, XYPrime);
				break;
			case "circle":
				this.circleDraw(canvas, gl, XYPrime);
				break;
			case "print":
			default:
				console.log(gXY);
				console.log(rowCol);
				
		}
		
		// console.log(this.mode);
		
		
	}
	
	lineDraw(canvas, gl, XY){
		var mXY = [XY[0] + 0.5, XY[1] + 0.5];
		this.highlight(canvas, gl, mXY);
		if(this.highlighted.length < 2){
			// Early Escape
			return;
		}
		// console.log("Line Draw");
		
		var x1 = this.highlighted[0][0]; var y1 = this.highlighted[0][1];
		var x2 = this.highlighted[1][0]; var y2 = this.highlighted[1][1];
		
		var dx = x2 - x1; var dy = y2 - y1;
		
		var aDx = Math.abs(dx);
		var aDy = Math.abs(dy);
		
		var steps = Math.max(aDx, aDy);
		
		var iDx = dx / steps;
		var iDy = dy / steps;
		
		var xyDraw = [x1, y1];
		
		this.writePixel(canvas, gl, xyDraw);
		for(var i = 0; i < steps; i++){
			xyDraw[0] += iDx;
			xyDraw[1] += iDy;
			this.writePixel(canvas, gl, xyDraw);
		}
		this.clearHighlighted();
	}
	
	circleDraw(canvas, gl, XY){
		var mXY = [XY[0] + 0.5, XY[1] + 0.5];
		var r = Math.sqrt(mXY[0]*mXY[0] + mXY[1]*mXY[1]);
		// find number of fragments
		
		// pi/4 * r  gives you number of frags
		var x = -0.5;
		var y = r;
		var d = 5/4 - r;
		
		var xyDraw = [x, y];
	
		function writeOctant(grid, canvas, gl, x, y){
			var xyDraw = [x, y];
			grid.writePixel(canvas, gl, xyDraw);
			xyDraw = [-x, y];
			grid.writePixel(canvas, gl, xyDraw);
			xyDraw = [x, -y];
			grid.writePixel(canvas, gl, xyDraw);
			xyDraw = [-x, -y];
			grid.writePixel(canvas, gl, xyDraw);
			xyDraw = [y, x];
			grid.writePixel(canvas, gl, xyDraw);
			xyDraw = [y, -x];
			grid.writePixel(canvas, gl, xyDraw);
			xyDraw = [-y, x];
			grid.writePixel(canvas, gl, xyDraw);
			xyDraw = [-y, -x];
			grid.writePixel(canvas, gl, xyDraw);
		}
	
		writeOctant(this, canvas, gl, x, y);
		while(y > x){
			if(d < 0){
				d += 2*x + 3;
				x++;
			}else{
				d += 2*x - 2*y + 5;
				x++;
				y--;
			}
			xyDraw = [x, y];
			writeOctant(this, canvas, gl, x, y);
		}
		
		
	}
	
	
	}

function hexToRgb(hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    var rgba = [parseInt(result[1], 16)/256, parseInt(result[2], 16)/256, parseInt(result[3], 16)/256, 1.0];
	
	return rgba;
}
	
function randColor(){
	
	var pallette = [
		[243, 66, 53, 255],
		[62, 80, 180, 255],
		[75, 179, 74, 255],
		[254, 151, 0, 255],
		[32, 149, 242, 255],
		[155, 38, 175, 255],
		[232, 29, 98, 255],
		[0, 187, 211, 255],
		[62, 80, 180, 255],
		[254, 244, 94, 255]
	];
	
	var col = pallette[Math.floor(Math.random()*pallette.length)];
	
	var spread = 40;
	
	col[0] += Math.random()*spread;
	col[1] += Math.random()*spread;
	col[2] += Math.random()*spread;
	col[3] += Math.random()*spread;
	
	col[0] /= 255;
	col[1] /= 255;
	col[2] /= 255;
	col[3] /= 255;
		
	return col;
}	
	
	
function drawLines(canvas, gl, pixelSize){
	// console.log(pixelSize);

	var n = canvas.width/pixelSize;
	var m = canvas.height/pixelSize;

	for(var i = 0; i < 1.0; i += 2/n){
		var vertices = [i, -1.0, 0.0, i, 1.0, 0.0];
		drawLine(canvas, gl, vertices);
		vertices = [-i, -1.0, 0.0, -i, 1.0, 0.0];
		drawLine(canvas, gl, vertices);
	}

	for(var j = 0; j < 1.0; j+=2/m){
		var vertices = [-1.0, j, 0.0, 1.0, j, 0.0];
		drawLine(canvas, gl, vertices);
		var vertices = [-1.0, -j, 0.0, 1.0, -j, 0.0];
		drawLine(canvas, gl, vertices);
	}



}

function drawLine(canvas, gl, vertices){

	// Initialize the buffer object.
	var vertexBuffer = gl.createBuffer();

	// Bind the buffer to the ARRAY_BUFFER.
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

	// Add vertex data to the ARRAY_BUFFER
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

	// Unbind the ARRAY_BUFFER
	gl.bindBuffer(gl.ARRAY_BUFFER, null);


	/*
	A Shader is a program that lives in the GPU.
	*/

	/*
	Vertex Shader deals with transforming vertices from the affine space
	to the projective space (screen).
	*/
	var vertCode =
            'attribute vec3 coordinates;' +
            'void main(void) {' +
               ' gl_Position = vec4(coordinates, 1.0);' +
            '}';
	var vertShader = gl.createShader(gl.VERTEX_SHADER);
	gl.shaderSource(vertShader, vertCode);
	gl.compileShader(vertShader);

	/*
	Fragment Shader deals with coloring the space between vertices starting
	with the edges.
	*/

	var fragCode =
		'void main(void) {' +
			'gl_FragColor = vec4(0.0, 0.0, 0.0, 0.1);' +
        '}';
	var fragShader = gl.createShader(gl.FRAGMENT_SHADER);
	gl.shaderSource(fragShader, fragCode);
	gl.compileShader(fragShader);


	/*
	Creates a GPU program to link vertexShader and fragmentShader.
	*/
	var shaderProgram = gl.createProgram();
	gl.attachShader(shaderProgram, vertShader);
	gl.attachShader(shaderProgram, fragShader);
	gl.linkProgram(shaderProgram);
	gl.useProgram(shaderProgram);

	// Binds the vertex buffer to use the freed buffer.
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

	// Gets the attribute location (line in the program) in which the program holds.
	var coord = gl.getAttribLocation(shaderProgram, "coordinates");
	gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0);

	gl.enableVertexAttribArray(coord);

	// Projection Coordinates
	gl.viewport(0,0,canvas.width,canvas.height);

	gl.drawArrays(gl.LINES, 0, 2);

}
