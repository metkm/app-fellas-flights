import Loading from "@/components/ui/Loading";
import MyFlight from "@/components/MyFlight";
import { buttonVariants } from "@/components/ui/button";

import { api } from "@/api";
import { useQuery } from "@tanstack/react-query";
import { Flight } from "../../../shared/types/flight";
import { Link } from "react-router-dom";

export default function Flights() {
  const query = useQuery({
    queryKey: ["meFlights"],
    queryFn: () => api<Flight[]>("/me/flights"),
  });

  return (
    <div className="flex flex-col gap-4">
      <Link to={"/"} className={`${buttonVariants({ variant: 'default' })} w-max`}>Back to all flights</Link>

      {query.isPending ? (
        <Loading />
      ) : (
        <ol className="flex flex-wrap gap-4">
          {query.data?.map((flight) => (
            <li key={flight.id}>
              <MyFlight flight={flight} />
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
