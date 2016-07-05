function validate(type,inputWrap,myId){
    var value=document.getElementById(myId).value,
        dateRegex = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/;
	switch (type){
		case 'beginTime':{
		    if (!isNotNull(value)) {
		        callback(inputWrap,'不能为空');
		    } else if (!dateRegex.test(value)) {
		        callback(inputWrap,'日期格式不对');
		    }
		}
		break;
		case 'endTime':{
		    if (!isNotNull(value)) {
		        callback(inputWrap,'不能为空');
		    } else if (!dateRegex.test(value)) {
		        callback(inputWrap,'日期格式不对');
		    }			
		}
		break;
	    case 'money': {
	        if (!isNotNull(value)) {
	            callback(inputWrap,'不能为空');
	        } else if (value > 100 || value < 0.5) {
	            callback(inputWrap,'钱的金额过大或过小');
	        }
			
		}
		break;
	}
}
function isNotNull(value){
	if(value!==null&&value!==undefined&&value!==''){
		return true;
	}else{
		return false;
	}
}
function callback(referId,errors){
	var lab=document.createElement('label'),
		referNode=document.getElementById(referId);
	lab.innerText=errors;
	lab.style.color='red';
	referNode.appendChild(lab);
}