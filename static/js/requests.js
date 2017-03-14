

var getDataa = function(path,method, callback){
    var url = "http://localhost"; 
    url = url+path+"?key=5ec987";
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

var setDataa = function(path){
    var url = "http://localhost"; 
    url = url+path+"?key=5ec987";
    var xmlhttp = new XMLHttpRequest();

    var data = new FormData();
    data.append('name', 'AAA');
    data.append('lon', '3');
    data.append('lat', '4');
    data.append('beerprize', '5');
    data.append('jagermaister', '50');
    data.append('openhours', '10:50-1:00');
    
    
    xmlhttp.open("POST", url, true);
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var myArr = JSON.parse(xmlhttp.responseText);
            console.log(myArr)
            callback(myArr);
        } else return false;
    }
    xmlhttp.send(data);
}

function directionsInput() {
    document.getElementById('inputgroup').style.visibility = 'visible';
    
}

function gotoDeveloper() {
    console.log("localhost/developer");
    window.location = "developer";
}
