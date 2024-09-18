export interface Route {
  destinations: string[]
  eu: string,
  visa: boolean
}

export interface Flight {
  lastUpdatedAt: string
  aircraftType: {
    iataMain: string
    iataSub: string
  }
  actualLandingTime?: string
  estimatedLandingTime: string
  flightDirection: string
  flightName: string
  flightNumber: number
  id: string
  isOperationalFlight: boolean
  mainFlight: string
  prefixIATA: string
  prefixICAO: string
  airlineCode: number
  route: Route
  scheduleDateTime: string
  scheduleDate: string
  scheduleTime: `${number}-${number}-${number}`
}

export interface FlightResponse {
  flights: Flight[]
}
