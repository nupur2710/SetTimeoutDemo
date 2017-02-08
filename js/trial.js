

function a(){
	var abc = setInterval(b,2000);
	function b(){
	console.log(this);
	console.log("from b b");
	console.log("gsef c");
	console.log(abc);

}
}

function btnClicked(){
	alert(this);
}