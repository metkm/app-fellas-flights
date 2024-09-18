export interface Airline {
  iata: string
  icao: string
  nvls: number
  publicName: string
}

export interface AirlineResponse {
  airlines: Airline[]
}
