import React, { useRef } from 'react';
import { Helmet } from 'react-helmet';
import { Trans, useTranslation } from 'gatsby-plugin-react-i18next';
import L from 'leaflet';
import { Marker } from 'react-leaflet';
import { graphql } from "gatsby";
import { promiseToFlyTo, getCurrentLocation } from 'lib/map';

import Layout from 'components/Layout';
import Container from 'components/Container';
import Map from 'components/Map';
import Snippet from 'components/Snippet';

import gatsby_astronaut from 'assets/images/gatsby-astronaut.jpg';



const LOCATION = {
  lat: 38.9072,
  lng: -77.0369,
};
const CENTER = [LOCATION.lat, LOCATION.lng];
const DEFAULT_ZOOM = 2;
const ZOOM = 10;

const timeToZoom = 2000;
const timeToOpenPopupAfterZoom = 4000;
const timeToUpdatePopupAfterZoom = timeToOpenPopupAfterZoom + 3000;



const IndexPage = ({ data }) => {
  const markerRef = useRef();
  const { t } = useTranslation();
  
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

    const popupContentHello = `<p>${t('Hello')} 👋</p>`;
    const popupContentGatsby = `
      <div class="popup-gatsby">
        <div class="popup-gatsby-image">
          <img class="gatsby-astronaut" src=${gatsby_astronaut} />
        </div>
        <div class="popup-gatsby-content">
          <h1>Gatsby Leaflet ${t('Starter')}</h1>
          <p><Trans>${t('Welcome to your new Gatsby site. Now go build something great!')}</Trans></p>
        </div>
      </div>
    `;

    marker.setLatLng(location);
    //marker.setLatLng( {lat: 52.6091575, lng: 13.5164579 } );
    popup.setLatLng(location);
    popup.setContent(popupContentHello);

    setTimeout(async () => {
      await promiseToFlyTo(leafletElement, {
        zoom: ZOOM,
        center: location,
      });

      marker.bindPopup(popup);

      setTimeout(() => marker.openPopup(), timeToOpenPopupAfterZoom);
      setTimeout(() => marker.setPopupContent(popupContentGatsby), timeToUpdatePopupAfterZoom);
    }, timeToZoom);
  }

  const mapSettings = {
    center: CENTER,
    defaultBaseMap: 'OpenStreetMap',
    zoom: DEFAULT_ZOOM,
    mapEffect,
  };


  //const totalCount = data.allMxcSupernode.totalCount;
  console.log('locations', data);
  let locations = new Array();

  data.allMxcSupernode.nodes.forEach(function(val,index){ 
    locations.push({lat: val.location.latitude,lng: val.location.longitude, id: val.id});
  })


  //const [count, setCount] = useState(0);
  return (
    <Layout pageName="home">
      <Helmet>
        <title>{t('project')}</title>
      </Helmet>

      <Map {...mapSettings}>
        <Marker ref={markerRef} position={CENTER} />

        {locations.map((location, index) => {
          return <Marker key={location.id} position={{ lat: location.lat, lng: location.lng }}></Marker>
        })}
      </Map>

      <Container type="content" className="text-center home-start">

        <h2><Trans>Still Getting Started?</Trans></h2>
        <p><Trans>Run the following in your terminal!</Trans></p>
        <Snippet>gatsby new [directory] https://github.com/colbyfayock/gatsby-starter-leaflet</Snippet>
        <p className="note"><Trans>Note: Gatsby CLI required globally for the above command</Trans></p>
        
      </Container>
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
`