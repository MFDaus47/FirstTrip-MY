import { useState } from "react";
import API from "../api/api";

function TripForm({ setResult }) {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [transport, setTransport] = useState("bus");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/trips/estimate", {
        origin,
        destination,
        transport_mode: transport,
      });
      setResult(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to estimate trip");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Origin"
        value={origin}
        onChange={(e) => setOrigin(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Destination"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
        required
      />
      <select value={transport} onChange={(e) => setTransport(e.target.value)}>
        <option value="bus">Bus</option>
        <option value="train">Train</option>
        <option value="car">Car</option>
        <option value="plane">Plane</option>
      </select>
      <button type="submit">Estimate Trip</button>
    </form>
  );
}

export default TripForm;
