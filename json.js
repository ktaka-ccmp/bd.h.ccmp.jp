
// File API & DATA URI most likey won't work except Firefox & Chrome 20.xx... 

function LoadJsonFile(){
    if(window.FileReader) {
	var fp = document.getElementById("myfile").files[0];
	var reader = new FileReader();
	reader.readAsText(fp, "utf-8");
	reader.onload = function(){
	    //	document.getElementById("jsontest").innerHTML = reader.result;
	    marks = JSON.parse(reader.result);
	    invalidate();
	}
    } else {
	alert("The browser doesn't support the FileReader");
    }
}

function SaveJsonFile(){
    var filename = document.getElementById("jsonFileName").value + ".js";
    var myjson = JSON.stringify(marks);
    var link = document.getElementById("savejsonfile");
    href = "data:application/octet-stream,"+encodeURIComponent(myjson);
    link.setAttribute("href", href);
    link.setAttribute("download",name||filename);
//    document.getElementById("jsontest").innerHTML = href;
}

// Web Storage , Local Storage Manupilation


function SaveJsonLocal(){
    var recordname = document.getElementById("jsonRecordName").value;
    var myjson = JSON.stringify(marks);
    localStorage.setItem(recordname, myjson);
    invalidate();
    ListLocalStorage();
}

function ListLocalStorage(){
    var select = document.getElementById("LocalStorageList");
    select.options.length = 0;
    var l = localStorage.length;
    for (var i = 0 ; i < l; i++){
	var key = localStorage.key(i);
	if (key == "iIntDaemon" || key == "sIntDaemon" || key == "settingsDaemon" || key == "versionDaemon" ){
	}else{
	    select.options[select.options.length] = new Option(key, '');
	}
    } 
    PasteJsonNameFromSelect();
}

function LoadJsonLocal(){
    var select = document.getElementById("LocalStorageList");
    var selected =select.options[select.selectedIndex].text;
    var myjson = localStorage.getItem(selected);
    marks = JSON.parse(myjson);
    invalidate();
}

function DeleteJsonLocal(){
    var select = document.getElementById("LocalStorageList");
    var selected =select.options[select.selectedIndex].text;
    localStorage.removeItem(selected);
    ListLocalStorage();
}

function PasteJsonNameFromSelect(){
    var select = document.getElementById("LocalStorageList");
    var selected =select.options[select.selectedIndex].text;
    document.getElementById("jsonRecordName").value = selected ;
    document.getElementById("jsonFileName").value = selected ;
    document.getElementById("canvasImageName").value = selected;
}

function PasetFromidjsonRecordName(){
    var text = document.getElementById("jsonRecordName").value;
    document.getElementById("jsonFileName").value = text ;
    document.getElementById("canvasImageName").value = text ;
}
