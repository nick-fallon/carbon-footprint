import type React from "react";
import { useState } from "react";
import styles from "./CarbonSearchForm.module.css";
import { useLazyGetCarbonQuery } from "../carbonApiSlice";
import { IFlightsQuery } from "../types/flights.types";

export const CarbonSearchForm = () => {
  const [inputs, setInputs] = useState<IFlightsQuery>({
    type: "flight",
    passengers: 1,
    legs: [{ departure_airport: "", destination_airport: "" }],
  });
  // Using a query hook automatically fetches data and returns query values
  const [getCarbon, { data, isError, isLoading, isSuccess }] =
    useLazyGetCarbonQuery({});
  const [carbon, setCarbon] = useState({distance_value: '', carbon_kg: ''})

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
    const response: {distance_value: string; carbon_kg: string;} = {distance_value: '', carbon_kg: ''};
    event.preventDefault();
    setCarbon((await getCarbon(inputs)).data.data.attributes.carbon_kg);
  };

  // if (isError) {
  //   return (
  //     <div>
  //       <h1>There was an error!!!</h1>
  //     </div>
  //   )
  // }
  //
  // if (isLoading) {
  //   return (
  //     <div>
  //       <h1>Loading...</h1>
  //     </div>
  //   )
  // }

  // if (isSuccess && data) {
  return (
    <>
      <h3 className="text-2xl">Flight:</h3>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <label htmlFor="passengers-input">
          Number of Passengers:
          <input
            className="border-2 border-2 text-center"
            type="number"
            name="passengers"
            id="passengers-input"
            min={1}
            value={inputs.passengers}
            onChange={handlePassengersChange}
          />
        </label>
        <label htmlFor="dep-airport">
          Departure Airport Code:
          <input
            className="border-2 border-2 text-center"
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
        <label htmlFor="dest-airport">
          Destination Airport Code:
          <input
            className="border-2 border-2 text-center"
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
        <button className="border-2 border-green-300 w-1/6" type="submit">
          Submit
        </button>
      </form>
      <div>
        {/*<p>{carbon}</p>*/}
      </div>
    </>
  );
  // }

  // return null;
};
