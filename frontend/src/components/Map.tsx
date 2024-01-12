import React from "react";
import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";

const iconPerson = new L.Icon({
  iconUrl: "/images/adresse.png",
  iconRetinaUrl: "/images/adresse.png",
  className: "leaflet-div-icon",
  iconSize: [30, 30],
});

const Map = () => {
  return (
    <div className="leaflet-container leaflet-touch map-styles">
      {" "}
      <MapContainer center={[45.2139, 5.8582]} zoom={7} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png"
        />
        <Marker position={[44.833328, -0.56667]} icon={iconPerson}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
        <Marker position={[45.2139, 5.8582]} icon={iconPerson}></Marker>
      </MapContainer>
    </div>
  );
};

export default Map;
