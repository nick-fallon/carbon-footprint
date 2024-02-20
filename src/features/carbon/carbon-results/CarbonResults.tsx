import type { ICarbonResults } from "../types/flights.types"
import type React from "react"

export const CarbonResults = ({results, isError, isLoading, isSuccess}: ICarbonResults) => {
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
        <ul>
          {(Object.keys(results) as (keyof typeof results)[]).map((attribute, index) => {
            if (results[attribute]) {
              return (
                <li key={index} className="flex flex-row">
                  <span>
                    {attribute.toString()}
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
