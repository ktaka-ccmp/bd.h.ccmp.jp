
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
	var l = marks.length;
	for (var i = 0; i < l ; i++){
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
    Mouse2Real(mx,my);
    
    var mark = new Marker;
    mark.x=realX;
    mark.y=realY;
    mark.r=7;
    if (MarkerColor == ""){
	mark.fill="firebrick";
    }else{
	mark.fill=MarkerColor;
    }
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
    
//    ListMarkerColor();

    for (var i = 0; i < l ; i++){
	clearCanvas(tcvs);
	draw_a_mark(tcvs, marks[i]);

	if (tcvs.isPointInPath(mx,my)) {
	    isDrag = true;
	    msel = marks[i]; 
	    msel.isSelected=true;
	    if ( MarkerColor != ""){
		msel.fill=MarkerColor;
	    }
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
	Mouse2Real(mx,my);
	msel.x = realX;
	msel.y = realY;
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
    Real2Mouse(mk.x, mk.y);

    ctx.save();

    ctx.shadowOffsetX=2;
    ctx.shadowOffsetY=2;
    ctx.shadowColor="#aaaaaa";
    ctx.shadowBlur=7;

    ctx.beginPath();
    ctx.arc(mouseX, mouseY, mk.r , 0, Math.PI*2, false);
    ctx.fillStyle=mk.fill;
    ctx.fill();

    ctx.restore();

    if (mk.isSelected){
	// Selection indicator
	ctx.lineWidth=1;
	ctx.beginPath();
//	ctx.fillStyle="#aaaaaa";
	ctx.fillStyle="#777777";
	ctx.fillRect(mouseX-mk.r-5, mouseY-mk.r-5, 5 , 5);
	ctx.fillRect(mouseX+mk.r, mouseY-mk.r-5, 5 , 5);
	ctx.fillRect(mouseX-mk.r-5, mouseY+mk.r, 5 , 5);
	ctx.fillRect(mouseX+mk.r, mouseY+mk.r, 5 , 5);
	ctx.stroke();
    }else{
	// Nothing much...
	ctx.lineWidth=2;
	ctx.strokeStyle=mk.fill
	ctx.stroke();
    }	
    
    ctx.restore();

    ctx.font="12pt sans-serif bold";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
//    ctx.fillStyle = "#0000ff";
    ctx.fillStyle = "#000000";
    ctx.fillText(mk.text , mouseX, mouseY+10);

    ctx.restore();
}

function ListMarkerColor(){
    var select = document.getElementById("SelectColor");
    select.options.length = 0;
    select.options[select.options.length] = new Option("Color", "");

    var ColorArray = ["red", "blue", "green", "brown"];
    for (var i = 0 ; i < ColorArray.length; i++){
	select.options[select.options.length] = new Option(ColorArray[i], ColorArray[i]);
    } 
}

function ChangeMarkerColor(){
    var select = document.getElementById("SelectColor");
    var color = select.options[select.selectedIndex].value;
    if (color != ""){
	MarkerColor = color;
	if(msel){
	    if(msel.isSelected){
		msel.fill=MarkerColor;
		invalidate();
	    }
	}
    }
}

function DeleteAllMarker(){
    var l = marks.length;
    for (var i = 0; i < l ; i++){
	marks.pop();
    }
    invalidate();
}