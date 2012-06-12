
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

    var xoff = 50;
    var yoff = xoff*40/50;

    var ph = ch - 2*yoff;
    var pw = ph*PW/PH;
    meter = pw/PW; // = ph/PH

    x0 = xoff;
    y0 = ch - yoff;

    cvs.save();

    cvs.lineWidth=1;
    cvs.lineJoin="round";
    cvs.strokeStyle="#000000";

    //Pitch for 8
    cvs.beginPath();
    cvs.fillStyle="#42ab42";
    cvs.fillRect(0, 0, pw+2*xoff, ph+2*yoff );

    //OuterRect
    cvs.strokeRect(xoff, yoff, pw, ph );

    //Halfway Line
    cvs.moveTo(xoff, 0.5*ph+yoff);
    cvs.lineTo(xoff+pw, 0.5*ph+yoff);
    cvs.stroke();

    cvs.lineWidth=0.5;

    //Penalty Area 1
    cvs.strokeRect(xoff+10.5*meter , yoff, 29*meter , 12*meter );
    cvs.strokeRect(xoff+18.5*meter , yoff, 13*meter , 4*meter );
    cvs.strokeRect(xoff+22.5*meter , yoff, 5*meter , -2.15*meter );

    cvs.beginPath();
    cvs.arc(xoff+25*meter, yoff+8*meter, 7*meter , Math.PI*3/16, Math.PI*13/16, false);
    cvs.stroke();

    cvs.beginPath();
    cvs.arc(xoff+25*meter, yoff+8*meter, 2 , 0, Math.PI*2, false);
    cvs.fillStyle="#000000";
    cvs.fill();

    //Penalty Area 2
    cvs.strokeRect(xoff+10.5*meter , yoff+ph, 29*meter , -12*meter );
    cvs.strokeRect(xoff+18.5*meter , yoff+ph, 13*meter , -4*meter );
    cvs.strokeRect(xoff+22.5*meter , yoff+ph, 5*meter , 2.15*meter );

    cvs.beginPath();
    cvs.arc(xoff+25*meter, yoff+ph-8*meter, 7*meter , -Math.PI*3/16, -Math.PI*13/16, true);
    cvs.stroke();

    cvs.beginPath();
    cvs.arc(xoff+25*meter, yoff+ph-8*meter, 2 , 0, Math.PI*2, false);
    cvs.fillStyle="#000000";
    cvs.fill();

    //Center Circle

    cvs.beginPath();
    cvs.arc(xoff+pw/2, yoff+ph/2, 7*meter , 0, Math.PI*2, false);
    cvs.stroke();

    cvs.beginPath();
    cvs.arc(xoff+pw/2, yoff+ph/2, 2 , 0, Math.PI*2, false);
    cvs.fillStyle="#000000";
    cvs.fill();

    //Corner Arc
    cvs.beginPath();
    cvs.arc(xoff, yoff, meter , 0, Math.PI/2, false);
    cvs.stroke();
    
    cvs.beginPath();
    cvs.arc(xoff+pw, yoff, meter , Math.PI/2, Math.PI, false);
    cvs.stroke();

    cvs.beginPath();
    cvs.arc(xoff, yoff+ph, meter , 0, -Math.PI/2, true);
    cvs.stroke();
    
    cvs.beginPath();
    cvs.arc(xoff+pw, yoff+ph, meter , -Math.PI/2, -Math.PI, true);
    cvs.stroke();


    cvs.restore();
}


