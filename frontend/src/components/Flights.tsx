import { useSuspenseQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

import Flight from "./Flight";
import { api } from "@/api";
import { FlightResponse } from "../../../shared/types/flight";
import { Button } from "@/components/ui/button";

export default function Flights() {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = useSuspenseQuery({
    queryKey: ["flights", Object.fromEntries(searchParams)],
    queryFn: () =>
      api<FlightResponse>("/flights", {
        query: Object.fromEntries(searchParams),
      }),
  });

  const clearFilters = () => {
    setSearchParams(undefined)
  }

  return (
    <ul className="flex flex-col gap-4 overflow-y-auto pt-4 shrink-0 grow">
      {query.data.flights.length > 0 ? (
        query.data?.flights.map((flight) => (
          <li key={flight.id}>
            <Flight flight={flight} />
          </li>
        ))
      ) : (
        <div className="flex flex-col gap-2 self-center">
          <p>No results are found</p>
          <Button onClick={clearFilters} variant={'default'}>
            Clear Filters
          </Button>
        </div>
      )}
    </ul>
  );
}
