import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import './App.css';
import { useEffect, useRef } from 'react';

function App() {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    mapboxgl.accessToken = "pk.eyJ1IjoiamxlbnoyMCIsImEiOiJjbGhreWlnN3EwbHJtM2dwczNpdHlkc3d0In0.sSXMjqx4kuGFuoXzZ0MNKQ";
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11'
    });
  }, []);

  return (
    <div>
      <div ref={mapContainerRef} className="map-container" />
      <div>Hello</div>
    </div>
    
  );
}

export default App;