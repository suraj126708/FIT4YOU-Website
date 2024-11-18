import React from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

const libraries = ["places"];
const mapContainerStyle = {
  width: "100%",
  height: "100%",
};
const center = {
  //18.4795486467518, 73.86488666924153
  lat: 18.4795486467518,
  lng: 73.86488666924153,
};

export default function Gmap() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyB3Bxjq0QKzJOFwBaXzVax8XWPs2fyLp9w",
    libraries,
  });

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps</div>;
  }

  return (
    <div className="lg:h-[60vh] w-[90vh]">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={14}
        center={center}
      >
        <Marker position={center} />
      </GoogleMap>
    </div>
  );
}

//AIzaSyAfS636asAHIUcsJzbzQf2wpaPWEpD1XC0npm
