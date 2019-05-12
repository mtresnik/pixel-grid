
function drawQuadDefault(canvas, gl) {
	
	var vertices =
	[
		0.2, -0.6, 0,
		0.8, -0.6, 0,
		0.8, -0.9, 0,
		0.2, -0.9, 0
	];
	
	var indices = [3,2,1,3,1,0];
	
	var vertexBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
		gl.bindBuffer(gl.ARRAY_BUFFER, null);
	
	var indexBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
		
	var vertexCode = 
		'attribute vec3 coordinates;' +
		'void main(void){' +
			'gl_Position = vec4(coordinates,1.0);'+
		'}';
	var vertexShader = gl.createShader(gl.VERTEX_SHADER);
		gl.shaderSource(vertexShader, vertexCode);
		gl.compileShader(vertexShader);
	
	var fragmentCode =
		'void main(void){'+
			'gl_FragColor = vec4(0,0,1,1);'+
		'}';
	var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
		gl.shaderSource(fragmentShader, fragmentCode);
		gl.compileShader(fragmentShader);
	
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
	// glClearColor
	// glEnable
	// glClear()
	gl.viewport(0,0, canvas.width, canvas.height);
	
	
	gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);
	
	
}

function drawQuadV(canvas, gl, vertices) {
	
	var indices = [3,2,1,3,1,0];
	
	var vertexBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
		gl.bindBuffer(gl.ARRAY_BUFFER, null);
	
	var indexBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
		
	var vertexCode = 
		'attribute vec3 coordinates;' +
		'void main(void){' +
			'gl_Position = vec4(coordinates,1.0);'+
		'}';
	var vertexShader = gl.createShader(gl.VERTEX_SHADER);
		gl.shaderSource(vertexShader, vertexCode);
		gl.compileShader(vertexShader);
	
	var fragmentCode =
		'void main(void){'+
			'gl_FragColor = vec4(0.75,0,1,1);'+
		'}';
	var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
		gl.shaderSource(fragmentShader, fragmentCode);
		gl.compileShader(fragmentShader);
	
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
	// glClearColor
	// glEnable
	// glClear()
	gl.viewport(0,0, canvas.width, canvas.height);
	
	
	gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);
	
	
}

function drawQuadVC(canvas, gl, vertices, RGBA) {
		
	var indices = [3,2,1,3,1,0];
	
	var vertexBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
		gl.bindBuffer(gl.ARRAY_BUFFER, null);
	
	var indexBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
		
	var vertexCode = 
		'attribute vec3 coordinates;' +
		'void main(void){' +
			'gl_Position = vec4(coordinates,1.0);'+
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
	// glClearColor
	// glEnable
	// glClear()
	gl.viewport(0,0, canvas.width, canvas.height);
	
	
	gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);
}

function testQuads(canvas, gl){
	
	// DRAW DEFAULT QUAD
	drawQuadDefault(canvas, gl);
	
	// DRAW QUADS USING VERTICES
	var v1 = 
	[
		0.5, 0.1, 0.0,
		0.9, 0.1, 0.0,
		0.9, -0.1, 0.0,
		0.5, -0.1, 0.0
	];
	
	drawQuadV(canvas, gl, v1);
	
	// DRAW QUADS USING VERTICES AND RGBA
	
	var v2 =
	[
		0.4, 0.6, 0,
		0.8, 0.6, 0,
		0.8, 0.9, 0,
		0.4, 0.9, 0
	];
	
	var RGBAQuad = [0.3, 0.5, 0.5, 1.0];
	
	drawQuadVC(canvas, gl, v2, RGBAQuad);
}