
var gl;
var points;

window.onload = function init()
{
    var canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }


    // hexagon vertices
	var hexagonVertices = [
        vec2(-0.3,  0.6), //v0
        vec2(-0.4,  0.8), //v1
        vec2(-0.6,  0.8), //v2
        vec2(-0.7,  0.6), //v3
        vec2(-0.6,  0.4), //v4
        vec2(-0.4,  0.4), //v5
        vec2(-0.3,  0.6), //v6
    ];


	// triangle vertices
    var triangleVertices = [
        vec2(0.3,  0.4), //v0
        vec2(0.7,  0.4), //v1
        vec2(0.5,  0.8), //v2
    ];


	var colors = [
        vec4(1.0, 0.0, 0.0, 1.0), //v0
        vec4(0.0, 1.0, 0.0, 1.0), //v1
        vec4(0.0, 0.0, 1.0, 1.0)  //v2
    ];



	// strip vertices
	var stripVertices = [
        vec2(-0.5,  0.2), //v0
        vec2(-0.4,  0.0), //v1
        vec2(-0.3,  0.2), //v2
        vec2(-0.2,  0.0), //v3
        vec2(-0.1,  0.2), //v4
        vec2(0.0,  0.0), //v5
        vec2(0.1,  0.2), //v6
        vec2(0.2,  0.0), //v7
        vec2(0.3,  0.2), //v8
        vec2(0.4,  0.0), //v9
        vec2(0.5,  0.2), //v10
        // start second strip
        vec2(-0.5, -0.3), //v11
        vec2(-0.4, -0.5), //v12
        vec2(-0.3, -0.3), //v13
        vec2(-0.2, -0.5), //v14
        vec2(-0.1, -0.3), //v15
        vec2(0.0, -0.5), //v16
        vec2(0.1, -0.3), //v17
        vec2(0.2, -0.5), //v18
        vec2(0.3, -0.3), //v19
        vec2(0.4, -0.5), //v20
        vec2(0.5, -0.3)  //v21
    ];


    //
    //  Configure WebGL
    //
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

    //  Load shaders and initialize attribute buffers
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    var vertexPosition1 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexPosition1);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(hexagonVertices), gl.STATIC_DRAW);

    var vPosition1 = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition1, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition1);

    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.LINE_STRIP, 0, 7);




    var vertexPosition2 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexPosition2);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(triangleVertices), gl.STATIC_DRAW);

    var vPosition2 = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition2, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition2);

    var vertexColor2 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexColor2);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW);

    var vColor2 = gl.getAttribLocation(program, "vColor");
    gl.vertexAttribPointer(vColor2, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vColor2);

    gl.drawArrays(gl.TRIANGLES, 0, 3);


    var vertexPosition3 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexPosition3);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(triangleVertices), gl.STATIC_DRAW);

    var vPosition3 = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition3, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition3);

    var vertexColor2 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexColor2);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW);

    var vColor2 = gl.getAttribLocation(program, "vColor");
    gl.vertexAttribPointer(vColor2, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vColor2);

    gl.drawArrays(gl.TRIANGLES, 0, 3);

};

