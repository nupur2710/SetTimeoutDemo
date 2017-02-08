var timeTaken,row1,startPosition = 0,
singleBlock = 64,
count=0,
btn = document.getElementById("btn"),
row=document.getElementById("header"),
man = document.getElementById("man"),
container = document.getElementById("container"),
scoreTable = document.getElementById("scoreTable"),
style = window.getComputedStyle(man),
bgpos = style.getPropertyValue("background-position"),
pos = parseInt(style.getPropertyValue("left")),

rowIdx = row.rowIndex+1;

var runnerSequence = new function(){
	
	this.writeToTable = function(millisecond){
		if(pos+22>(startPosition + singleBlock)){
			if(rowIdx<7){
				
				row1 = row.parentNode.rows[rowIdx];
				row1.cells[0].innerText = millisecond;
				row1.cells[1].innerText = [rowIdx]+"000";						
				rowIdx = rowIdx+1;
				startPosition = startPosition + singleBlock;	
				
			}
			else{
				var row2 = scoreTable.insertRow();
				var cell1 = row2.insertCell(0);
				var cell2 = row2.insertCell(1);
				cell1.className='cells';
				cell2.className='cells';
				cell1.innerText = millisecond;
				cell2.innerText = [rowIdx]+"000";
				rowIdx = rowIdx+1;
				startPosition = startPosition + singleBlock;	
			}
		
		}
		container.scrollTop = container.scrollHeight;
	}
	
	this.runningManFunction = function(){
		debugger;
		btn.disabled = true;
        btn.removeEventListener("click", runnerSequence.startCall);
        btn.addEventListener("click", runnerSequence.resetCall);
		
		 var currentDate = new Date();
       
        if (count === 0) {
            startDate = new Date();
            count++;

        }
		timeTaken = currentDate - startDate;
		runnerSequence.writeToTable(timeTaken);		
		
		pos = pos+5;
		bgpos = parseInt(bgpos)+26;
		
		if(pos>620){
			clearInterval(myInterval);
            pos = 620;
			btn.disabled = false;
			btn.value="Reset";
			
		}
		else{
			man.style.backgroundPosition = bgpos +'px 0px';
		}
		man.style.left = pos + 'px';		

	}
	
	this.randomIntFromInterval = function(min, max){
		
		return Math.floor(Math.random()*(max-min+1)+min);
	}
	
	 this.startCall = function () {

        myInterval = setInterval(runnerSequence.runningManFunction, runnerSequence.randomIntFromInterval(30, 80));
    }
	
	this.resetCall = function(){
		rowIdx=1;		
		container.scrollTop=0;
		for(var j=1; j<=10;j++){			
			
			row1 = row.parentNode.rows[rowIdx];
			
			//remove scrollbar
			
			if(rowIdx===1){
				row1.cells[0].innerText = 0;
				row1.cells[1].innerText = 0;
				console.log("end rowIdx 1");
			}	
			else{
				row1.cells[0].innerText = "---";
				row1.cells[1].innerText = "---";
			}
			rowIdx = rowIdx+1;
			man.style.backgroundPosition = '26px 0px';
			man.style.left = '0px';
			
			
				if(rowIdx===7){
					scoreTable.deleteRow(rowIdx);
					scoreTable.deleteRow(rowIdx);
					scoreTable.deleteRow(rowIdx);
					scoreTable.deleteRow(rowIdx);
					break;
				}
			/* if(rowIdx>=7){
				scoreTable.deleteRow(rowIdx);
			} */
		}
		
		
		startPosition = 0;
		rowIdx = row.rowIndex+1;
		btn.value="Go";
		btn.disabled = false;
		btn.removeEventListener("click", runnerSequence.resetCall);
		btn.addEventListener("click", runnerSequence.startCall);
		bgpos = style.getPropertyValue("background-position");
		pos = 0;
		count=0;	
	}
}

btn.addEventListener("click", runnerSequence.startCall, false);