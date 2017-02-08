
var marks = [];
var canvasValid = false;
var isDrag = false;
var canvas;
var cvs;
var tmpcanvas;
var tcvs;
var msel;
var mx, my;


function LoadJsonFile(){
    var fp = document.getElementById("myfile").files[0];
    var reader = new FileReader();
    reader.readAsText(fp, "utf-8");
    reader.onload = function(){
//	document.getElementById("jsontest").innerHTML = reader.result;
	marks = JSON.parse(reader.result);
	invalidate();
    }
}

function SaveJsonFile(){
    var myjson = JSON.stringify(marks);
    var link = document.getElementById("savejsonfile");
    href = "data:application/octet-stream,"+encodeURIComponent(myjson);
    link.setAttribute("href", href);
//    document.getElementById("jsontest").innerHTML = href;
}

function SaveJsonLocal(){
    var myjson = JSON.stringify(marks);
    localStorage.setItem("formation", myjson);
    invalidate();
//    document.getElementById("jsontest").innerHTML = myjson;
}

function LoadJsonLocal(){
    var myjson = localStorage.getItem("formation");
    marks = JSON.parse(myjson);
    invalidate();
//    document.getElementById("jsontest").innerHTML = myjson;
}

function SetPlayerName(){
    var name = document.getElementById("playername").value;
    if(msel){
	if(msel.isSelected){
	    msel.text=name;
	    invalidate();
	}
    }
}

function DeleteSelected(){
    if(msel && msel.isSelected){
	    for (var i = 0; i < marks.length ; i++){
		if(marks[i].isSelected){
		    marks.splice(i,1);
		    invalidate();
		}
	    }
    }
}

function PastePlayerNameInTextArea(){
    if(msel){
	if(msel.isSelected){
	    document.getElementById("playername").value=msel.text;
	    invalidate();
	}
    }
}

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
    this.fill="red"
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
    mark.fill="red";
    mark.text="";
    mark.isSelected=true;
    marks.push(mark);

    msel = marks[marks.length-1]; 
    PastePlayerNameInTextArea();
    invalidate();
}

function mDown(e){
    getmouse(e);
    
    var l = marks.length;

    for (var i = 0; i < l ; i++){ 
	marks[i].isSelected=false;
    }

    for (var i = 0; i < l ; i++){
	clearCanvas(tcvs);
	draw_a_mark(tcvs, marks[i]);

	if (tcvs.isPointInPath(mx,my)) {
	    isDrag = true;
	    msel = marks[i]; 
	    msel.isSelected=true;
	    canvas.onmousemove = mMove;
	    clearCanvas(tcvs);
	    PastePlayerNameInTextArea();
	    invalidate();
	    return;
	}
    }
    invalidate();
}

function mMove(e){
    if (isDrag){
	getmouse(e);
	msel.x = mx;
	msel.y = my;
	invalidate();
    }
}

function mUp(){
    isDrag = false;
    canvas.onmousemove = null;
    invalidate();
}


function drawmarks(){
    var l = marks.length ;
    for (var i = 0; i < l ; i++)
	draw_a_mark(cvs, marks[i]);
}


function draw_a_mark(ctx, mk){

    ctx.save();

    ctx.shadowOffsetX=2;
    ctx.shadowOffsetY=2;
    ctx.shadowColor="#aaaaaa";
    ctx.shadowBlur=7;

    ctx.beginPath();
    ctx.arc(mk.x, mk.y, mk.r , 0, Math.PI*2, false);
    ctx.fillStyle=mk.fill;
    ctx.fill();

    ctx.restore();

    if (mk.isSelected){
	ctx.lineWidth=1;
	ctx.strokeStyle="#aaaaaa";
	ctx.strokeRect(mk.x-mk.r-1, mk.y-mk.r-1, 2*mk.r+2, 2*mk.r+2)
	ctx.stroke();

	ctx.beginPath();
	ctx.moveTo(mk.x, mk.y-2*mk.r);
	ctx.lineTo(mk.x, mk.y+2*mk.r);
	ctx.moveTo(mk.x-2*mk.r, mk.y);
	ctx.lineTo(mk.x+2*mk.r, mk.y);
	ctx.stroke();

    }else{
	ctx.lineWidth=0;
	ctx.strokeStyle=mk.fill
	ctx.stroke();
    }	
    
    ctx.restore();

    ctx.font="10pt sans-serif bold";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.fillStyle = "#0000ff";
    ctx.fillText(mk.text , mk.x, mk.y+8);

    ctx.restore();
}



