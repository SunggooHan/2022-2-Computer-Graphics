var gl;
var points;
window.onload = function init()
{
    var canvas = document.getElementById("gl-canvas");

    gl = WebGLUtils.setupWebGL(canvas);
    if(!gl){ alert("WebGL isn't available");}

    //시작
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram(program);

    var positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    var vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    var resolutionUniformLocation = gl.getUniformLocation(program, "vResolution");
    var colorLoc = gl.getUniformLocation(program, "fColor");

    gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);

    function setRectangle(gl, x, y, width, height){
        var x1 = x;
        var x2 = x + width;
        var y1 = y;
        var y2 = y + height;
        
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
           x1, y1,
           x2, y1,
           x1, y2,
           x1, y2,
           x2, y1,
           x2, y2]), gl.STATIC_DRAW);
      }


    function randomInt(range){
        return Math.floor(Math.random()*range);
    }

    for(var i=0;i<50;i++){
        setRectangle(gl, randomInt(300), randomInt(300), randomInt(300), randomInt(300));

        gl.uniform4f(colorLoc, Math.random(), Math.random(), Math.random(), 1);
        
        var primitiveType=gl.TRIANGLES;
        var offset = 0;
        var count = 6;
        gl.drawArrays(primitiveType,offset,count);
        
    }
};