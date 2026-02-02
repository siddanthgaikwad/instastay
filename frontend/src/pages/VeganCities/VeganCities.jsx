import "./VeganCities.css";
import berlinImage from "../../assets/berlin.jpg"
import telAvivImage from "../../assets/tel_aviv.jpg"
import londonImage from "../../assets/london.jpg"
import melbourneImage from "../../assets/melbourneNature.jpg"
import sydneyImage from "../../assets/sydneyNature.jpg"
import losAngelesImage from "../../assets/losAngeles.jpg"
import newYorkImage from "../../assets/newYorkNature.jpg"
import amsterdamImage from "../../assets/amsterdamNature.jpg"
import parisImage from "../../assets/parisNature.jpg"
import {useNavigate} from "react-router-dom"

import { useState } from "react";
import {ComposableMap, Geographies, Geography, Marker, ZoomableGroup} from "react-simple-maps"

// Sample vegan-friendly cities
const cities = [
  {
    name: "Berlin",
    coordinates: [13.405, 52.52],
    image: berlinImage,
    description:
      "Berlin is Europe’s vegan capital, home to hundreds of vegan restaurants, bakeries, and food festivals.",
  },
  {
    name: "Tel Aviv",
    coordinates: [34.7818, 32.0853],
    image: telAvivImage,
    description:
      "Tel Aviv is often called the Vegan Capital of the World, with vegan shawarma, falafel, and bustling street food culture.",
  },
  {
    name: "London",
    coordinates: [-0.1276, 51.5072],
    image: londonImage,
    description:
      "London has a diverse vegan scene, from fine dining to street food and vegan supermarkets all over the city.",
  },
  {
    name: "Melbourne",
    coordinates: [144.9631, -37.8136],
    image: melbourneImage,
    description: "Melbourne is known for its vegan cafes, brunch spots, and vibrant plant-based dining scene.",
  },
  {
    name: "New York",
    coordinates: [-74.006, 40.7128],
    image: newYorkImage,
    description: "New York City has an enormous vegan food scene including fine dining, fast casual, and international cuisine.",
  },
  {
    name: "Los Angeles",
    coordinates: [-118.2437, 34.0522],
    image: losAngelesImage,
    description: "Los Angeles is a vegan hotspot with hundreds of vegan restaurants, food trucks, and plant-based cafes.",
  },
  {
    name: "Sydney",
    coordinates: [151.2093, -33.8688],
    image: sydneyImage,
    description: "Sydney offers an amazing vegan food scene with coastal cafes, restaurants, and vibrant plant-based options.",
  },
  {
    name: "Paris",
    coordinates: [2.3522, 48.8566],
    image: parisImage,
    description: "Paris has seen a boom in vegan cuisine with vegan bakeries, cafes, and fine dining plant-based restaurants.",
  },
];

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";



function VeganCities(){
    const [selectedCity, setSelectedCity] = useState(null);
    const [hoveredCity, setHoveredCity] = useState(null);
    const navigate = useNavigate();

    const sortedCities = [...cities].sort((a,b)=>{
        if (a.name === hoveredCity)  return 1;
        if (b.name === hoveredCity)  return -1;
        return 0;
    });

    return(

        <div className="main-container">

            {/* Map */}
            <div className="map-container">
                <ComposableMap projectionConfig={{scale: 160}}>
                    {/* <ZoomableGroup > */}
                    <Geographies geography={geoUrl}>
                        {({ geographies }) => 
                            geographies.map((geo) => (
                                <Geography 
                                    key={geo.rsmKey}
                                    geography={geo}
                                    className="geography"
                                />
                            ))}
                    </Geographies>
                

                    {sortedCities.map(({name, coordinates,image}) => (
                        <Marker 
                            key={name}
                            coordinates={coordinates}
                        >
                            <foreignObject x={-30} y={-50} width={80} height={80}>
                                <div 
                                    className={`city-marker ${hoveredCity === name ? "active" : ""}`}
                                    onMouseEnter={() => setHoveredCity(name)}
                                    onMouseLeave={() => setHoveredCity(null)}
                                    onClick = {() => setSelectedCity(sortedCities.find((city) => city.name === name))}
                                >
                                    <img src={image} alt={name} className="city-img" />
                                    <span className="city-name">{name}</span>
                                </div>
                            </foreignObject>
                        </Marker>
                    ))}
                    {/* </ZoomableGroup> */}
                </ComposableMap>
            </div>
            
            {/* Sidebar */}
            <div className={`sidebar ${
          selectedCity ? "open" : ""
        } ${window.innerWidth <= 768 ? "bottom-sheet" : ""}`}>
                    {selectedCity ? (
                        <div className="city-card">
                            <img src={selectedCity.image} alt={selectedCity.name} className="city-image" />
                            <h2>{selectedCity.name}</h2>
                            <p>{selectedCity.description}</p>
                            <div className="btn-container">
                                <button className="visit-btn" onClick={() => navigate(`/top-vegan-cities/${selectedCity.name}`)}> visit this</button>
                                <button className="close-btn" onClick={() => setSelectedCity(null)}>✖ Close</button>
                            </div>
                        </div>
                    ): (
                        <div className="sidebar-placeholder">
                          <h3>🌍 Hover or click a city to explore vegan culture</h3>
                        </div>
                    )}
            </div>
            </div>
    )
}

export default VeganCities;