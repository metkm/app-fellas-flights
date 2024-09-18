import { Flight } from "../../../shared/types/flight";
import { IoAirplaneSharp } from "react-icons/io5";
import { LineSeperator } from "./Flight";
import { getHourDifference } from "@/lib/utils";

export default function MyFlight({ flight }: { flight: Flight }) {
  const estimatedLandingTime = new Date(flight.actualLandingTime || flight.estimatedLandingTime);
  const scheduleDateTime = new Date(flight.scheduleDateTime);

  const diff = getHourDifference(estimatedLandingTime, scheduleDateTime);

  return (
    <div className="flex flex-wrap items-center gap-8 p-8 px-8 rounded-sm bg-white">
      <div className="flex items-center gap-8">
        <IoAirplaneSharp size={42} className="fill-primary" />

        <div className="flex items-center gap-2">
          <p>{scheduleDateTime.toLocaleTimeString()}</p>
          <LineSeperator />
          <p>{estimatedLandingTime.toLocaleTimeString()}</p>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <p className="font-semibold">{flight.flightName}</p>

        <div className="flex items-center gap-4">
          <div>
            <p className="text-sm text-neutral-500">Nonstop</p>
            <p>{diff}</p>
          </div>

          <div>
            <p className="text-sm text-neutral-500">Aircraft Type</p>
            <p>{flight.aircraftType.iataMain}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
