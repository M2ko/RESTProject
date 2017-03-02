function init() {
    var mymap = L.map('basicMap').setView([60.17, 24.94], 13);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "Openstreetmap",
        maxZoom: 18}).addTo(mymap);
        
  }