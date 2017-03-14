var mymap
var mapLayer = MQ.mapLayer()
var popup = L.popup();
var routeL;
var latlng;
function init() {
     mymap = L.map('basicMap').setView([60.17, 24.94], 14);
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: "Openstreetmap",
            layers: mapLayer,
            maxZoom: 18   
        }).addTo(mymap);
        L.control.layers({
            'Map': mapLayer,
            'Hybrid': MQ.hybridLayer(),
            'Satellite': MQ.satelliteLayer(),
            'Dark': MQ.darkLayer(),
            'Light': MQ.lightLayer()
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
  function addRoute(latlng, street){
      if(routeL) mymap.removeLayer(routeL)
      var dir = MQ.routing.directions().on('success', function(data) {
        var legs = data.route.legs,
            html = '',
            maneuvers,
            i;

        if (legs && legs.length) {
            maneuvers = legs[0].maneuvers;

            for (i=0; i < maneuvers.length; i++) {
                html += (i+1) + '. ';
                html += maneuvers[i].narrative + '';
            }
            //L.DomUtil.get('prices').innerHTML = html;
        }
    });

    dir.optimizedRoute({
        locations: [
            { street:street, city: 'Helsinki' },
            { latLng: { lat: latlng.lat, lng: latlng.lng } }
        ],
        options: {
        routeType: "pedestrian"    
        }
    });
    routeL =MQ.routing.routeLayer({
        directions: dir
    })
    mymap.addLayer(routeL);
}

function directionsSend(){
    console.log(document.getElementById('startpoint').value)
    if(document.getElementById('startpoint').value){
        addRoute(latlng,document.getElementById('startpoint').value)
    }
}
  
  function onMarkerClick(e) {
    //alert(e.target.options.title);
    var barName = document.getElementById('barName');
    barName.innerHTML = e.target.options.title;
    getDataa("/v2/bar/"+e.target.options.title,"GET",addInfo);
    latlng = e.latlng;
    //addRoute(e.latlng,"Bulevardi 31")

  }
  
  function onMapClick(e) {
    document.getElementById('inputgroup').style.visibility = 'hidden';
    document.getElementById('infoBox').style.visibility = 'hidden';
  }
