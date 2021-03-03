/* eslint-disable */
const token = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
console.log(JSON.stringify(process.env));
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
    url: `https://api.mapbox.com/styles/v1/mxcdatadash/ck9qr005y5xec1is8yu6i51kw/tiles/256/{z}/{x}/{y}@2x?access_token=${token}`
  }
];
/* eslint-enable */