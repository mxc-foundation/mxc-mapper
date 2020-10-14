export const mapServices = [
  {
    name: 'OpenStreetMap',
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  },
  {
    name: 'BlueMarble',
    attribution: '&copy; NASA Blue Marble, image service by OpenGeo',
    url:
      'https://gibs-{s}.earthdata.nasa.gov/wmts/epsg3857/best/BlueMarble_ShadedRelief_Bathymetry/default//EPSG3857_500m/{z}/{y}/{x}.jpeg',
  },
  {
    name: 'Mapbox',
    attribution: 'Map data &copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors, <a href=&quot;https://creativecommons.org/licenses/by-sa/2.0/&quot;>CC-BY-SA</a>, Imagery &copy; <a href=&quot;https://www.mapbox.com/&quot;>Mapbox</a>',
    url: `https://api.mapbox.com/styles/v1/namgyeongcho/ckg8vwf6202uk19p9qac4oevt/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoibmFtZ3llb25nY2hvIiwiYSI6ImNrZzZsOWN1MjA4bjUyc3FpaG1hMjdoenkifQ.mHKbr7wethPzf6QFFeCYWQ`
  }
];
