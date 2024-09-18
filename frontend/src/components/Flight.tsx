import { TbPlaneDeparture, TbPlaneArrival } from "react-icons/tb";
import { IoAirplaneSharp } from "react-icons/io5";
import { Flight as TFlight } from "../../../shared/types/flight";
import { HtmlHTMLAttributes } from "react";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/api";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { getHourDifference } from "@/lib/utils";

const ArrivalAndDeparture = ({
  st,
  date,
  code,
}: {
  st: "Departure" | "Arrival";
  date: Date;
  code: string;
}) => {
  return (
    <div>
      <div className="flex items-center gap-2">
        {st === "Departure" ? <TbPlaneDeparture /> : <TbPlaneArrival />}
        <p className="text-neutral-400 text-sm">{st}</p>
      </div>

      <p className="font-semibold">{date.toLocaleTimeString()}</p>
      <p>Airport: {code}</p>
    </div>
  );
};

export const LineSeperator = <T extends HTMLDivElement>(props: HtmlHTMLAttributes<T>) => {
  return <div className="hidden lg:block grow min-w-10 max-w-xs bg-neutral-300 rounded-lg h-1" {...props} />;
};

export default function Flight({ flight }: { flight: TFlight }) {
  const navigate = useNavigate()

  const actualLandingTime = new Date(flight.actualLandingTime || flight.estimatedLandingTime);
  const scheduleDateTime = new Date(flight.scheduleDateTime);

  const diff = getHourDifference(actualLandingTime, scheduleDateTime)

  const handleBookFlight = () => {
    mutation.mutate({
      flight
    })
  };

  const mutation = useMutation({
    mutationFn: async (params: Record<string, unknown>) => api('/me/flights', {
      method: "POST",
      body: params,
      onResponse: (response) => {
        toast.success(response.response._data.message)

        if (response.response.status !== 409) {
          navigate('/flights')
        }
      }
    }),
  })

  return (
    <div>
      <div className="bg-white rounded-sm overflow-hidden rounded-bl-none">
        <div className="flex flex-col gap-4 p-4">
          <p className="font-semibold text-lg">{flight.flightName}</p>

          <div className="flex items-center gap-8 justify-between">
            <ArrivalAndDeparture st="Departure" date={scheduleDateTime} code="123" />
            <LineSeperator />

            <div className="flex flex-col items-center">
              <p className="font-semibold">{flight.mainFlight}</p>
              <IoAirplaneSharp className="fill-violet-800 stroke-violet-800" size={24} />
            <p className="text-sm text-neutral-400">{diff}</p>
            </div>

            <LineSeperator />
            <ArrivalAndDeparture st="Arrival" date={actualLandingTime} code="123" />
          </div>
        </div>

        <div className="flex justify-between">
          <div className="p-4 pt-0">{/* <p>Price</p> */}</div>

          <Button
            onClick={handleBookFlight}
            className="p-8 rounded-none rounded-tl-sm"
            loading={mutation.isPending}
          >
            Book Flight
          </Button>
        </div>
      </div>

      <a className="inline-block bg-violet-400/40 text-violet-800 text-sm p-4 px-8 hover:underline rounded-sm rounded-t-none">
        Check the details
      </a>
    </div>
  );
}
