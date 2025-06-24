
// Initialize the map and set view to given coordinates and zoom level
const map = L.map('map').setView([43.234216, 76.927264], 12);

// Load and display tile layer from OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
maxZoom: 19,
attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Add a marker with a popup
const markerDP = L.marker([43.23296760918147, 76.95633437208977]).addTo(map);
markerDP.bindPopup('Janaru Dostyk Plaza').openPopup();
const markerFO = L.marker([43.234253843761444, 76.93578438200697]).addTo(map);
markerFO.bindPopup('Janaru Forum').openPopup();
const markerMR = L.marker([43.20265501619259, 76.89278536846858]).addTo(map);
markerMR.bindPopup('Janaru MEGA Alma-Ata').openPopup();
const markerEM = L.marker([43.21892365912182, 76.92933776030749]).addTo(map);
markerEM.bindPopup('Janaru Esentai Mall').openPopup();
