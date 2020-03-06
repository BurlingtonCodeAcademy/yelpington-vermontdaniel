//Set Up Leaflet Map, centered on Burlington VT
let myMap = L.map('restaurant-map').setView([44.4774, -73.2121], 16);
let OpenStreetMap_Mapnik = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(myMap);

let path = window.location.pathname;
console.log(path);
//let pathArray = path.split('/');
//let id = pathArray.pop();

console.log(id);

let name = document.getElementById('restaurant-name');
let address = document.getElementById('restaurant-address');
let phone = document.getElementById('restaurant-phone');
let website = document.getElementById('restaurant-website');
let hours = document.getElementById('restaurant-hours');
let notes = document.getElementById('restaurant-notes');

//Displays restaurant data
function getRestData() {
  //get restaurant data
  fetch(`https://json-server.burlingtoncodeacademy.now.sh/restaurants/${id}`)
    .then(response => {
      return response.json();
    })
    .then(jsonObj => {
      return jsonObj;
    });

    
}

getRestData();
