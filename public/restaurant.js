//Set Up Leaflet Map, centered on Burlington VT
let myMap = L.map('restaurant-map').setView([44.4774, -73.2121], 16);
let OpenStreetMap_Mapnik = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(myMap);

let path = window.location.pathname;
console.log(path);
let pathArray = path.split('/');
let id = pathArray.pop();

let name = document.getElementById('restaurant-name');
let address = document.getElementById('restaurant-address');
let phone = document.getElementById('restaurant-phone');
let website = document.getElementById('restaurant-website');
let hours = document.getElementById('restaurant-hours');
let notes = document.getElementById('restaurant-notes');

//Displays restaurant data
async function getRestData() {
  //get restaurant data
  let restLink = await fetch(`https://json-server.burlingtoncodeacademy.now.sh/restaurants/${id}`)
    .then(response => {
      return response.json();
    })
    .then(jsonObj => {
      return jsonObj;
    });

  //change json values to text
  name.textContent = restLink.name;
  address.textContent = restLink.address;
  phone.textContent = restLink.phone;
  website.textContent = restLink.website;
  hours.textContent = restLink.hours;
  notes.textContent = restLink.notes;

  //Sets the pin
  playerRestPin(restLink.address, restLink.name);
}

function playerRestPin(restAddress, restName) {
  //Get restaurant lat, lon from address
  fetch(`https://nominatim.openstreetmap.org/search/?q=${restAddress}&format=json`)
    .then(response => {
      return response.json();
    })
    .then(jsonObj => {
      let info = jsonObj[0];
      let lat = info.lat;
      let lon = info.lon;
      //Place pin based on lat and lon
      let thisMarker = L.marker([lat, lon])
        .addTo(myMap)
        .bindPopup(restName);
      //When putting mouse on pin, open up content
      thisMarker.on('mouseover', () => {
        thisMarker.openPopup();
      });
      //When moving mouse off pin, close content
      thisMarker.on('mouseout', () => {
        thisMarker.closePopup();
      });
      myMap.setView([lat, lon])
    });
}

getRestData();
