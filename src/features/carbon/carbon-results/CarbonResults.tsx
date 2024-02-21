import type { ICarbonResults } from "../types/flights.types"
import type React from "react"

export const CarbonResults = ({results, isError, isLoading, isSuccess}: ICarbonResults) => {
  const labels = {
    distance_unit: 'Distance Unit',
    distance_value: 'Distance',
    carbon_kg: 'Carbon kg'
  }

  if (isError) {
    return (
      <div>
        <h1>There was an error!!!</h1>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    )
  }

  if (isSuccess && results) {
    return (
      <>
        <ul className="pt-2 w-1/2">
          {(Object.keys(results) as (keyof typeof results)[]).map((attribute, index) => {
            if (results[attribute]) {
              return (
                <li key={index} className="flex flex-row justify-between">
                  <span className="mr-1 font-bold">
                    {labels[attribute]}:
                  </span>
                  <span>
                  {results[attribute]}
                </span>
                </li>
              )
            }
          })}
        </ul>
      </>
    )
  }

  return null;
}
