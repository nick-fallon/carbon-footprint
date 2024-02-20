export interface IFlightsQuery {
  type: string;
  passengers: number;
  legs: IFlightLeg[];
}

interface IFlightLeg {
  departure_airport: string;
  destination_airport: string;
}

export interface ICarbonResults {
  results: {
    distance_unit: string;
    distance_value: string;
    carbon_kg: string;
  }
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
}
