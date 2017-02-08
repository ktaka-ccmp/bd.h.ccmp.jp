
var marks = [];
var canvasValid = false;
var isDrag = false;
var canvas;
var cvs;
var tmpcanvas;
var tcvs;
var msel;
var mx, mx;
var mouseX, mouseY;
var realX, realY;
var meter, x0, y0;

function Real2Mouse(x,y){
    mouseX = meter*x + x0;
    mouseY = -meter*y + y0;
}

function Mouse2Real(x,y){
    realX = (x-x0)/meter;
    realY = -(y-y0)/meter;
}

function drawpitch(){

    cvs.save();

    var PH = 80; // 80m
    var PW = 50; // 50m

    var cw = canvas.width;
    var ch = canvas.height;

    var xoff = 70;
    var yoff = xoff*40/50;

    var pw = cw-2*xoff;
    var ph = pw*PH/PW;

    meter = pw/PW; // = ph/PH

    x0 = xoff;
    y0 = ch - yoff;

    cvs.save();

    cvs.lineWidth=1;
    cvs.lineJoin="round";
    cvs.strokeStyle="#000000";

    //Pitch for 8
    cvs.beginPath();
//    cvs.fillStyle="#42ab42";
    cvs.fillStyle="white";
    cvs.fillRect(x0-xoff, y0+yoff, pw+2*xoff, -(0.5*ph+2*yoff) );

    //OuterRect
    cvs.strokeRect(x0, y0, pw, -0.5*ph );

    cvs.lineWidth=0.5;

    //Penalty Area 2
    cvs.strokeRect(x0+10.5*meter , y0, 29*meter , -12*meter );
    cvs.strokeRect(x0+18.5*meter , y0, 13*meter , -4*meter );
    cvs.strokeRect(x0+22.5*meter , y0, 5*meter , 2.15*meter );

    cvs.beginPath();
    cvs.arc(x0+25*meter, y0-8*meter, 7*meter , -Math.PI*3/16, -Math.PI*13/16, true);
    cvs.stroke();

    cvs.beginPath();
    cvs.arc(x0+25*meter, y0-8*meter, 2 , 0, Math.PI*2, false);
    cvs.fillStyle="#000000";
    cvs.fill();

    //Center Circle

    cvs.beginPath();
    cvs.arc(x0+pw/2, y0-ph*0.5, 7*meter , 0, Math.PI, false);
    cvs.closePath();
    cvs.stroke();

    cvs.beginPath();
    cvs.arc(x0+pw/2, y0-ph*0.5, 2 , 0, Math.PI*2, false);
    cvs.fillStyle="#000000";
    cvs.fill();

    //Corner Arc

    cvs.beginPath();
    cvs.arc(x0, y0, meter , 0, -Math.PI/2, true);
    cvs.stroke();
    
    cvs.beginPath();
    cvs.arc(x0+pw, y0, meter , -Math.PI/2, -Math.PI, true);
    cvs.stroke();


    cvs.restore();
}


