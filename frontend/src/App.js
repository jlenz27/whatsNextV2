import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import './App.css';
import { useEffect, useRef, useState } from 'react';
import { Marker } from 'mapbox-gl';
import axios from 'axios';

function App() {
  const [pins, setPins] = useState([])

  const mapContainerRef = useRef(null);

  useEffect(() => {
    mapboxgl.accessToken = "pk.eyJ1IjoiamxlbnoyMCIsImEiOiJjbGhreWlnN3EwbHJtM2dwczNpdHlkc3d0In0.sSXMjqx4kuGFuoXzZ0MNKQ";
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-117.1611, 32.7157],
      zoom: 12
    });

    // Add event listener for clicking on places
    map.on('click', 'places', (e) => {
      const coordinates = e.features[0].geometry.coordinates.slice();
      const description = e.features[0].properties.description;
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }
      new mapboxgl.Popup()
        .setLngLat(coordinates)
        .setHTML(description)
        .addTo(map);
    });

    // Add event listener for mouseenter on places
    map.on('mouseenter', 'places', () => {
      map.getCanvas().style.cursor = 'pointer';
    });

    // Add event listener for mouseleave on places
    map.on('mouseleave', 'places', () => {
      map.getCanvas().style.cursor = '';
    });

    const marker = new mapboxgl.Marker({
      color: "Blue",
      draggable: false
    }).setLngLat([-117.1611, 32.7157])
      .addTo(map);

    pins.map(p => (
      new mapboxgl.Popup({ closeOnClick: false })
        .setLngLat([p.long, p.lat])
        .setHTML(p.title + '<br>' + p.desc + '<br>' + p.username)
        .addTo(map)
    ))

  }, [pins]);

  useEffect(() => {
    const getPins = async () => {
      try {
        const res = await axios.get("/pins");
        setPins(res.data);

      } catch (err) {
        console.log(err);
      }
    };
    getPins();
  }, [])

  return (
    <div>
      <div ref={mapContainerRef} className="map-container" />
      <div>Hello</div>
    </div>
  );
}

export default App;
