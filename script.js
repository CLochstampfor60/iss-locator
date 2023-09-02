// *ROOT Information

// *
// ********************* TOP MAP STARTS ************************
// Creating Map and Tiles
const issMap2 = L.map('issMap2').setView([0, 0], 3)
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution:
    '<a href="https://www.openstreetmap.org/copyright" target="_blank">© OpenStreetMap</a>',
}).addTo(issMap2)

// Creating a custom Icon Marker
const issIcon2 = L.icon({
  // Font Awesome satellite icon.
  iconUrl: 'image-placeholders/sat2.png',
  iconSize: [50, 32],
  iconAnchor: [25, 16],
  html: '#',
  // color: '#98652E',
})
const marker2 = L.marker([0, 0], { icon: issIcon2 }).addTo(issMap2)

// Fetch request for geopositioning of the ISS (International Space Station)

// let firstTime2 = true
const api_url2 = 'https://api.wheretheiss.at/v1/satellites/25544'
async function getISS2() {
  const response2 = await fetch(api_url2)
  const data2 = await response2.json()
  const { latitude, longitude } = data2

  // if (firstTime) {
  //   issMap.setView([latitude, longitude], 2)
  //   firstTime = false
  // }
  issMap2.setView([latitude, longitude], issMap2.getZoom(2))
  marker2.setLatLng([latitude, longitude])
  // console.log(data.latitude)
  // console.log(data.longitude)
}
getISS2()

setInterval(getISS2, 2000)
// *
// ********************* TOP MAP ENDS ************************
// *

// *
// ********************* BOTTOM MAP STARTS ************************
// *
// Creating Map and Tiles
const issMap = L.map('issMap').setView([0, 0], 6)
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution:
    '<a href="https://www.openstreetmap.org/copyright" target="_blank">© OpenStreetMap</a>',
}).addTo(issMap)

// Creating a custom Icon Marker
const issIcon = L.icon({
  // Font Awesome satellite icon.
  iconUrl: 'image-placeholders/sat2.png',
  iconSize: [50, 32],
  iconAnchor: [25, 16],
  html: '#',
  // color: '#98652E',
})
const marker = L.marker([0, 0], { icon: issIcon }).addTo(issMap)

// Fetch request for geopositioning of the ISS (International Space Station)

// let firstTime = true
const api_url = 'https://api.wheretheiss.at/v1/satellites/25544'

async function getISS() {
  const response = await fetch(api_url)
  const data = await response.json()
  var { latitude, longitude, altitude, velocity, units } = data

  const formattedVelocityKm = velocity.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

  // Setting the view coordinates on the map
  issMap.setView([latitude, longitude], issMap.getZoom(2))
  marker.setLatLng([latitude, longitude])

  document.getElementById('lat').textContent = latitude.toFixed(2)
  document.getElementById('lon').textContent = longitude.toFixed(2)
  document.getElementById('alt').textContent = altitude.toFixed(2) + '  km'
  document.getElementById('vel').textContent = formattedVelocityKm + '  km/h'

  // TOGGLE button switches between METRIC and IMPERIAL

  document.addEventListener('click', (e) => {
    if (!e.target.matches('.switch-button')) return
    // e.preventDefault()
    const measurement = document.querySelector('.switch-button')

    measurement.classList.toggle('show')
    if (e.target.innerText === 'Metric') {
      e.target.innerText = 'Imperial'
      // Convert code to Imperial (from Kilometers to Miles)
      function convertKPHtoMPH(kph) {
        return kph * 0.6214
      }

      const altToMiles = convertKPHtoMPH(altitude)
      const velToMiles = convertKPHtoMPH(velocity)
      const formattedVelocity = velToMiles.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })

      document.getElementById('alt').textContent =
        altToMiles.toFixed(2) + '   mi'
      document.getElementById('vel').textContent = formattedVelocity + '  mph'
    } else {
      e.target.innerText = 'Metric'
      // Return code to Metric/Keep Metric
    }
  })
}
getISS()

setInterval(getISS, 2000)
// *
// ********************* BOTTOM MAP ENDS ************************
// *
// *
