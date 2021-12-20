import React from "react";
import { Map as LeafletMap, TileLayer } from "react-leaflet";
import "./Map.css";

function Map({ states, casesType, center, zoom }) {
  return (
    <div className="map">
      <LeafletMap center={center} zoom={zoom}>
        <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png" />
      </LeafletMap>
    </div>
  );
}

export default Map;
