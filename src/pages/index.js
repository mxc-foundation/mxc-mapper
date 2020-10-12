import React from 'react';
import { Map } from 'react-leaflet';
import { graphql } from "gatsby";
import FoundLocationMap from "../components/FoundLocationMap";
import Layout from 'components/Layout';

/* import { promiseToFlyTo, getCurrentLocation } from 'lib/map';
import L from 'leaflet';
import Container from 'components/Container';
import Snippet from 'components/Snippet'; */
//import gatsby_astronaut from 'assets/images/gatsby-astronaut.jpg';

const IndexPage = ({ data }) => {
  //const markerRef = useRef();
  
  let position = [];
  position = [51, 13];

  let total = 0;
  if(data){
    total = data.allMxcSupernode.totalCount;
  }
  
  return (
    <Layout pageName="home" total={total}>
      <Map center={position} zoom={6} className="map-container" animate={true} scrollWheelZoom={false}>
          <FoundLocationMap />
      </Map>

      {/* <Container type="content" className="text-center home-start">

        <h2><Trans>Still Getting Started?</Trans></h2>
        <p><Trans>Run the following in your terminal!</Trans></p>
        <Snippet>gatsby new [directory] https://github.com/colbyfayock/gatsby-starter-leaflet</Snippet>
        <p className="note"><Trans>Note: Gatsby CLI required globally for the above command</Trans></p>
        
      </Container> */}
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