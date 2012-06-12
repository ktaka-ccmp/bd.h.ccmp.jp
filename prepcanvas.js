var marks = [];
var canvasValid = false;
var isDrag = false;
var canvas;
var cvs;
var tmpcanvas;
var tcvs;
var msel;
var mx, my;
var MarkerColor = "";

window.onload = function(){
    
    canvas = document.getElementById("mycanvas");
    cvs = canvas.getContext("2d");

    tmpcanvas = document.createElement("canvas");
    tmpcanvas.width = canvas.width;
    tmpcanvas.height = canvas.height;
    tcvs = tmpcanvas.getContext('2d');
    
    canvas.onselectstart = function () { return false; }

    setInterval(draw, 20);
    canvas.addEventListener("mouseup", mUp, false); 
    canvas.addEventListener("mousedown", mDown, false); 
    canvas.addEventListener("dblclick", mDblclick, false); 

    ListLocalStorage();
    ListMarkerColor();
  }

function draw(){ 
    if (canvasValid == false) {
	clearCanvas(cvs);
	drawpitch();
	drawmarks();
	canvasValid = true;
    }
}

function invalidate() {
    canvasValid = false;
}

function getmouse(e){
    var obj = canvas;
    var offsetX = 0;
    var offsetY = 0;

    if (obj.offsetParent) {
	do {
	    offsetX += obj.offsetLeft;
	    offsetY += obj.offsetTop;
	} while ((obj = obj.offsetParent));
    }

    mx = e.pageX - offsetX;
    my = e.pageY - offsetY
}

function clearCanvas(c) {
    c.clearRect(0,0,canvas.width,canvas.height);
}

function SaveCanvas(){
    var filename = document.getElementById("canvasImageName").value + ".png";
    var link = document.getElementById("savecanvas");
    var img = canvas.toDataURL();
    link.setAttribute("href", img);
    link.setAttribute("download",name|| filename);
}



