var btn = document.getElementById("btn"),
row=document.getElementById("header"), 
scoreTable = document.getElementById("score-table"),
rowIdx = row.rowIndex+1;
x=0;
var randomNumber,
style,
temp,
scrollBottom,
i=1, man = document.getElementById("man"),
style = window.getComputedStyle(man),
bgpos = style.getPropertyValue("background-position"),
pos = style.getPropertyValue("left");

var buttonClick = {
	
	goClicked : function(event){
		if(btn.value==="Go"){	
		console.log("go called");
			buttonClick.writeToTable();
			btn.value="Reset";
		}
		else{
			buttonClick.removeFromTable();
			btn.value="Go";
		}
	},
	
	randomIntFromInterval : function(min, max){
		
		return Math.floor(Math.random()*(max-min+1)+min);
	},
	
	writeToTable : function(){		
			randomNumber = buttonClick.randomIntFromInterval(300,800);
			setInterval(looping,randomNumber); 
			if(rowIdx>10){
				console.log("clear interval");
				clearInterval(looping);
				console.log(rowIdx);
			}
				
		function looping(){
			
			if(rowIdx>6){
				temp = document.getElementById("container");
				temp.className = 'overflowY';
				scrollBottom = temp.scrollHeight;
				console.log(scrollBottom);
				temp.scrollTop = scrollBottom;
			}		
			else{
					function runMan(){
						for(var k=0;k<4;k++){
						pos=parseInt(pos)+25;	
						console.log(pos);					
						man.style.left = pos + 'px';
						bgpos = parseInt(bgpos) - 27;
						console.log(bgpos);
						man.style.backgroundPosition = bgpos +'px -1px';
						}
					}
					runMan();
					row = row.parentNode.rows[rowIdx];				
					row.cells[0].innerText = randomNumber;
					row.cells[1].innerText = [rowIdx]+"000";	
					
					rowIdx = rowIdx+1;
					i=i+1;	
					console.log("after increment - rowIndex" +rowIdx);
				}				
			
		}
		
		/* if(rowIdx<=1){
			looping();
			console.log("call looping first time - rowIndex" +rowIdx);
		}  */
		
	
	},
	
	removeFromTable : function(){
		rowIdx=1;
		temp = document.getElementById("container");
		temp.scrollTop=0;
		temp.className = 'container';
		for(var j=1; j<=10;j++){			
			
			row = row.parentNode.rows[rowIdx];
			//remove scrollbar
			
			if(rowIdx===1){
				row.cells[0].innerText = 0;
				row.cells[1].innerText = 0;
				console.log("end rowIdx 1");
			}	
			man.style.backgroundPosition = '-2px -1px';
			man.style.left = '0px';
			row.cells[0].innerText = "---";
			row.cells[1].innerText = "---";	
			rowIdx = rowIdx+1;	
			
		}
		
	}
}

btn.addEventListener("click", buttonClick.goClicked, false);

