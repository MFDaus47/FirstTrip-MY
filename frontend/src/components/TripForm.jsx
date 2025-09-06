import { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import API from "../api/api";

export default function TripForm({ setResult }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      console.log("Submitting to:", API.defaults.baseURL + "/trips/estimate");

      const res = await API.post("/trips/estimate", {
        origin: data.origin,
        destination: data.destination,
        transport_mode: data.transport,
      });
      setResult(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to estimate trip");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        type="text"
        placeholder="Origin"
        {...register("origin", { required: true })}
      />
      <Input
        type="text"
        placeholder="Destination"
        {...register("destination", { required: true })}
      />
      {errors.destination && <span>Destination is required</span>}

      <select {...register("transport")}>
        <option value="bus">Bus</option>
        <option value="train">Train</option>
        <option value="car">Car</option>
        <option value="plane">Plane</option>
      </select>
      <button type="submit">Estimate Trip</button>
    </form>
  );
}
