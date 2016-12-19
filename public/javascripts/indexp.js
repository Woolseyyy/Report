var submitButton = document.getElementById('submit');
submitButton.onclick = function(){
	/*check if all is done*/
	if( !document.getElementById('Name').value )
		return alert("请填写姓名");
	else if( !document.getElementById('numbers').value )
		return alert("请填写学号");
	else if( !document.getElementById('sex1').checked && !document.getElementById('sex2').checked )
		return alert("请选择性别");
	for(var i=1 ; i <= 10; i++)
	{
		if(  !document.getElementById('pro' + i + '-options1').checked 
		  && !document.getElementById('pro' + i + '-options2').checked
		  && !document.getElementById('pro' + i + '-options3').checked
		  && !document.getElementById('pro' + i + '-options4').checked )
		return alert("第" + i + "题未作答");
	}

	/*conclude the result of character*/
	var result = 1;
	var questions = [];
	questions[1] = 0;
	questions[2] = 0;
	questions[3] = 0;
	questions[4] = 0;
	for(var i=1; i <= 10; i++)
	{
		if( document.getElementById('pro' + i + '-options1').checked )
			questions[1]++;
		else if( document.getElementById('pro' + i + '-options2').checked )
			questions[2]++;
		else if( document.getElementById('pro' + i + '-options3').checked )
			questions[3]++;
		else if( document.getElementById('pro' + i + '-options4').checked )
			questions[4]++;
	}

	var deque = [];
	deque[1] = 1;
	deque[2] = 2;
	deque[3] = 3;
	deque[4] = 4;
	for(var i=4; i > 1; i--)
	{
		var maxplace = 1;
		for(var j=2; j <= i; j++)
		{
			if(questions[deque[maxplace]] < questions[deque[j]])
				maxplace = j;
		}
		var temp = deque[i];
		deque[i] = deque[maxplace];
		deque[maxplace] = temp;
	}

	if(questions[deque[4]] == questions[deque[2]])
	{
		result = deque[ 4 - Math.floor( 3*Math.random() ) ];
	}
	else if(questions[deque[4]] == questions[deque[3]])
	{
		result = deque[ 4 - Math.floor( 2*Math.random() ) ];
	}
	else
		result = deque[4];

	/*submit*/
	document.getElementById('character').value = result;
	if(document.getElementById('majior-select').value == '理工科')
		document.getElementById('majior').value = 0;//理工科
	else if(document.getElementById('majior-select').value == '人文社科')
		document.getElementById('majior').value = 1;//人文社科
	else if(document.getElementById('majior-select').value == '其他')
		document.getElementById('majior').value = 2;//其他
	if(document.getElementById('sex1').checked)
		document.getElementById('sex').value = 0;//male
	else
		document.getElementById('sex').value = 1;//female
	document.getElementById('form').submit();
}