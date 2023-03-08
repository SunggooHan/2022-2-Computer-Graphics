var gl;
var points;

var t;

var theta = 0.0;
var thetaLoc;
var delay=100;
var direction=true;

var maxNumTriangles=200;
var maxNumVertices=3*maxNumTriangles;
var index=0;
var canvas

var colors=[
	vec4(0,0,0,1),
	vec4(1,0,0,1),
	vec4(1,1,0,1),
	vec4(0,1,0,1),
	vec4(0,0,1,1),
	vec4(1,0,1,1),
	vec4(0,1,1,1),
	];

window.onload = function init() {
    canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

	canvas.addEventListener("mousedown",function(event){
		gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
		t = vec2(2*event.clientX/canvas.width-1, 2*(canvas.height-event.clientY)/canvas.height-1);
		gl.bufferSubData(gl.ARRAY_BUFFER, 8*index, flatten(t));
		
		gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
		t=vec4(colors[(index)%7]);
		gl.bufferSubData(gl.ARRAY_BUFFER, 16*index, flatten(t));
		
		index++
	});
	
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.0, 0.0, 0.0, 1.0 );
	
	var program = initShaders(gl, "vertex-shader", "fragment-shader");
	gl.useProgram(program);
	
	var vBuffer=gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, 8*maxNumVertices, gl.STATIC_DRAW);

	var vPosition=gl.getAttribLocation(program, "vPosition");
	gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray(vPosition);
	
	var cBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, 16*maxNumVertices, gl.STATIC_DRAW);

	var vColor=gl.getAttribLocation(program, "vColor");
	gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray(vColor);

	document.getElementById("Direction").onclick=function(){
		console.log(event.button)
		direction=!direction;
	}

	document.getElementById("slider").onchange = function(event) {
		console.log(event.srcElement.value);
		delay = event.srcElement.value; 
		clearInterval(intervalId);
		intervalId = setInterval(render,delay);
	};
		
	render();
};


function render() {
    drawOthers();
	drawSun();
	drawCloud();
	gl.drawArrays( gl.POINTS, 0, index );
	
	window.requestAnimationFrame(render);
}

function drawOthers(){
	//  Load shaders and initialize attribute buffers
	var program = initShaders( gl, "vertex-shader", "fragment-shader" );
	gl.useProgram( program );
	
	// offset it to the screen
	var vOffset = gl.getUniformLocation(program, " vOffset ");
	gl.uniform4fv(vOffset, [0, 0, 0, 1]);

	// Associate out shader variables with our data buffer
	var vPosition = gl.getAttribLocation(program, "vPosition");
	var vColor = gl.getAttribLocation(program, "vColor");

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
	
	gl.drawArrays(gl.TRIANGLE_STRIP, 0, 6);
	
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
	
	gl.drawArrays(gl.TRIANGLE_STRIP, 0, 6);
	
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
	
	gl.drawArrays(gl.TRIANGLE_STRIP, 0, 6);
	
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
	
	gl.drawArrays(gl.TRIANGLE_STRIP, 0, 15);
	
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
	
	gl.drawArrays(gl.TRIANGLE_STRIP, 0, 15);
	
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
	
	gl.drawArrays(gl.TRIANGLE_STRIP, 0, 15);
	
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
	
	gl.drawArrays(gl.TRIANGLE_STRIP, 0, 6);
	
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
	
	gl.drawArrays(gl.TRIANGLE_STRIP, 0, 6);
	
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
	
	gl.drawArrays(gl.TRIANGLE_STRIP, 0, 6);
	
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
	
	gl.drawArrays(gl.TRIANGLE_STRIP, 0, 6);
	
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
	
	gl.drawArrays(gl.TRIANGLE_STRIP, 0, 24);
}

function drawSun(){
	//  Load shaders and initialize attribute buffers
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
	var vPosition = gl.getAttribLocation(program, "vPosition");
    var vColor = gl.getAttribLocation(program, "vColor");

	// sun vertices
	var sunVertices = [	
		vec2(0.3,0), //v0
		vec2(0, 0), //center
        vec2(0.15,  0.25), //v1
		vec2(0,0), //center
        vec2(-0.15,  0.25), //v2
		vec2(0,0), //center
        vec2(-0.3, 0), //v3
        vec2(-0.15,-0.25), //v4
		vec2(0,0), //center
        vec2(0.15,-0.25), //v5
		vec2(0,0), //center
        vec2(0.3,0), //v6
    ];

	// Load the data into the GPU
	var sunBufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, sunBufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(sunVertices), gl.STATIC_DRAW );

	// Draw the sun
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray( vPosition );

	var uOffset=gl.getUniformLocation(program,"uOffset");
	gl.uniform4fv(uOffset,[1,0,0,0]);
	
	gl.disableVertexAttribArray( vColor );
	gl.vertexAttrib4f(vColor, 1.0, 0.0, 0.0, 1.0);
	thetaLoc = gl.getUniformLocation( program, "theta" );
	theta += (direction?0.1:-0.1);
	gl.uniform1f( thetaLoc, theta );
	gl.drawArrays( gl.TRIANGLE_STRIP, 0, 12 );
}

function drawCloud(){
	//  Load shaders and initialize attribute buffers
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
	var vPosition = gl.getAttribLocation(program, "vPosition");
    var vColor = gl.getAttribLocation(program, "vColor");

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

		thetaLoc = gl.getAttribLocation( program, "theta" );
		theta += (direction?0.1:-0.1);
		gl.VertexAttrib1f( thetaLoc, theta );
		gl.drawArrays(gl.TRIANGLE_STRIP, 0, 12);
		
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

		thetaLoc = gl.getAttribLocation( program, "theta" );
		theta += (direction?0.1:-0.1);
		gl.VertexAttrib1f( thetaLoc, theta );
		gl.drawArrays(gl.TRIANGLE_STRIP, 0, 12);
		
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

		thetaLoc = gl.getAttribLocation( program, "theta" );
		theta += (direction?0.1:-0.1);
		gl.VertexAttrib1f( thetaLoc, theta );
		gl.drawArrays(gl.TRIANGLE_STRIP, 0, 12);
}