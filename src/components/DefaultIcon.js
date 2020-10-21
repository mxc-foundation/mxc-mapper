import L from 'leaflet';

const DefaultIcon = new L.Icon({
    iconUrl: require('../assets/images/diconActive.svg'),
    iconRetinaUrl: require('../assets/images/diconActive.svg'),
    iconAnchor: null,
    popupAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(30, 30),
    className: 'leaflet-div-icon'
});

export { DefaultIcon };