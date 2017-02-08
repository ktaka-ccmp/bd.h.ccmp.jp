
var marks = [];
var canvasValid = false;
var isDrag = false;
var canvas;
var cvs;
var tmpcanvas;
var tcvs;
var msel;
var mx, my;


function drawpitch(){

    cvs.save();

    //	canvas.width = window.innerWidth*0.95;
    //	canvas.height = window.innerHeight*0.95;

    var cw = canvas.width;
    var ch = canvas.height;

//    clearCanvas(cvs);
//    cvs.clearRect(0, 0, cw, ch);

    var xoff = 20;
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


