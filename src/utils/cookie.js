//读取Cookie的方法
function getCookie(key){
    var arr1 = document.cookie.split('; ');
    for(var i=0;i<arr1.length;i++){
        var arr2 = arr1[i].split('=');
        if(arr2[0] == key){
                return decodeURI(arr2[1]);
        }
    }
}

//封装写入Cookie的方法
function setCookie(key,value,t){
    var oDate = new Date();
    oDate.setDate(oDate.getDate() + t*24*60*60*1000);
//	oDate.setDate(oDate.getDate() + t);
    document.cookie = key + '=' + encodeURI(value) + ';expire=' + oDate.toGMTString();
}

function acon(){
    console.log("hello.thanks use me");
}  

export{
	acon
}
