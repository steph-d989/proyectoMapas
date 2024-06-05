const url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson'

//--Mi ubicación--//
/* const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };
  
  function success(pos) {
    const crd = pos.coords;
    console.log("Your current position is:");
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
  }
  
  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }
  
  navigator.geolocation.getCurrentPosition(success, error, options);

  const map = L.map('mapYo').setView([40.42,-3.69], 2);

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map); */

/* const marker = L.marker([40.42,-3.69]).addTo(map);

const popup = popup()
    .setLatLng([40.42,-3.69])
    .setContent("Holi aqui estoy!")
    .openOn(map); */

//--Terremotos--//
const map = L.map('mapTerremotos').setView([40.42, -3.69], 2);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 5,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

const llamarApi = async () => {
    try {
        const response = await fetch(url)
        if (response.ok) {
            const data = await response.json()
            return data.features;
        }
    } catch (error) {

    }
}
const pintarMapa = async () => {
    const results = await llamarApi();
    console.log(results)
    results.forEach(element => {
            variable = mag0;
        const marker = L.marker([element.geometry.coordinates[1], element.geometry.coordinates[0]]).addTo(map);
        
        marker.bindPopup(`Título: ${element.properties.title},<br> Lugar: ${element.properties.place},<br> Tiempo: ${new Date(element.properties.time)},<br> Código: ${element.properties.code},<br> Magnitud: ${element.properties.mag} ${element.properties.magType}`);
    });
}

const mag0 = L.icon({
    iconUrl: './assets/mag 0.png',
    shadowUrl: './assets/mag 0.png',

    iconSize:     [38, 95], // size of the icon
    shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});


pintarMapa()

/* const map = L.map('map').setView([51.505, -0.09], 13);


L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

const marker = L.marker([51.5, -0.09]).addTo(map);

const circle = L.circle([51.508, -0.11], {
    color: 'green',
    fillColor: 'white',
    fillOpacity: 0.6,
    radius: 1500
}).addTo(map);

const polygon = L.polygon([
    [51.509, -0.08],
    [51.503, -0.06],
    [51.51, -0.047]
]).addTo(map);

const popup = L.popup()
    .setLatLng([51.513, -0.09])
    .setContent("I am a standalone popup.")
    .openOn(map); */