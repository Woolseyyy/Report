/*delete option*/
var i = document.getElementById('valueOFi').childNodes[0].nodeValue;
for(var j=1; j <= i; j++)
{
	document.getElementById( j + '-button' ).onclick = function(){
		if(confirm('确认删除此条信息？'))
		{
			var number = parseInt(this.id);
			document.getElementById('deleteID').value = document.getElementById('infolist-'+number+'-id').childNodes[0].nodeValue;
			document.getElementById('form').submit();
		}
	}
}

/*group*/
var array = [];//sex
for(var sexNum = 0; sexNum < 2; sexNum++)
{
	array[sexNum] = [];//majior
	for(var majiorNum = 0; majiorNum < 3; majiorNum++)
	{
		array[sexNum][majiorNum] = [];//character
		for(var characterNum = 1; characterNum < 5; characterNum++)
		{
			array[sexNum][majiorNum][characterNum] = [];//store info
		}
	}
}

document.getElementById('start').onclick = function(){
	
	var checkedPerson = 0;
	for(var j=1; j <= i; j++)//遍历信息
	{
		if(!document.getElementById(j+'-checked').checked)
			continue;
		checkedPerson++;

		switch (document.getElementById('infolist-'+j+'-sex').childNodes[0].nodeValue){
			case '男' : var sex = 0;break;
			case '女' : var sex = 1;break;
		}
		switch (document.getElementById('infolist-'+j+'-majior').childNodes[0].nodeValue){
			case '理工科' : var majior = 0;break;
			case '人文社科' : var majior = 1;break;
			case '其他' : var majior = 2;break;
		}
		switch (document.getElementById('infolist-'+j+'-character').childNodes[0].nodeValue){
			case '支配型性格' : var character = 1;break;
			case '影响型性格' : var character = 2;break;
			case '支持型性格' : var character = 3;break;
			case '服从型性格' : var character = 4;break;
		}

		array[sex][majior][character].push(j);
	}

	var info = [];
	for(var sexNum = 0; sexNum < 2; sexNum++)
	{
		for(var majiorNum = 0; majiorNum < 3; majiorNum++)
		{
			for(var characterNum = 1; characterNum < 5; characterNum++)
			{
				for(var arrayinfo of array[sexNum][majiorNum][characterNum])
				{
					if(typeof(arrayinfo) == "undefined")
						continue;
					else
						info.push(arrayinfo);
				}
			}
		}
	}


	var groupNum = document.getElementById('groupNum').value;
	if(groupNum == '')
	{
		alert('请输入组数！');
	}
	else
	{
		groupNum = parseInt(groupNum);
		var group = [];
		var groupID = 1;
		for(var k=1; k<= groupNum; k++)
		{
			group[k] = [];
		}

		var tbody = document.getElementById('tbody');
		for(var k=0; k < checkedPerson; k++,groupID++)
		{
			if(groupID == groupNum+1)
				groupID =  1;

			group[groupID].push(info[k]);		
		}

		for(var groupID = 1; groupID <= groupNum; groupID++)
		{
			for( var infonum of group[groupID])
			{
				if(typeof(infonum) == "undefined" )
					break;

				var tr = document.createElement("tr");			
				tbody.appendChild(tr);

				var textItem;
				var td;
				var tdText;

				td = document.createElement("td");
				tdText = document.createTextNode(groupID);
				tr.appendChild(td);
				td.appendChild(tdText);

				textItem = document.getElementById('infolist-'+infonum+'-name').childNodes[0].nodeValue;
				td = document.createElement("td");
				tdText = document.createTextNode(textItem);
				tr.appendChild(td);
				td.appendChild(tdText);

				textItem = document.getElementById('infolist-'+infonum+'-numbers').childNodes[0].nodeValue;
				td = document.createElement("td");
				tdText = document.createTextNode(textItem);
				tr.appendChild(td);
				td.appendChild(tdText);

				textItem = document.getElementById('infolist-'+infonum+'-majior').childNodes[0].nodeValue;
				td = document.createElement("td");
				tdText = document.createTextNode(textItem);
				tr.appendChild(td);
				td.appendChild(tdText);

				textItem = document.getElementById('infolist-'+infonum+'-sex').childNodes[0].nodeValue;
				td = document.createElement("td");
				tdText = document.createTextNode(textItem);
				tr.appendChild(td);
				td.appendChild(tdText);

				textItem = document.getElementById('infolist-'+infonum+'-character').childNodes[0].nodeValue;
				td = document.createElement("td");
				tdText = document.createTextNode(textItem);
				tr.appendChild(td);
				td.appendChild(tdText);
			}
		}

		/*show result*/
		document.getElementById('start').disabled = 'disabled';
		document.getElementById('result').className = 'table table-hover';



	}
}