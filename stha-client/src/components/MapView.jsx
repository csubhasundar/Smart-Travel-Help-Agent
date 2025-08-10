import React from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix Leaflet marker icon issue in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

// Example trip data
const trips = [
  {
    name: "Japan 2022",
    color: "red",
    points: [
      [35.6762, 139.6503], // Tokyo
      [34.6937, 135.5023], // Osaka
      [14.5995, 120.9842], // Manila
    ],
  },
  {
    name: "Round The World 2016",
    color: "purple",
    points: [
      [-37.8136, 144.9631], // Melbourne
      [51.5074, -0.1278], // London
      [40.7128, -74.006], // New York
    ],
  },
  {
    name: "Singapore 2018",
    color: "blue",
    points: [
      [1.3521, 103.8198], // Singapore
      [-37.8136, 144.9631], // Melbourne
    ],
  },
];

export default function MapView() {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <div
        style={{
          width: "250px",
          background: "#fff",
          padding: "10px",
          overflowY: "auto",
        }}
      >
        <h3>Your Trips</h3>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {trips.map((trip, i) => (
            <li key={i} style={{ marginBottom: "8px", color: trip.color }}>
              ● {trip.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Map */}
      <div style={{ flex: 1 }}>
        <MapContainer
          center={[20, 0]}
          zoom={2}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {trips.map((trip, index) => (
            <React.Fragment key={index}>
              {/* Draw Polyline for trip */}
              <Polyline
                positions={trip.points}
                color={trip.color}
                weight={3}
                opacity={0.7}
              />

              {/* Add markers for each stop */}
              {trip.points.map((pos, i) => (
                <Marker key={i} position={pos}>
                  <Popup>
                    <strong>{trip.name}</strong> <br />
                    Stop {i + 1}: {pos[0]}, {pos[1]}
                  </Popup>
                </Marker>
              ))}
            </React.Fragment>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
