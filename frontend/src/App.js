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
    const marker = new mapboxgl.Marker({
      color: "Blue",
      draggable: false
    }).setLngLat([-117.1611, 32.7157])
      .addTo(map);


      pins.map(p => (
        new mapboxgl.Popup({ closeOnClick: false })
          .setLngLat([p.long, p.lat])
          .setHTML(p.title + p.desc + p.username)
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