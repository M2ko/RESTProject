function init() {
    var mymap = L.map('basicMap').setView([60.17, 24.94], 13);
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "Openstreetmap",
        maxZoom: 18}).addTo(mymap);
        
        var marker = L.marker([60.1690952, 24.9327473], {
            title: 'Bar'});
        //marker.bindPopup('<p>Baari</p>');
        marker.on('click', onMarkerClick);
        marker.addTo(mymap);
        mymap.on('click', onMapClick);
  }
  
  function onMarkerClick(e) {
    alert(e.target.options.title);
    var barName = document.getElementById('barName');
    var openHours = document.getElementById('openHours');
    var prices = document.getElementById('prices');
    
    var li = document.createElement("li");
    li.appendChild(document.createTextNode("Beer: " + "4,5e"));
    barName.innerHTML = "Baari";
    openHours.innerHTML = "Open hours: " + "8:00-4:00";
    prices.appendChild(li);
    document.getElementById('infoBox').style.visibility = 'visible';
  }
  
  function onMapClick(e) {
    document.getElementById('infoBox').style.visibility = 'hidden';
  }