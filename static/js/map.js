var mymap
function init() {
     mymap = L.map('basicMap').setView([60.17, 24.94], 14);
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "Openstreetmap",
        //layers: MQ.mapLayer(),
        maxZoom: 18   
        }).addTo(mymap);
        
        getDataa("/bars","GET",addMarks);
        mymap.on('click', onMapClick);
  }
  
  function addMarks(arr){ 
      console.log(arr)
      if (arr) {
        for (var i = 0; i < arr.length; i++) {
          var marker = L.marker([arr[i].lat,arr[i].lon], {
            title: arr[i].name}).addTo(mymap).on('click', onMarkerClick);
        }
      } else alert("erere")
   }

   function addInfo(arr){
    var openHours = document.getElementById('openHours');
    var prices = document.getElementById('prices');
    prices.innerHTML = "";
    openHours.innerHTML = arr.openhours;
    var li = document.createElement("li");
    li.appendChild(document.createTextNode("Jäger: " + arr.prizes.beerprize+ "€"));
    prices.appendChild(li);
    li = document.createElement("li");
    li.appendChild(document.createTextNode("Beer: " + arr.prizes.jagermaister+ "€"));
    prices.appendChild(li);
    document.getElementById('infoBox').style.visibility = 'visible';
   }
  function addRoute(latlng){
      var dir = MQ.routing.directions();

dir.route({
  locations: [
  { street: 'Bulevardi 31', city: 'Helsinki' },
    { latLng: { lat: latlng.lat, lng: latlng.lng } }
  ]
});

mymap.addLayer(MQ.routing.routeLayer({
  directions: dir
}));
      
      
      //var control = L.Routing.control( {
//	waypoints: [
//		L.latLng(,),
//		L.latLng(60.179,24.945)
//	],
//	geocoder: L.Control.Geocoder.nominatim()
  //  }).addTo(mymap);
  }
  
  function onMarkerClick(e) {
    //alert(e.target.options.title);
    var barName = document.getElementById('barName');
    barName.innerHTML = e.target.options.title;
        
    getDataa("/bar/"+e.target.options.title,"GET",addInfo);
    addRoute(e.latlng)

  }
  
  function onMapClick(e) {
    document.getElementById('inputgroup').style.visibility = 'hidden';
    document.getElementById('infoBox').style.visibility = 'hidden';
  }
