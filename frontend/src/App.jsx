import "./App.css";
import TripForm from "@/components/TripForm";
import { useState } from "react";

function App() {
  const [result, setResult] = useState(null);

  return (
    <>
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
    </>
  );
}

export default App;
