import { useState } from "react";
import Layout from "../components/Layout";
import "./css/home.css";

export default function Home() {
  const [occasion, setOccasion] = useState("");
  const [weather, setWeather] = useState("");

  return (
    <Layout>
      <div className="home-container">
        <h1 className="home-title">
          Curate Your Perfect Look
        </h1>

        <p className="home-subtitle">
          Intelligent styling powered by your wardrobe.
        </p>

        <div className="controls">
          <select
            id="occasion-select"
            value={occasion}
            onChange={(e) => setOccasion(e.target.value)}
          >
            <option value="">Select Occasion</option>
            <option>Casual</option>
            <option>Formal</option>
            <option>Party</option>
            <option>Office</option>
          </select>

          <select
            id="weather-select"
            value={weather}
            onChange={(e) => setWeather(e.target.value)}
          >
            <option value="">Select Weather</option>
            <option>Hot</option>
            <option>Cold</option>
            <option>Mild</option>
          </select>

          <button id="generate-btn" className="generate-btn">
            Generate Outfit
          </button>
        </div>

        <div className="featured-outfit">
          <h2>Featured Outfit</h2>
          <div className="outfit-card">
            <p>No outfit generated yet.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}