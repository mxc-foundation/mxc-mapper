/* eslint-disable */
import React, { useRef } from "react";
import { isMobile } from "react-device-detect";
import L from "leaflet";
import { Marker } from "react-leaflet";
import { graphql } from "gatsby";
/* import FoundLocationMap from '../components/FoundLocationMap'; */

import { getCurrentLocation } from "lib/map";
import Layout from "components/Layout";
import Map from "components/Map";
import { Icon } from "leaflet/src/layer/marker";
import { Random } from "random-js";
import "leaflet.markercluster/dist/leaflet.markercluster.js";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet/dist/leaflet.css";
import "../components/map.styles.css";
import MarkerClusterGroup from "react-leaflet-markercluster";
import { Helmet } from "react-helmet";
/* import {DefaultIcon} from '../components/DefaultIcon';  */

const LOCATION = {
  lat: 52.12,
  lng: 13.405,
};
const CENTER = [LOCATION.lat, LOCATION.lng];
const DEFAULT_ZOOM = 10;
const MAX_ZOOM = 13;
const MIN_ZOOM = 3;

const generateRandomLoc = () => {
  const random = new Random();
  const value = random.integer(1, 100);
  return value / 10000 + 0.01;
};

/**
 * This is markercluster's default iconCreateFunction with a className modifier.
 * @see https://github.com/Leaflet/Leaflet.markercluster/blob/15ed12654acdc54a4521789c498e4603fe4bf781/src/MarkerClusterGroup.js#L542
 */
function createDefaultClusterMarker(cluster, additionalClasses = "") {
  const childCount = cluster.getChildCount();

  let c = " marker-cluster-";
  if (childCount < 10) {
    c += "small";
  } else if (childCount < 100) {
    c += "medium";
  } else {
    c += "large";
  }

  return new L.DivIcon({
    html: "<div><span>" + childCount + "</span></div>",
    className: additionalClasses + " marker-cluster" + c,
    iconSize: new L.Point(40, 40),
  });
}
function createMinerClusterMarker(cluster) {
  return createDefaultClusterMarker(cluster, "background-color-miners");
}

function createLp1ClusterMarker(cluster) {
  return createDefaultClusterMarker(cluster, "background-color-lpwan");
}

const IndexPage = ({ data }) => {
  const markerRef = useRef();
  let total = 0;
  let lwpanTotal = 0;
  if (data) {
    total = data.allMxcSupernode.totalCount;
    lwpanTotal = data.allLpwanGateways.totalCount;
  }

  /**
   * mapEffect
   * @description Fires a callback once the page renders
   * @example Here this is and example of being used to zoom in and set a popup on load
   */

  async function mapEffect({ leafletElement } = {}) {
    if (!leafletElement) return;
    if (!data) return;

    const location = await getCurrentLocation().catch(() => LOCATION);

    const { current = {} } = markerRef || {};
    const { leafletElement: marker } = current;

    marker.setLatLng(location);
  }
  let open = false;
  if (typeof window !== "undefined") {
    if (window.innerWidth > 800) {
      open = true;
    }
  }

  let markerIcon = null;
  let markerIcon2 = null;
  if (typeof window !== "undefined") {
    markerIcon = new Icon({
      iconUrl: require("../assets/images/diconActive.svg"),
      iconRetinaUrl: require("../assets/images/diconActive.svg"),
      iconAnchor: null,
      popupAnchor: null,
      shadowUrl: null,
      shadowSize: null,
      shadowAnchor: null,
      iconSize: [30, 30],
    });
    markerIcon2 = new Icon({
      iconUrl: require("../assets/images/diconInactive.svg"),
      iconRetinaUrl: require("../assets/images/diconInactive.svg"),
      iconAnchor: null,
      popupAnchor: null,
      shadowUrl: null,
      shadowSize: null,
      shadowAnchor: null,
      iconSize: [30, 30],
    });
  }

  const markers =
    data &&
    data.allMxcSupernode.nodes.map(function (val, index) {
      return (
        <Marker
          ref={markerRef}
          key={index}
          icon={!!markerIcon ? markerIcon : null}
          position={[
            val.location.latitude + generateRandomLoc(),
            val.location.longitude + generateRandomLoc(),
          ]}
        ></Marker>
      );
    });

  const markers2 =
    data &&
    data.allLpwanGateways.nodes.map(function (val, index) {
      return (
        <Marker
          ref={markerRef}
          key={index}
          icon={!!markerIcon2 ? markerIcon2 : null}
          position={[
            val.location.latitude + generateRandomLoc(),
            val.location.longitude + generateRandomLoc(),
          ]}
        />
      );
    });

  const mapSettings = {
    center: CENTER,
    defaultBaseMap: "Mapbox",
    zoom: DEFAULT_ZOOM,
    maxZoom: MAX_ZOOM,
    minZoom: MIN_ZOOM,
    preferCanvas: true,
    mapEffect,
  };

  // TODO: profile performance
  // 1. setup performance counters (timers); e.g.: how much time between start + first render complete (post render hook)?
  // 2. check out React profiler tools
  // 3. experiment with values to reduce time spent on several tasks
  const maxClusterRadius = 80; // default = 80px

  return (
    <Layout pageName="home" total={total} lpwanTotal={lwpanTotal} open={open}>
      <Helmet>
        <title>MXC Mapper - LPWAN Gateway and MXC Crypto Miner Map</title>
        <meta
          name="description"
          content="Meta Description: Easily visualize the over MatchX 40,000 LPWAN Gateways and 3,300 M2 Pro Miner (MXC Cryptocurrency Miner) active all over the world."
        />
      </Helmet>
      <Map {...mapSettings}>
        <MarkerClusterGroup
          showCoverageOnHover
          maxClusterRadius={maxClusterRadius}
          iconCreateFunction={createMinerClusterMarker}
        >
          {markers}
        </MarkerClusterGroup>
        <MarkerClusterGroup
          showCoverageOnHover
          maxClusterRadius={maxClusterRadius}
          iconCreateFunction={createLp1ClusterMarker}
        >
          {markers2}
        </MarkerClusterGroup>
      </Map>
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
    mxcSupernode {
      id
    }
    allLpwanGateways {
      totalCount
      nodes {
        location {
          altitude
          latitude
          longitude
        }
      }
    }
  }
`;
