

var getDataa = function(path,method, callback){
    var url = "http://localhost"; 
    url = url+path;
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.open(method, url, true);
    xmlhttp.send();

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var myArr = JSON.parse(xmlhttp.responseText);
            console.log(myArr)
            callback(myArr);
        } else return false;
    }
        
}

function bars2map() {
    arr = request("/bars","GET");
    
}

function directionsInput() {
    document.getElementById('inputgroup').style.visibility = 'visible';
    
}
