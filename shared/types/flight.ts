import { StateKeys } from "../flightStates"

export interface Route {
  destinations: string[]
  eu: string,
  visa: boolean
}

export interface FlightBase {
  lastUpdatedAt: string
  aircraftType: {
    iataMain: string
    iataSub: string
  }
  flightDirection: "A" | "D"
  flightName: string
  flightNumber: number
  id: string
  isOperationalFlight: boolean
  mainFlight: string
  prefixIATA: string
  prefixICAO: string
  airlineCode: number
  publicFlightState: {
    flightStates: StateKeys[]
  }
  route: Route
  scheduleDateTime: string
  scheduleDate: string
  scheduleTime: `${number}-${number}-${number}`
}

export interface FlightArrival extends FlightBase {
  actualLandingTime?: string
  estimatedLandingTime: string
  flightDirection: "A"
}

export interface FlightDeparture extends FlightBase {
  actualOffBlockTime: string
  aircraftRegistration: string
  publicEstimatedOffBlockTime: string
  expectedSecurityFilter: string
  gate: string
  pier: string
  flightDirection: "D"
}

export interface FlightResponse {
  flights: (FlightArrival | FlightDeparture)[]
}
