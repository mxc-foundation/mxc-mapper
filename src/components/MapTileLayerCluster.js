import React, { Component } from 'react';
import { useStaticQuery, graphql } from "gatsby";
import L from 'leaflet';
import 'leaflet.markercluster/dist/leaflet.markercluster.js';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'leaflet/dist/leaflet.css';
import './leaflet.css'
import styled from 'styled-components';
//import GatewayStore from '../stores/GatewayStore';
//import { GATEWAY_ICON, MAP_LAYER } from '../util/Data';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import MarkerClusterGroup from "react-leaflet-markercluster";



const Wrapper = styled.div`
    width: ${props => props.width};
    height: ${props => props.height};
    position: relative;
`;
const MapWrapper = styled(Map)`
    width: ${props => props.width};
    height: ${props => props.height};
`;

const MapTileLayerCluster = ({ crd }) => {
    const data = useStaticQuery(graphql`
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
  `)


    let lat = '51.1657';
    let lon = '10.4515';
    if (crd) {
        lat = crd.latitude;
        lon = crd.longitude;
    }
    const position = [lat, lon];


    const createClusterCustomIcon = function (cluster) {
        return L.icon({
            //iconUrl: GATEWAY_ICON,
    
            iconSize: [30, 56], // size of the icon
            shadowSize: [50, 64], // size of the shadow
            iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
            shadowAnchor: [4, 62],  // the same for the shadow
            popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
        });
        /* return L.divIcon({
          html: `<span>${cluster.getChildCount()}</span>`,
          className: 'marker-cluster-custom',
          iconSize: L.point(40, 40, true),
        }); */
      };
    
    const markers = data && data.allMxcSupernode.nodes.map(function (val, index) {
        return <Marker key={val.id} position={[val.location.latitude, val.location.longitude]}></Marker>
    })  

    /* return (
        <Wrapper
            width="100%" height='100%' id='map'
        />
    ); */

    return (<Wrapper>
        <Map center={position} zoom={6} zoomControl={false}>
            <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            detectRetina={true}
            maxZoom={20}
            maxNativeZoom={17}
            attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            />
            
            {/* iconCreateFunction={createClusterCustomIcon} */}
            <MarkerClusterGroup showCoverageOnHover={true}>
                {markers}
            </MarkerClusterGroup>
        </Map>
    </Wrapper>);
};

export default MapTileLayerCluster;