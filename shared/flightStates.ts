export const arrivingFlightStates = {
  SCH: 'Flight Scheduled',
  AIR: 'Airborne',
  EXP: 'Expected Landing',
  FIR: 'Flight in Dutch airspace',
  LND: 'Landed',
  FIB: 'FIBAG',
  ARR: 'Arrived Flight has been completely handeled',
  DIV: 'Diverted',
  CNX: 'Cancelled',
  TOM: 'Tomorrow',
}

export const departingFlightStates = {
  SCH: 'Flight Scheduled',
  DEL: 'Delayed',
  WIL: 'Wait in Lounge',
  GTO: 'Gate Open',
  BRD: 'Boarding',
  GCL: 'Gate Closing',
  GTD: 'Gate Closed',
  DEP: 'Departed',
  CNX: 'Cancelled',
  GCH: 'Gate Change',
  TOM: 'Tomorrow'
}

export type StateKeys = keyof typeof arrivingFlightStates & keyof typeof departingFlightStates
