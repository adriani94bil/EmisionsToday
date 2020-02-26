///////////About///////////////////
let map = L.map('map').setView([43.257284, -2.927361], 18);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiYWRyaWFuaTk0IiwiYSI6ImNrNzFzZTN1OTA2bjkzb3AxbWlodzNhZ2EifQ.Vq7tAL6FBSCBPHtPIcLC6w'
}).addTo(map);
let marker = L.marker([43.257284, -2.927361]).addTo(map);
marker.bindPopup("<b>Hola chic@s!!!</b><br>Estamos aqui!!!!").openPopup();
