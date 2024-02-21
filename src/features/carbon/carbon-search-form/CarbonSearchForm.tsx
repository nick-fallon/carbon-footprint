import type React from "react";
import { useState } from "react";
import styles from "./CarbonSearchForm.module.scss";
import { useLazyGetCarbonQuery } from "../carbonApiSlice";
import type { IFlightsQuery } from "../types/flights.types";
import { CarbonResults } from "../carbon-results/CarbonResults"

export const CarbonSearchForm = () => {
  const [inputs, setInputs] = useState<IFlightsQuery>({
    type: "flight",
    passengers: 1,
    legs: [{ departure_airport: "", destination_airport: "" }],
  });
  // Using a query hook automatically fetches data and returns query values
  const [getCarbon, { data, isError, isLoading, isSuccess }] =
    useLazyGetCarbonQuery({});
  const [carbon, setCarbon] = useState({distance_unit: '', distance_value: '', carbon_kg: ''});

  const handlePassengersChange = (event: React.FormEvent<HTMLInputElement>) => {
    const name = event.currentTarget.name;
    const value = event.currentTarget.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleAirportChange = (event: React.FormEvent<HTMLInputElement>) => {
    const name = event.currentTarget.name;
    const value = event.currentTarget.value;
    setInputs((values) => ({
      ...values,
      legs: [{ ...values.legs[0], [name]: value }],
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = await getCarbon(inputs);
    setCarbon({
      distance_unit: response.data.data.attributes.distance_unit,
      distance_value: response.data.data.attributes.distance_value,
      carbon_kg: response.data.data.attributes.carbon_kg
    });
  };

  return (
    <>
      <section className="w-1/2 m-4 p-3 border border-licorice bg-platinum">
        <h3 className="text-xl flex self-start font-bold">Flight:</h3>
        <form onSubmit={handleSubmit} className="flex flex-col mb-1">
          <label htmlFor="passengers-input" className="flex flex-row justify-between mb-1">
            <span>
              Number of Passengers:
            </span>
            <input
              className="border border-licorice text-center w-1/4"
              type="number"
              name="passengers"
              id="passengers-input"
              min={1}
              value={inputs.passengers}
              onChange={handlePassengersChange}
            />
          </label>
          <label htmlFor="dep-airport" className="flex flex-row justify-between">
            <span>
              Departure Airport Code:
            </span>
            <input
              className="border border-licorice text-center w-1/4"
              type="text"
              name="departure_airport"
              id="dep-airport"
              maxLength={3}
              minLength={3}
              required
              value={inputs.legs[0]?.departure_airport}
              onChange={handleAirportChange}
            />
          </label>
          <label htmlFor="dest-airport" className="flex flex-row justify-between mt-1">
            <span>
              Destination Airport Code:
            </span>
            <input
              className="border border-licorice text-center w-1/4"
              type="text"
              name="destination_airport"
              id="dest-airport"
              maxLength={3}
              minLength={3}
              required
              value={inputs.legs[0]?.destination_airport}
              onChange={handleAirportChange}
            />
          </label>
          <button className="border border-licorice bg-hunyadi-yellow w-1/6 self-end mt-3" type="submit">
            Submit
          </button>
        </form>
        <CarbonResults results={carbon} isError={isError} isLoading={isLoading} isSuccess={isSuccess} />
      </section>
    </>
  );
};
