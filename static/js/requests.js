

var getDataa = function(path,method, callback){
    var url = "http://localhost"; 
    url = url+path+"?key=5ec987";
    var xmlhttp = new XMLHttpRequest();
    
    xmlhttp.open(method, url, true);
    xmlhttp.send();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var myArr = JSON.parse(xmlhttp.responseText);
            console.log(myArr);
            if(document.getElementById("result")) {
                document.getElementById("result").innerHTML = xmlhttp.responseText;
            }
            callback(myArr);
        } else return false;
    };
        
}

var setDataa = function(path,data){
    var url = "http://localhost"; 
    url = url+path+"?key=5ec987";
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.open("POST", url, true);
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var myArr = JSON.parse(xmlhttp.responseText);
            console.log(myArr)
            //callback(myArr);
        } else return false;
    }
    xmlhttp.send(data);
}

function directionsInput() {
    document.getElementById('input-group').style.visibility = 'visible';
    
}

function gotoDeveloper() {
    console.log("localhost/developer");
    window.location = "developer";
}

function generateKey() {
    var hashs = ["2ad72c", "5ec987", "78721e", "adc21b", "12562", "aef21b"];
    var well = document.getElementById("keyWell");
    var p = document.getElementById("key");
    var rand = Math.floor((Math.random() * 6));
    
    p.innerHTML = hashs[rand];
    well.appendChild(p);
}

function testQuery(method) {
    var value = document.getElementById("testQuery").value;
    var result = document.getElementById("result");
    var div = document.createElement("div");
    div.innerHTML = value;
    result.innerHTML = getTestQuery(div.innerText, method);
}

function getTestQuery(path,method) {
    var url = "http://localhost"; 
    url = url+path;
    var xmlhttp = new XMLHttpRequest();
    
    xmlhttp.open(method, url, true);
    xmlhttp.send();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var myArr = JSON.parse(xmlhttp.responseText);
            console.log(myArr);
            if(document.getElementById("result")) {
                document.getElementById("result").innerHTML = xmlhttp.responseText;
            }
            callback(myArr);
        } else return false;
    };
}

function postForm() {
    var data = new FormData();
    data.append('name', document.getElementById('barname').value);
    data.append('lat', document.getElementById('lat').value);
    data.append('lon', document.getElementById('lon').value);
    data.append('beerprize', document.getElementById('beerprize').value);
    data.append('jagermaister', document.getElementById('jager').value);
    data.append('openhours', document.getElementById('open').value);
    setDataa("/v2/bar/setnew",data);
}

function updateBar() {
    var data = new FormData();
    data.append('key', document.getElementById('keyy').value);
    data.append('val', document.getElementById('val').value);
    var name = document.getElementById('barupname').value
    setDataa("/v2/bar/"+name,data);
}