function drawpitch(){

    cvs.save();

    //	canvas.width = window.innerWidth*0.95;
    //	canvas.height = window.innerHeight*0.95;

    var cw = canvas.width;
    var ch = canvas.height;

//    clearCanvas(cvs);
//    cvs.clearRect(0, 0, cw, ch);

    var xoff = cw*0.2;
    var pw = (cw - xoff*2);
    var ph = pw*68/50;

    var yoff = ch-ph*5/8-xoff;

    //  cvs.fillStyle="#f5f5f5";
    //  cvs.fillRect(0, 0, cw, ch);

    cvs.lineWidth=0.5;
    //  cvs.lineCap="round";
    cvs.lineJoin="round";
    cvs.strokeStyle="#000000";

    //Pitch for 8
    cvs.moveTo(xoff, ch-yoff-ph/2);
    cvs.lineTo(xoff, ch-yoff);
    cvs.lineTo(xoff+pw, ch-yoff);
    cvs.lineTo(xoff+pw, ch-yoff-ph/2)
    cvs.lineTo(xoff, ch-yoff-ph/2);
    cvs.lineTo(xoff, ch-yoff-ph*5/8);
    cvs.moveTo(xoff+pw, ch-yoff-ph/2);
    cvs.lineTo(xoff+pw, ch-yoff-ph*5/8);
    //  cvs.fillStyle="#008000";
    cvs.stroke();


    //Penalty Area
    cvs.moveTo(xoff+10.5/50*pw, ch-yoff);
    cvs.lineTo(xoff+10.5/50*pw, ch-yoff-12/50*pw);
    cvs.lineTo(xoff+39.5/50*pw, ch-yoff-12/50*pw);
    cvs.lineTo(xoff+39.5/50*pw, ch-yoff);

    //Goal Area
    cvs.moveTo(xoff+18.5/50*pw, ch-yoff);
    cvs.lineTo(xoff+18.5/50*pw, ch-yoff-4/50*pw);
    cvs.lineTo(xoff+31.5/50*pw, ch-yoff-4/50*pw);
    cvs.lineTo(xoff+31.5/50*pw, ch-yoff);
    cvs.stroke();

    //Goal
    cvs.strokeRect(xoff+22.5/50*pw, ch-yoff, 5/50*pw, 1/50*pw);

    //Penalty Mark
    cvs.beginPath();
    cvs.arc(xoff+25/50*pw, ch-yoff-8/50*pw, 1, 0, Math.PI*2, false);
    cvs.stroke();
    cvs.fillStyle="#000000";
    cvs.fill();

    //Penalty Arc
    cvs.beginPath();
    cvs.arc(xoff+25/50*pw, ch-yoff-8/50*pw, 7/50*pw , Math.PI*28.75/24, Math.PI*43.25/24, false);
    cvs.stroke();

    //Center Circle
    cvs.beginPath();
    cvs.arc(xoff+pw/2,ch-yoff-ph/2, 7/50*pw , 0, Math.PI*2, false);
    cvs.stroke();

    //Center Circle Mark
    cvs.beginPath();
    cvs.arc(xoff+pw/2,ch-yoff-ph/2, 2 , 0, Math.PI*2, false);
    cvs.stroke();
    cvs.fillStyle="#000000";
    cvs.fill();

    //Corner Arc
    cvs.beginPath();
    cvs.arc(xoff,ch-yoff, 2/50*pw , Math.PI*3/2, Math.PI*2, false);
    cvs.stroke();

    cvs.beginPath();
    cvs.arc(xoff+pw,ch-yoff, 2/50*pw , Math.PI, Math.PI*3/2, false);
    cvs.stroke();

    cvs.restore();
}


