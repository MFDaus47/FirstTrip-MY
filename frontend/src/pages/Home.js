import { useState } from "react";
import TripForm from "../components/TripForm";

export default function Home() {
  const [result, setResult] = useState(null);

  return (
    <div>
      <h1>FirstTrip-MY: Trip Cost Estimator</h1>
      <TripForm setResult={setResult} />

      {result && (
        <div style={{ marginTop: "20px" }}>
          <h2>Estimated Trip Cost</h2>
          <p>From: {result.origin}</p>
          <p>To: {result.destination}</p>
          <p>Transport: {result.transport_mode}</p>
          <p>Estimated Cost: RM {result.estimated_cost}</p>
        </div>
      )}
    </div>
  );
}
