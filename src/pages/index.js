import React, { useRef } from 'react';
import L from 'leaflet';
import { Marker } from 'react-leaflet';
import { graphql } from 'gatsby';
//import FoundLocationMap from '../components/FoundLocationMap';

import { promiseToFlyTo, getCurrentLocation } from 'lib/map';
import Layout from 'components/Layout';
import Map from 'components/Map';
import gatsby_astronaut from 'assets/images/gatsby-astronaut.jpg';


import 'leaflet.markercluster/dist/leaflet.markercluster.js';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'leaflet/dist/leaflet.css';
import '../components/map.styles.css';
import MarkerClusterGroup from 'react-leaflet-markercluster';

const LOCATION = {
  lat: 38.9072,
  lng: -77.0369,
};
const CENTER = [LOCATION.lat, LOCATION.lng];
const DEFAULT_ZOOM = 2;
const MAX_ZOOM = 13;
const ZOOM = 10;

const timeToZoom = 2000;
const timeToOpenPopupAfterZoom = 4000;
const timeToUpdatePopupAfterZoom = timeToOpenPopupAfterZoom + 3000;

const popupContentHello = `<p>Hello 👋</p>`;
const popupContentGatsby = `
  <div class="popup-gatsby">
    <div class="popup-gatsby-image">
      <img class="gatsby-astronaut" src=${gatsby_astronaut} />
    </div>
    <div class="popup-gatsby-content">
      <h1>Gatsby Leaflet Starter</h1>
      <p>Welcome to your new Gatsby site. Now go build something great!</p>
    </div>
  </div>
 `;
const IndexPage = ({ data }) => {
  const markerRef = useRef();

  /* let position = [];
  position = [51, 13]; */

  let total = 0;
  if (data) {
    total = data.allMxcSupernode.totalCount;
  }

  /**
   * mapEffect
   * @description Fires a callback once the page renders
   * @example Here this is and example of being used to zoom in and set a popup on load
   */

  async function mapEffect({ leafletElement } = {}) {
    if (!leafletElement) return;

    const popup = L.popup({
      maxWidth: 800,
    });

    const location = await getCurrentLocation().catch(() => LOCATION);

    const { current = {} } = markerRef || {};
    const { leafletElement: marker } = current;

    marker.setLatLng(location);
    //popup.setLatLng(location);
    //popup.setContent(popupContentHello);

    setTimeout(async () => {
      await promiseToFlyTo(leafletElement, {
        zoom: ZOOM,
        center: location,
      });

      marker.bindPopup(popup);

      /* setTimeout(() => marker.openPopup(), timeToOpenPopupAfterZoom);
      setTimeout(() => marker.setPopupContent(popupContentGatsby), timeToUpdatePopupAfterZoom); */
    }, timeToZoom);
  }

  const markers = data && data.allMxcSupernode.nodes.map( function ( val ) {
    return <Marker ref={markerRef} key={val.id} position={[val.location.latitude, val.location.longitude]}></Marker>;
  });

  const mapSettings = {
    center: CENTER,
    defaultBaseMap: 'Mapbox',
    zoom: DEFAULT_ZOOM,
    maxZoom: MAX_ZOOM, 
    mapEffect
  };
  return (
    <Layout pageName="home" total={total}>
      <Map {...mapSettings} style={{ width: '100%', height: '100vw' }}>
        {/* <Marker ref={markerRef} position={CENTER} /> */}
        {markers}
      </Map>
      { /* <Container type="content" className="text-center home-start">

        <h2><Trans>Still Getting Started?</Trans></h2>
        <p><Trans>Run the following in your terminal!</Trans></p>
        <Snippet>gatsby new [directory] https://github.com/colbyfayock/gatsby-starter-leaflet</Snippet>
        <p className="note"><Trans>Note: Gatsby CLI required globally for the above command</Trans></p>
        
      </Container> */ }
    </Layout>
  );
};

export default IndexPage;

export const query = graphql`
  query {
    allMxcSupernode {
    nodes {
      location {
        altitude
        latitude
        longitude
      }
      id
    }
    totalCount
  }
}
`;
