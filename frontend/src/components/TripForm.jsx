import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import API from "../api/api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "./ui/button";

export default function TripForm({ setResult }) {
  const {
    register,
    handleSubmit,
    control,
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
      <Controller
        name="transport"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <Select onValueChange={field.onChange} value={field.value}>
            <SelectTrigger>
              <SelectValue placeholder="Select Transport mode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bus">Bus</SelectItem>
              <SelectItem value="train">Train</SelectItem>
              <SelectItem value="car">Car</SelectItem>
              <SelectItem value="plane">Plane</SelectItem>
            </SelectContent>
          </Select>
        )}
      />
      {errors.transport && <span>Transport is required</span>}
      <div>
        <Button type="submit">Estimate Trip</Button>
      </div>
    </form>
  );
}
