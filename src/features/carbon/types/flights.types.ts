export interface IFlightsQuery {
  type: string;
  passengers: number;
  legs: IFlightLeg[];
}

interface IFlightLeg {
  departure_airport: string;
  destination_airport: string;
}
