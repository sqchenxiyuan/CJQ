var $c=function(id){
	var item=document.getElementById(id);
	return $c.DOM2C(item);
};

$c.createElement=function(tag){
	var item=document.createElement(tag);
	return $c.DOM2C(item);
};

$c.DOM2C=function(domelement){

	function attr(_object){
		for(var i in _object){
			if(i=="text"){
				this.item["innerHTML"]=$c.HTMLTranslation(_object[i]);
			}else if(i=="style"){
				for(var j in _object[i]){
					this.item.style[j]=_object[i][j];
				}
			}else{
				this.item[i]=_object[i];
			}
		}
		return this;
	}

	function appendTo(c){
		c.item.appendChild(this.item);
		return this;
	}

	function appendToDOM(dom){
		dom.appendChild(this.item);
		return this;
	}

	return {
		item:domelement,
		attr:attr,
		appendTo:appendTo,
		appendToDOM:appendToDOM
	};
};

//////////////////////////////////////////AJAX请求
$c.post=function(_url,_data,_callback,_type){
	var req=new XMLHttpRequest();
	req.onreadystatechange=function(){
		if(req.readyState==4)
		{
			_callback(req.responseText,req.status);
		}
	};
	req.open("POST",_url,true);
	req.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	if(typeof _data=="string"){ 
		req.send(_data);
	}
	else if(typeof _data=="object"){
		var msg="";
		var j=0;
		for(var i in _data){
			if(typeof _data[i]=="string"){
				if(j)msg+="&";
				msg+=(i+"="+_data[i]);
				j=1;
			}
			if(Array.isArray(_data[i])){
				for(var p=0;p<_data[i].length;p++){
					if(typeof _data[i][p]!=="object"&&!Array.isArray(_data[i][p])){
						if(j)msg+="&";
						msg+=(i+"="+_data[i][p]);
						j=1;
					}
				}
			}
		}
		req.send(msg);
	}
}

$c.ajax=function(_method,_url,_callback){
	var req=new XMLHttpRequest();
	req.onreadystatechange=function(){
		if(req.readyState==4)
		{
			_callback(req.responseText);
		}
	};
	req.open(_method,_url,true);
	req.send();
};

$c.parseURL=function(){
	var pathname=window.location.pathname;
	var paths=pathname.split("/");
	return paths;
};

//////////////////////////////////////////////杂项功能
$c.HTMLTranslation=function(_string){
	var str=""+_string;
	str=str.replace(/&/g,"&amp;");
	str=str.replace(/</g,"&lt;");
	str=str.replace(/>/g,"&gt;");
	str=str.replace(/"/g,"&quot;");
	str=str.replace(/ /g,"&nbsp;");
	return str;
}
