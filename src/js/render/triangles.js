
function drawTriangleDefault(canvas, gl){
	// Verticies
	var vertices = 
		[
			-0.5, -0.5, 0,
			0, 0.5, 0,
			0.5, -0.5, 0
		];	
	// Indices
	var indices = [0,1,2];
	
	var vertexBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
		gl.bindBuffer(gl.ARRAY_BUFFER, null);
	
	var indexBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
	
	// Shader Code
	var vertexCode = 
		'attribute vec3 coordinates;' +
		'void main(void){' +
			'gl_Position = vec4(coordinates, 1.0);' +
		'}';
		var vertexShader = gl.createShader(gl.VERTEX_SHADER);
		gl.shaderSource(vertexShader, vertexCode);
		gl.compileShader(vertexShader);
		
	
	var fragmentCode =
		'void main(void){' +
			'gl_FragColor = vec4(0,1,0,1);' +
		'}';
		var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
		gl.shaderSource(fragmentShader, fragmentCode);
		gl.compileShader(fragmentShader);
		
	// Create Shader Program in the GPU
	var shaderProgram = gl.createProgram(); 
		gl.attachShader(shaderProgram, vertexShader);
		gl.attachShader(shaderProgram, fragmentShader);
		gl.linkProgram(shaderProgram);
		gl.useProgram(shaderProgram);
	
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
	var coord = gl.getAttribLocation(shaderProgram, "coordinates");
	gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray(coord);	
	// Assigns how much memory
	gl.viewport(0,0,canvas.width, canvas.height);
	
	
	gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);
}

function drawTriangleV(canvas, gl, vertices){
	// Indices
	var indices = [0,1,2];
	
	var vertexBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
		gl.bindBuffer(gl.ARRAY_BUFFER, null);
	
	var indexBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
	
	// Shader Code
	var vertexCode = 
		'attribute vec3 coordinates;' +
		'void main(void){' +
			'gl_Position = vec4(coordinates, 1.0);' +
		'}';
		var vertexShader = gl.createShader(gl.VERTEX_SHADER);
		gl.shaderSource(vertexShader, vertexCode);
		gl.compileShader(vertexShader);
	
	
	var fragmentCode =
		'void main(void){' +
			'gl_FragColor = vec4(1,0,0,1);' +
		'}';
		var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
		gl.shaderSource(fragmentShader, fragmentCode);
		gl.compileShader(fragmentShader);
		
	// Create Shader Program in the GPU
	var shaderProgram = gl.createProgram(); 
		gl.attachShader(shaderProgram, vertexShader);
		gl.attachShader(shaderProgram, fragmentShader);
		gl.linkProgram(shaderProgram);
		gl.useProgram(shaderProgram);
	
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
	var coord = gl.getAttribLocation(shaderProgram, "coordinates");
	gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray(coord);
	
	// Assigns how much memory
	gl.viewport(0,0,canvas.width, canvas.height);
	
	
	gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);
}

function drawTriangleVC(canvas, gl, vertices, RGBA){
	// Indices
	var indices = [0,1,2];
	
	var vertexBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
		gl.bindBuffer(gl.ARRAY_BUFFER, null);
	
	var indexBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
	
	// Shader Code
	var vertexCode = 
		'attribute vec3 coordinates;' +
		'void main(void){' +
			'gl_Position = vec4(coordinates, 1.0);' +
		'}';
		var vertexShader = gl.createShader(gl.VERTEX_SHADER);
		gl.shaderSource(vertexShader, vertexCode);
		gl.compileShader(vertexShader);
	
	
	var fragmentCode =
		'void main(void){' +
			'gl_FragColor = vec4(' +
			RGBA[0].toString() + ',' +
			RGBA[1].toString() + ',' +
			RGBA[2].toString() + ',' +
			RGBA[3].toString() +
			');' +
		'}';
		var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
		gl.shaderSource(fragmentShader, fragmentCode);
		gl.compileShader(fragmentShader);
		
	// Create Shader Program in the GPU
	var shaderProgram = gl.createProgram(); 
		gl.attachShader(shaderProgram, vertexShader);
		gl.attachShader(shaderProgram, fragmentShader);
		gl.linkProgram(shaderProgram);
		gl.useProgram(shaderProgram);
	
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
	var coord = gl.getAttribLocation(shaderProgram, "coordinates");
	gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray(coord);
	
	// Assigns how much memory
	gl.viewport(0,0,canvas.width, canvas.height);
	
	
	gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);
}

function testTriangles(canvas, gl){
	
	// DRAW DEFAULT TRIANGLE
	drawTriangleDefault(canvas, gl);	
	
	// DRAW TRIANGLE WITH VERTICES
	var v1 = 
	[
		-1.0, 0.0, 0.0,
		0.0, 1.0, 0.0,
		0.0, 0.0, 0.0
	];
	drawTriangleV(canvas, gl, v1);
	
	// DRAW TRIANGLE WITH VERTICES AND RGBA
	var v2 =
	[
		-0.8, -0.8, 0.0,
		-0.6, -0.4, 0.0,
		-0.4, -0.8, 0.0
	];
	
	var RGBA = [0.0, 0.0, 0.0, 1.0];
	drawTriangleVC(canvas, gl, v2, RGBA);
}
