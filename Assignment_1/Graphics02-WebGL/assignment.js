var gl;
var points;

window.onload = function init() {
    var canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

	// sky vertex position
	var skyVertices = [ vec2(-1,1), vec2(-1,-0.35), vec2(1,1), 
                        vec2(1,-0.35), vec2(1,1), vec2(-1,-0.35)];

	// sky vertex color
	var skyColors = [
		vec4(0.5, 0.7, 1.0, 1.0),
		vec4(1.0, 1.0, 1.0, 1.0),
		vec4(0.5, 0.7, 1.0, 1.0),
		vec4(1.0, 1.0, 1.0, 1.0),
		vec4(0.5, 0.7, 1.0, 1.0),
		vec4(1.0, 1.0, 1.0, 1.0),
	]

	// ground vertex position
	var groundVertices = [ vec2(-1,-0.35), vec2(-1,-0.8), vec2(1,-0.35),
                            vec2(-1,-0.8), vec2(1,-0.35), vec2(1,-0.8)];

	// ground vertex color
	var groundColors = [
		vec4(0.64, 0.58, 0.50, 1.0),
		vec4(0.52, 0.37, 0.26, 1.0),
		vec4(0.64, 0.58, 0.50, 1.0),
		vec4(0.52, 0.37, 0.26, 1.0),
		vec4(0.64, 0.58, 0.50, 1.0),
		vec4(0.52, 0.37, 0.26, 1.0),
	]

	// street vertex position
	var streetVertices = [ vec2(-1,-0.8), vec2(1,-0.8), vec2(-1,-1),
							vec2(-1,-1), vec2(1,-0.8), vec2(1,-1)];

	// street vertex color
	var streetColors = [
		vec4(0.30, 0.30, 0.30, 1.0),
		vec4(0.30, 0.30, 0.30, 1.0),
		vec4(0.30, 0.30, 0.30, 1.0),
		vec4(0.30, 0.30, 0.30, 1.0),
		vec4(0.30, 0.30, 0.30, 1.0),
		vec4(0.30, 0.30, 0.30, 1.0),
	]

    //tree vertex position
    var treeVertices = [
		vec2(0.45, 0.4), vec2(0.25, 0.2), vec2(0.65, 0.2), 
		vec2(0.45, 0.2), vec2(0.25, 0), vec2(0.65, 0), 
		vec2(0.45, 0.0), vec2(0.25, -0.2), vec2(0.65, -0.2), 
		vec2(0.4, -0.2), vec2(0.4, -0.4), vec2(0.5, -0.2), 
		vec2(0.4, -0.4), vec2(0.5, -0.2), vec2(0.5, -0.4), 
    ];

    // tree vertex color
	var treeColors = [
		vec4(0.14, 0.83, 0.19, 1.0),
		vec4(0.14, 0.83, 0.19, 1.0),
		vec4(0.14, 0.83, 0.19, 1.0),
		vec4(0.13, 0.55, 0.13, 1.0),
		vec4(0.13, 0.55, 0.13, 1.0),
		vec4(0.13, 0.55, 0.13, 1.0),
		vec4(0.13, 0.37, 0.13, 1.0),
		vec4(0.13, 0.37, 0.13, 1.0),
		vec4(0.13, 0.37, 0.13, 1.0),
		vec4(0.52, 0.37, 0.26, 1.0),
		vec4(0.52, 0.37, 0.26, 1.0),
		vec4(0.52, 0.37, 0.26, 1.0),
		vec4(0.52, 0.37, 0.26, 1.0),
		vec4(0.52, 0.37, 0.26, 1.0),
		vec4(0.52, 0.37, 0.26, 1.0),
	]

    // tree 2 vertex position
	var tree2Vertices = [
		vec2(-0.9, 0.35), vec2(-1.1, 0.15), vec2(-0.7, 0.15), 
		vec2(-0.9, 0.15), vec2(-1.1, -0.05), vec2(-0.7, -0.05), 
		vec2(-0.9, -0.05), vec2(-1.1, -0.25), vec2(-0.7, -0.25), 
		vec2(-0.95, -0.25), vec2(-0.95, -0.45), vec2(-0.85, -0.25), 
		vec2(-0.95, -0.45), vec2(-0.85, -0.25), vec2(-0.85, -0.45), 
	];

	// tree 2 vertex color
	var tree2Colors = [
		vec4(0.14, 0.83, 0.19, 1.0),
		vec4(0.14, 0.83, 0.19, 1.0),
		vec4(0.14, 0.83, 0.19, 1.0),
		vec4(0.13, 0.55, 0.13, 1.0),
		vec4(0.13, 0.55, 0.13, 1.0),
		vec4(0.13, 0.55, 0.13, 1.0),
		vec4(0.13, 0.37, 0.13, 1.0),
		vec4(0.13, 0.37, 0.13, 1.0),
		vec4(0.13, 0.37, 0.13, 1.0),
		vec4(0.52, 0.37, 0.26, 1.0),
		vec4(0.52, 0.37, 0.26, 1.0),
		vec4(0.52, 0.37, 0.26, 1.0),
		vec4(0.52, 0.37, 0.26, 1.0),
		vec4(0.52, 0.37, 0.26, 1.0),
		vec4(0.52, 0.37, 0.26, 1.0),
	]

	//tree3 vertex position
    var tree3Vertices = [
		vec2(0.65, 0.1), vec2(0.45, -0.1), vec2(0.85, -0.1), 
		vec2(0.65, -0.1), vec2(0.45, -0.3), vec2(0.85, -0.3), 
		vec2(0.65, -0.3), vec2(0.45, -0.5), vec2(0.85, -0.5), 
		vec2(0.6, -0.5), vec2(0.6, -0.7), vec2(0.7, -0.5), 
		vec2(0.6, -0.7), vec2(0.7, -0.5), vec2(0.7, -0.7), 
    ];

    // tree3 vertex color
	var tree3Colors = [
		vec4(0.14, 0.83, 0.19, 1.0),
		vec4(0.14, 0.83, 0.19, 1.0),
		vec4(0.14, 0.83, 0.19, 1.0),
		vec4(0.13, 0.55, 0.13, 1.0),
		vec4(0.13, 0.55, 0.13, 1.0),
		vec4(0.13, 0.55, 0.13, 1.0),
		vec4(0.13, 0.37, 0.13, 1.0),
		vec4(0.13, 0.37, 0.13, 1.0),
		vec4(0.13, 0.37, 0.13, 1.0),
		vec4(0.52, 0.37, 0.26, 1.0),
		vec4(0.52, 0.37, 0.26, 1.0),
		vec4(0.52, 0.37, 0.26, 1.0),
		vec4(0.52, 0.37, 0.26, 1.0),
		vec4(0.52, 0.37, 0.26, 1.0),
		vec4(0.52, 0.37, 0.26, 1.0),
	]

	// cloud vertex position
	var cloudVertices = [
		vec2(-0.85, 0.7), vec2(-0.9, 0.6), vec2(-0.85, 0.5), 
		vec2(-0.85, 0.7), vec2(-0.85, 0.5), vec2(-0.65, 0.7), 
		vec2(-0.65, 0.7), vec2(-0.85, 0.5), vec2(-0.65, 0.5), 
		vec2(-0.65, 0.7), vec2(-0.6, 0.6), vec2(-0.65, 0.5), 
	];

	// cloud vertex color
	var cloudColors = [
		vec4(1.0, 1.0, 1.0, 1.0),
		vec4(1.0, 1.0, 1.0, 1.0),
		vec4(1.0, 1.0, 1.0, 1.0),
		vec4(1.0, 1.0, 1.0, 1.0),
		vec4(1.0, 1.0, 1.0, 1.0),
		vec4(1.0, 1.0, 1.0, 1.0),
		vec4(1.0, 1.0, 1.0, 1.0),
		vec4(1.0, 1.0, 1.0, 1.0),
		vec4(1.0, 1.0, 1.0, 1.0),
		vec4(1.0, 1.0, 1.0, 1.0),
		vec4(1.0, 1.0, 1.0, 1.0),
		vec4(1.0, 1.0, 1.0, 1.0),
	]

	// second cloud vertex position
	var cloud2Vertices = [
		vec2(-0.45, 0.9), vec2(-0.55, 0.75), vec2(-0.45, 0.6), 
		vec2(-0.45, 0.9), vec2(-0.45, 0.6), vec2(-0.2, 0.9), 
		vec2(-0.2, 0.9), vec2(-0.45, 0.6), vec2(-0.2, 0.6), 
		vec2(-0.2, 0.9), vec2(-0.1, 0.75), vec2(-0.2, 0.6), 
	];

	// second cloud vertex color
	var cloud2Colors = [
		vec4(1.0, 1.0, 1.0, 1.0),
		vec4(1.0, 1.0, 1.0, 1.0),
		vec4(1.0, 1.0, 1.0, 1.0),
		vec4(1.0, 1.0, 1.0, 1.0),
		vec4(1.0, 1.0, 1.0, 1.0),
		vec4(1.0, 1.0, 1.0, 1.0),
		vec4(1.0, 1.0, 1.0, 1.0),
		vec4(1.0, 1.0, 1.0, 1.0),
		vec4(1.0, 1.0, 1.0, 1.0),
		vec4(1.0, 1.0, 1.0, 1.0),
		vec4(1.0, 1.0, 1.0, 1.0),
		vec4(1.0, 1.0, 1.0, 1.0),
	]

	// third cloud vertex position
	var cloud3Vertices = [
		vec2(0.1, 0.7), vec2(0.05, 0.6), vec2(0.1, 0.5), 
		vec2(0.1, 0.7), vec2(0.3, 0.7), vec2(0.1, 0.5), 
		vec2(0.3, 0.5), vec2(0.3, 0.7), vec2(0.1, 0.5), 
		vec2(0.3, 0.5), vec2(0.3, 0.7), vec2(0.35, 0.6), 
	];

	// third cloud vertex color
	var cloud3Colors = [
		vec4(1.0, 1.0, 1.0, 1.0),
		vec4(1.0, 1.0, 1.0, 1.0),
		vec4(1.0, 1.0, 1.0, 1.0),
		vec4(1.0, 1.0, 1.0, 1.0),
		vec4(1.0, 1.0, 1.0, 1.0),
		vec4(1.0, 1.0, 1.0, 1.0),
		vec4(1.0, 1.0, 1.0, 1.0),
		vec4(1.0, 1.0, 1.0, 1.0),
		vec4(1.0, 1.0, 1.0, 1.0),
		vec4(1.0, 1.0, 1.0, 1.0),
		vec4(1.0, 1.0, 1.0, 1.0),
		vec4(1.0, 1.0, 1.0, 1.0),
	]

	// sun vertex position
	var sunVertices = [
		vec2(0.7, 0.9), vec2(0.6, 0.8), vec2(0.7, 0.7),
		vec2(0.7, 0.9), vec2(0.8, 0.8), vec2(0.7, 0.7),
	];

	// sun vertex color
	var sunColors = [
		vec4(1.0, 1.0, 0.0, 1.0),
		vec4(1.0, 1.0, 0.0, 1.0),
		vec4(1.0, 1.0, 0.0, 1.0),
		vec4(1.0, 1.0, 0.0, 1.0),
		vec4(1.0, 1.0, 0.0, 1.0),
		vec4(1.0, 1.0, 0.0, 1.0),
	]

	// lake vertex position
	var lakeVertices = [
		vec2(-0.55, -0.45), vec2(-0.75, -0.6), vec2(-0.55, -0.75), 
		vec2(-0.55, -0.45), vec2(-0.35, -0.45), vec2(-0.55, -0.75), 
		vec2(-0.35, -0.45), vec2(-0.55, -0.75), vec2(-0.35, -0.75), 
		vec2(-0.35, -0.45), vec2(-0.15, -0.45), vec2(-0.35, -0.75), 
		vec2(-0.15, -0.45), vec2(-0.35, -0.75), vec2(-0.15, -0.75), 
		vec2(-0.15, -0.75), vec2(-0.15, -0.45), vec2(0.05, -0.45), 
		vec2(0.05, -0.45), vec2(-0.15, -0.75), vec2(0.05, -0.75), 
		vec2(0.05, -0.45), vec2(0.05, -0.75), vec2(0.25, -0.6), 
	];

	// lake vertex color
	var lakeColors = [
		vec4(0, 0, 1.0, 1.0),
		vec4(0, 0, 1.0, 1.0),
		vec4(0, 0, 1.0, 1.0),
		vec4(0, 0, 1.0, 1.0),
		vec4(0, 0, 1.0, 1.0),
		vec4(0, 0, 1.0, 1.0),
		vec4(0, 0, 1.0, 1.0),
		vec4(0, 0, 1.0, 1.0),
		vec4(0, 0, 1.0, 1.0),
		vec4(0, 0, 1.0, 1.0),
		vec4(0, 0, 1.0, 1.0),
		vec4(0, 0, 1.0, 1.0),
		vec4(0, 0, 1.0, 1.0),
		vec4(0, 0, 1.0, 1.0),
		vec4(0, 0, 1.0, 1.0),
		vec4(0, 0, 1.0, 1.0),
		vec4(0, 0, 1.0, 1.0),
		vec4(0, 0, 1.0, 1.0),
		vec4(0, 0, 1.0, 1.0),
		vec4(0, 0, 1.0, 1.0),
		vec4(0, 0, 1.0, 1.0),
		vec4(0, 0, 1.0, 1.0),
		vec4(0, 0, 1.0, 1.0),
		vec4(0, 0, 1.0, 1.0),
	]

	// roof vertex position
	var roofVertices = [
		vec2(-0.55, 0.55), vec2(-0.85, 0.2), vec2(0, 0.55), 
		vec2(-0.85, 0.2), vec2(0, 0.55), vec2(0.3, 0.2), 
	];

	// roof vertex color
	var roofColors = [
		vec4(1, 0.5, 0.76, 1.0),
		vec4(1, 0.5, 0.76, 1.0),
		vec4(1, 0.5, 0.76, 1.0),
		vec4(1, 0.5, 0.76, 1.0),
		vec4(1, 0.5, 0.76, 1.0),
		vec4(1, 0.5, 0.76, 1.0),
	]

	// wall vertex position
	var wallVertices = [
		vec2(-0.6, 0.2), vec2(-0.6, -0.35), vec2(0.05, 0.2), 
		vec2(-0.6, -0.35), vec2(0.05, 0.2), vec2(0.05, -0.35), 
	];

	// wall vertex color
	var wallColors = [
		vec4(0.5, 0.5, 0.5, 1.0),
		vec4(0.5, 0.5, 0.5, 1.0),
		vec4(0.5, 0.5, 0.5, 1.0),
		vec4(0.5, 0.5, 0.5, 1.0),
		vec4(0.5, 0.5, 0.5, 1.0),
		vec4(0.5, 0.5, 0.5, 1.0),
	]

	// second wall vertex position
	var wall2Vertices = [
		vec2(-0.6, -0.35), vec2(-0.6, -0.25), vec2(0.05, -0.35), 
		vec2(0.05, -0.35), vec2(-0.6, -0.25), vec2(0.05, -0.25), 
	];

	// second wall vertex color
	var wall2Colors = [
		vec4(0.78, 0.63, 0.42, 1.0),
		vec4(0.93, 0.81, 0.63, 1.0),
		vec4(0.93, 0.81, 0.63, 1.0),
		vec4(0.93, 0.81, 0.63, 1.0),
		vec4(0.78, 0.63, 0.42, 1.0),
		vec4(0.78, 0.63, 0.42, 1.0),
	]

	// door vertex position
	var doorVertices = [
		vec2(-0.4, -0.25), vec2(-0.4, 0), vec2(-0.3, -0.25), 
		vec2(-0.3, -0.25), vec2(-0.4, 0), vec2(-0.3, 0), 
	];

	// door vertex color
	var doorColors = [
		vec4(0.93, 0.81, 0.63, 1.0),
		vec4(0.93, 0.81, 0.63, 1.0),
		vec4(0.93, 0.81, 0.63, 1.0),
		vec4(0.93, 0.81, 0.63, 1.0),
		vec4(0.93, 0.81, 0.63, 1.0),
		vec4(0.93, 0.81, 0.63, 1.0),
	]

    //  Configure WebGL
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.0, 0.0, 0.0, 1.0 );
    
    //  Load shaders and initialize attribute buffers
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

	// offset it to the screen
	var vOffset = gl.getUniformLocation(program, " vOffset ");
	gl.uniform4fv(vOffset, [0, 0, 0, 1]);

    // sky vertex position
	var vertexPositionBufferId = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBufferId);
	gl.bufferData(gl.ARRAY_BUFFER, flatten(skyVertices), gl.STATIC_DRAW);
	
	var vPosition = gl.getAttribLocation(program, "vPosition");
	gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray( vPosition );
	
	// sky vertex color
	var vertexColorBufferId = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBufferId);
	gl.bufferData(gl.ARRAY_BUFFER, flatten(skyColors), gl.STATIC_DRAW);
	
	var vColor = gl.getAttribLocation(program, "vColor");
	gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray( vColor );
    
	// render
	var first = 0
	var count = 6
	render(first, count)
	
	// ground vertex position
	var vertexPositionBufferId = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBufferId);
	gl.bufferData(gl.ARRAY_BUFFER, flatten(groundVertices), gl.STATIC_DRAW);
	
	var vPosition = gl.getAttribLocation(program, "vPosition");
	gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray( vPosition );
	
	// ground vertex color
	var vertexColorBufferId = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBufferId);
	gl.bufferData(gl.ARRAY_BUFFER, flatten(groundColors), gl.STATIC_DRAW);
	
	var vColor = gl.getAttribLocation(program, "vColor");
	gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray( vColor );
    
	// render
	var first = 0
	var count = 6
	render(first, count)
	
	// street vertex position
	var vertexPositionBufferId = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBufferId);
	gl.bufferData(gl.ARRAY_BUFFER, flatten(streetVertices), gl.STATIC_DRAW);
	
	var vPosition = gl.getAttribLocation(program, "vPosition");
	gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray( vPosition );
	
	// street vertex color
	var vertexColorBufferId = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBufferId);
	gl.bufferData(gl.ARRAY_BUFFER, flatten(streetColors), gl.STATIC_DRAW);
	
	var vColor = gl.getAttribLocation(program, "vColor");
	gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray( vColor );
    
	// render
	var first = 0
	var count = 6
	render(first, count)

    // first tree vertex position
	var vertexPositionBufferId = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBufferId);
	gl.bufferData(gl.ARRAY_BUFFER, flatten(treeVertices), gl.STATIC_DRAW);
	
	var vPosition = gl.getAttribLocation(program, "vPosition");
	gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray( vPosition );
	
	// first tree vertex color
	var vertexColorBufferId = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBufferId);
	gl.bufferData(gl.ARRAY_BUFFER, flatten(treeColors), gl.STATIC_DRAW);
	
	var vColor = gl.getAttribLocation(program, "vColor");
	gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray( vColor );
    
	// render
	var first = 0
	var count = 15
	render(first, count)

    // second tree vertex position
	var vertexPositionBufferId = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBufferId);
	gl.bufferData(gl.ARRAY_BUFFER, flatten(tree2Vertices), gl.STATIC_DRAW);
	
	var vPosition = gl.getAttribLocation(program, "vPosition");
	gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray( vPosition );
	
	// second tree vertex color
	var vertexColorBufferId = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBufferId);
	gl.bufferData(gl.ARRAY_BUFFER, flatten(tree2Colors), gl.STATIC_DRAW);
	
	var vColor = gl.getAttribLocation(program, "vColor");
	gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray( vColor );
    
	// render
	var first = 0
	var count = 15
	render(first, count)

	// third tree vertex position
	var vertexPositionBufferId = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBufferId);
	gl.bufferData(gl.ARRAY_BUFFER, flatten(tree3Vertices), gl.STATIC_DRAW);
	
	var vPosition = gl.getAttribLocation(program, "vPosition");
	gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray( vPosition );
	
	// third tree vertex color
	var vertexColorBufferId = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBufferId);
	gl.bufferData(gl.ARRAY_BUFFER, flatten(tree3Colors), gl.STATIC_DRAW);
	
	var vColor = gl.getAttribLocation(program, "vColor");
	gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray( vColor );
    
	// render
	var first = 0
	var count = 15
	render(first, count)

	// first cloud vertex position
	var vertexPositionBufferId = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBufferId);
	gl.bufferData(gl.ARRAY_BUFFER, flatten(cloudVertices), gl.STATIC_DRAW);
	
	var vPosition = gl.getAttribLocation(program, "vPosition");
	gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray( vPosition );
	
	// first cloud vertex color
	var vertexColorBufferId = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBufferId);
	gl.bufferData(gl.ARRAY_BUFFER, flatten(cloudColors), gl.STATIC_DRAW);
	
	var vColor = gl.getAttribLocation(program, "vColor");
	gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray( vColor );
    
	// render
	var first = 0
	var count = 12
	render(first, count)
	
	// second cloud vertex position
	var vertexPositionBufferId = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBufferId);
	gl.bufferData(gl.ARRAY_BUFFER, flatten(cloud2Vertices), gl.STATIC_DRAW);
	
	var vPosition = gl.getAttribLocation(program, "vPosition");
	gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray( vPosition );
	
	// second cloud vertex color
	var vertexColorBufferId = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBufferId);
	gl.bufferData(gl.ARRAY_BUFFER, flatten(cloud2Colors), gl.STATIC_DRAW);
	
	var vColor = gl.getAttribLocation(program, "vColor");
	gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray( vColor );
    
	// render
	var first = 0
	var count = 12
	render(first, count)
	
	// third cloud vertex position
	var vertexPositionBufferId = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBufferId);
	gl.bufferData(gl.ARRAY_BUFFER, flatten(cloud3Vertices), gl.STATIC_DRAW);
	
	var vPosition = gl.getAttribLocation(program, "vPosition");
	gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray( vPosition );
	
	// third cloud vertex color
	var vertexColorBufferId = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBufferId);
	gl.bufferData(gl.ARRAY_BUFFER, flatten(cloud3Colors), gl.STATIC_DRAW);
	
	var vColor = gl.getAttribLocation(program, "vColor");
	gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray( vColor );
    
	// render
	var first = 0
	var count = 12
	render(first, count)

	// sun vertex position
	var vertexPositionBufferId = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBufferId);
	gl.bufferData(gl.ARRAY_BUFFER, flatten(sunVertices), gl.STATIC_DRAW);
	
	var vPosition = gl.getAttribLocation(program, "vPosition");
	gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray( vPosition );
	
	// sun vertex color
	var vertexColorBufferId = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBufferId);
	gl.bufferData(gl.ARRAY_BUFFER, flatten(sunColors), gl.STATIC_DRAW);
	
	var vColor = gl.getAttribLocation(program, "vColor");
	gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray( vColor );
    
	// render
	var first = 0
	var count = 12
	render(first, count)

	// lake vertex position
	var vertexPositionBufferId = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBufferId);
	gl.bufferData(gl.ARRAY_BUFFER, flatten(lakeVertices), gl.STATIC_DRAW);
	
	var vPosition = gl.getAttribLocation(program, "vPosition");
	gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray( vPosition );
	
	// lake vertex color
	var vertexColorBufferId = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBufferId);
	gl.bufferData(gl.ARRAY_BUFFER, flatten(lakeColors), gl.STATIC_DRAW);
	
	var vColor = gl.getAttribLocation(program, "vColor");
	gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray( vColor );
    
	// render
	var first = 0
	var count = 24
	render(first, count)
	
	// roof vertex position
	var vertexPositionBufferId = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBufferId);
	gl.bufferData(gl.ARRAY_BUFFER, flatten(roofVertices), gl.STATIC_DRAW);
	
	var vPosition = gl.getAttribLocation(program, "vPosition");
	gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray( vPosition );
	
	// roof vertex color
	var vertexColorBufferId = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBufferId);
	gl.bufferData(gl.ARRAY_BUFFER, flatten(roofColors), gl.STATIC_DRAW);
	
	var vColor = gl.getAttribLocation(program, "vColor");
	gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray( vColor );
    
	// render
	var first = 0
	var count = 6
	render(first, count)
	
	// wall vertex position
	var vertexPositionBufferId = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBufferId);
	gl.bufferData(gl.ARRAY_BUFFER, flatten(wallVertices), gl.STATIC_DRAW);
	
	var vPosition = gl.getAttribLocation(program, "vPosition");
	gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray( vPosition );
	
	// wall vertex color
	var vertexColorBufferId = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBufferId);
	gl.bufferData(gl.ARRAY_BUFFER, flatten(wallColors), gl.STATIC_DRAW);
	
	var vColor = gl.getAttribLocation(program, "vColor");
	gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray( vColor );
    
	// render
	var first = 0
	var count = 6
	render(first, count)
	
	// second wall vertex position
	var vertexPositionBufferId = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBufferId);
	gl.bufferData(gl.ARRAY_BUFFER, flatten(wall2Vertices), gl.STATIC_DRAW);
	
	var vPosition = gl.getAttribLocation(program, "vPosition");
	gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray( vPosition );
	
	// second wall vertex color
	var vertexColorBufferId = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBufferId);
	gl.bufferData(gl.ARRAY_BUFFER, flatten(wall2Colors), gl.STATIC_DRAW);
	
	var vColor = gl.getAttribLocation(program, "vColor");
	gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray( vColor );
    
	// render
	var first = 0
	var count = 6
	render(first, count)

	// door vertex position
	var vertexPositionBufferId = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBufferId);
	gl.bufferData(gl.ARRAY_BUFFER, flatten(doorVertices), gl.STATIC_DRAW);
	
	var vPosition = gl.getAttribLocation(program, "vPosition");
	gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray( vPosition );
	
	// door vertex color
	var vertexColorBufferId = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBufferId);
	gl.bufferData(gl.ARRAY_BUFFER, flatten(doorColors), gl.STATIC_DRAW);
	
	var vColor = gl.getAttribLocation(program, "vColor");
	gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray( vColor );
    
	// render
	var first = 0
	var count = 6
	render(first, count)
};


function render(first, count) {
    gl.drawArrays( gl.TRIANGLES, first, count );
}