import Flight from "@/components/Flight";
import Loading from "@/components/ui/Loading";
import { buttonVariants } from "@/components/ui/button";

import { api } from "@/api";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { FlightDeparture } from "../../../shared/types/flight"

export default function Flights() {
  const query = useQuery({
    queryKey: ["meFlights"],
    queryFn: () => api<FlightDeparture[]>("/me/flights"),
  });

  return (
    <div className="flex flex-col overflow-hidden gap-4">
      <Link to={"/"} className={`${buttonVariants({ variant: 'default' })} w-max`}>Back to all flights</Link>

      {query.isPending ? (
        <Loading />
      ) : (
        <ol className="grid lg:grid-cols-2 overflow-y-auto gap-4">
          {query.data?.map((flight) => (
            <li key={flight.id}>
              <Flight flight={flight} booked={true} />
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
