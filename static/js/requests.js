

var getDataa = function(path,method, callback){
    var url = "http://localhost"; 
    url = url+path+"?key=5ec987";
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.open(method, url, true);
    xmlhttp.send();
    console.log("asd")
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var myArr = JSON.parse(xmlhttp.responseText);
            console.log(myArr)
            callback(myArr);
        } else return false;
    }
        
}

function directionsInput() {
    document.getElementById('inputgroup').style.visibility = 'visible';
    
}

function gotoDeveloper() {
    console.log("localhost/developer");
    window.location = "developer";
}
