import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken =
  "pk.eyJ1IjoidGFueWEzNCIsImEiOiJja3VrM25zOW4xM3BtMnFuNmkxYmh2Y2RwIn0.T7oCfAOG9N--kP6s4-Td2A";
var map = new mapboxgl.Map({
  container: "main-map",
  style: "mapbox://styles/mapbox/light-v10",
  center: [2.3364, 48.86091],
  zoom: 15.8,
});

const marker1 = new mapboxgl.Marker({ color: "#171717" })
  .setLngLat([2.3364, 48.86091])
  .addTo(map);

const marker2 = new mapboxgl.Marker({ color: "#757575" })
  .setLngLat([2.3333, 48.8602])
  .addTo(map);

const marker3 = new mapboxgl.Marker({ color: "#757575" })
  .setLngLat([2.3397, 48.8607])
  .addTo(map);

const marker4 = new mapboxgl.Marker({ color: "#757575" })
  .setLngLat([2.333, 48.8619])
  .addTo(map);

const marker5 = new mapboxgl.Marker({ color: "#757575" })
  .setLngLat([2.3365, 48.8625])
  .addTo(map);

const nav = new mapboxgl.NavigationControl({
  visualizePitch: true,
});
map.addControl(nav, "top-right");
