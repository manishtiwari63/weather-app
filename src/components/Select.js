import React, { useState, useEffect } from "react";
import "./style.css";

const Select = () => {
  const getData = async (city) => {
    const response = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=eecf4ee2ce5b4bc689b170816240503&q=${city}&aqi=no`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch API data");
    }
    return response.json();
  };

  const [city, setCity] = useState("noida");
  const [post, setPost] = useState(null);

  const handleSearch = async () => {
    try {
      const data = await getData(city);
      setPost(data);
    } catch (error) {
      console.error("Error fetching:", error.message);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [city]);

  return (
    <div className="ipone">
      <div>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {post && (
        <div>
          <div className="dflex">
            <h2>{post.location.name}</h2>
            <h2>{post.current.temp_c}°C</h2>
          </div>
          <div className="dflex">
            <h4>{post.current.condition.text}</h4>
            <h4>Wind{post.current.wind_kph} km/h</h4>
          </div>
          <div className="dflex">
            <h4>Date: {post.location.localtime}</h4>
          </div>
        </div>
      )}
    </div>
  );
};

export default Select;
