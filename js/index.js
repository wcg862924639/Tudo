// var title=document.getElementById("title");
// title.onkeydown=function(e){
// 	if(e.keyCode==13){
// 		if(title.value==""){
// 			return;
// 		}else{
// 			var data=getData();
// 		var todo={"title":title.value,"done":false};
// 		data.push(todo);
// 		saveData(data);
// 		var form=document.getElementById("form");
// 		form.reset();
// 			render();
// 		}
// 	}
// }

function writeAction(){
	var title = document.getElementById("title");
	if(title.value == "") {
		alert("内容不能为空");
	}else{
		var data=getData();
		var todo={"title":title.value,"done":false};
		data.push(todo);
		saveData(data);
		var form=document.getElementById("form");
		form.reset();
		render();
	}
}


function getData(){
	var d=localStorage.getItem("todo");
	return d=null?[]:JSON.parse(d);
}
function saveData(data){
	localStorage.setItem("todo",JSON.stringify(data));
}

function saveSort(){
	var tolist=document.getElementById("tolist");
	var dolist=document.getElementById("dolist");
	var ts=tolist.getElementsByTagName("p");
	var ds=dolist.getElementsByTagName("p");
	var data=[];
	for(i=0;i<ts.length; i++){
		var todo={"title":ts[i].innerHTML,"done":false};
		data.unshift(todo);
	}
	for(i=0;i<ds.length; i++){
		var todo={"title":ds[i].innerHTML,"done":true};
		data.unshift(todo);
	}
	saveData(data);
}

function delData(i){
	var data=getData();
	var todo=data.splice(i,1)[0];
	saveData(data);
	render();
}

function changeData(i,key,value){
	var data = getData();
	var todo = data.splice(i,1)[0];
	todo[key] = value;
	data.splice(i,0,todo);
	saveData(data);
	// data[i][key]=val;
	// saveData(data);
	render();
}

function render(){
	var tolist=document.getElementById("tolist");
	var dolist=document.getElementById("dolist");
	var d=localStorage.getItem("todo");
	if(d!=null){
		var data=JSON.parse(d);
		var toCount=0;
		var doCount=0;
		var toString="";
		var doString="";
		for (var i = data.length - 1; i >= 0; i--) {
			if(data[i].done){
				doString+="<li draggable='true'><input type='checkbox' onchange='changeData("+i+",\"done\",false)' checked='checked' />"
				+"<p id='p-"+i+"'>"+data[i].title+"</p>"
				+"<a href='javascript:delData("+i+")'>-</a></li>";
				doCount++;
			}
			else{
				toString+="<li draggable='true'><input type='checkbox' onchange='changeData("+i+",\"done\",true)' />"
				+"<p id='p-"+i+"'>"+data[i].title+"</p>"
				+"<a href='javascript:delData("+i+")'>-</a></li>";
				toCount++;
			}
		};
		tocount.innerHTML=toCount;
		tolist.innerHTML=toString;
		docount.innerHTML=doCount;
		dolist.innerHTML=doString;
	}
	else{
		tocount.innerHTML=0;
		tolist.innerHTML="";
		docount.innerHTML=0;
		dolist.innerHTML="";
	}

		onmouseout =function(){
			saveSort();
		};
}

window.onrender=render;

window.addEventListener("storage",render,false);

function clear(){
	localStorage.clear();
	render();
}

