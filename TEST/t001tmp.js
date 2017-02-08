
var marks = [];
var canvasValid = false;
var isDrag = false;
var canvas;
var cvs;
var tmpcanvas;
var tcvs;
var msel;
var mx, my;


function SetPlayerName(e){
    var name = document.getElementById("playername").value;
    if(msel){
	if(msel.isSelected){
	    msel.text=name;
	    invalidate();
	}
    }
}

window.onload = function(){
    
    canvas = document.getElementById("mycanvas");
    cvs = canvas.getContext("2d");

    // tmpcanvas = document.createElement("canvas");
    // tmpcanvas.width = canvas.width;
    // tmpcanvas.height = canvas.height;
    // tcvs = tmpcanvas.getContext('2d');
    
    canvas.onselectstart = function () { return false; }

    setInterval(draw, 20);
    canvas.addEventListener("dblclick", mDblclick, false); 
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

function Marker(){
    this.x=0;
    this.y=0;
    this.r=7;
    this.fill="#ff7777"
    this.text=""
    this.isSelected=false;
}


function mDblclick(e){
    var fill = "#ff7777";
    getmouse(e);
    
    var mark = new Marker;
    mark.x=mx;
    mark.y=my;
    mark.r=7;
    mark.fill="#f00000";
    mark.text="me";
    mark.isSelected=false;
    marks.push(mark);

    invalidate();
}


function drawmarks(){

    var l = marks.length ;
    for (var i = 0; i < l ; i++)
	draw_a_mark(cvs, marks[i]);
}

function draw_a_mark(ctx, mk){
    ctx.beginPath();
    ctx.lineWidth=10;
    ctx.strokeStyle="#0000ff";
    
    ctx.arc(mk.x, mk.y, mk.r , 0, Math.PI*2, false);
    ctx.stroke();

    ctx.font="10pt sans-serif bold";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.fillStyle = "#0000ff";
    ctx.fillText(mk.text , mk.x, mk.y+8);

}

function draw_a_mark2(ctx, mk){

    ctx.save();

//    ctx.shadowOffsetX=2;
//    ctx.shadowOffsetY=2;
//    ctx.shadowColor="#aaaaaa";
//    ctx.shadowBlur=7;

    if (mk.isSelected){
	ctx.beginPath();
	ctx.lineWidth=10;
	ctx.strokeStyle="#0000ff";
	ctx.arc(mk.x, mk.y-5, mk.r+2 , 0, Math.PI*2, false);
//	ctx.stroke;
//	ctx.fillStyle="#0000ff";
//	ctx.fill();
//	ctx.closePath();

//	ctx.beginPath();

//	ctx.beginPath();
//	ctx.arc(mk.x, mk.y, mk.r , 0, Math.PI*2, false);
//	ctx.fillStyle=mk.fill;
//	ctx.fill();
//	ctx.closePath();


	
    }else{
	ctx.beginPath();
	ctx.arc(mk.x, mk.y, mk.r , 0, Math.PI*2, false);
	ctx.stroke;
	ctx.fillStyle=mk.fill;
//	ctx.fill();
	ctx.closePath();
    }
//    ctx.closePath();

//    ctx.restore();

    ctx.font="10pt sans-serif bold";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.fillStyle = "#0000ff";
    ctx.fillText(mk.text , mk.x, mk.y+8);

    ctx.restore();
}


function drawpitch(){

    cvs.beginPath();
    cvs.lineWidth=10;
    cvs.strokeStyle="#ff00ff";
    cvs.arc(100, 100, 50 , 0, Math.PI*2, false);
    cvs.stroke();
    cvs.closePath();
}

function drawpitch_(){



    cvs.save();

    var cw = canvas.width;
    var ch = canvas.height;

    var xoff = cw*0.2;
    var pw = (cw - xoff*2);
    var ph = pw*68/50;

    var yoff = ch-ph*5/8-xoff;

    cvs.lineWidth=0.5;
    cvs.lineJoin="round";
    cvs.strokeStyle="#0000ff";

    //Center Circle
    cvs.beginPath();
    cvs.arc(xoff+pw/2,ch-yoff-ph/2, 7/50*pw , 0, Math.PI*2, false);
    cvs.stroke();

    cvs.beginPath();
    cvs.arc(100, 100, 50 , 0, Math.PI*2, false);
    cvs.stroke();

    cvs.beginPath();
    cvs.arc(500, 100, 50 , 0, Math.PI*2, false);
    cvs.stroke();


    cvs.beginPath();
    cvs.arc(200, 500, 50 , 0, Math.PI*2, false);
    cvs.stroke();

//    cvs.closePath();
//    cvs.strokeStyle="#ff00ff";
//    cvs.lineWidth=10;

    cvs.restore();




}


