import { useQuery } from "@tanstack/react-query";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useSearchParams } from "react-router-dom";
import { api } from "@/api";
import { AirlineResponse } from "../../../shared/types/airline";

const sortByOptions = [
  {
    label: "Flight Name",
    value: "flightName",
  },
  {
    label: "Schedule Date",
    value: "scheduleDate",
  },
  {
    label: "Schedule Time",
    value: "scheduleTime",
  },
  {
    label: "Airline Code",
    value: "airlineCode",
  },
];

export default function Filters() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = useQuery({
    queryKey: ["airlines"],
    queryFn: () => api<AirlineResponse>('/airlines'),
  });

  const handleChange = (key: string, val: string) => {
    setSearchParams((params) => {
      params.set(key, val);
      return params;
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <fieldset>
        <legend className="font-semibold ml-2 mb-4">Sort By</legend>

        <Select
          onValueChange={(val) => handleChange("sort", val)}
          defaultValue={searchParams.get("sort") || undefined}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Empty" />
          </SelectTrigger>
          <SelectContent>
            {sortByOptions.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </fieldset>

      <fieldset>
        <legend className="font-semibold ml-2 mb-4">Airlines Included</legend>

        <RadioGroup
          className="flex flex-col gap-3"
          onValueChange={(val) => handleChange("airlineCode", val)}
          defaultValue={searchParams.get("airlineCode") || undefined}
        >
          {query.data?.airlines.map((airline) => (
            <div key={airline.publicName} className="flex items-center gap-2">
              <RadioGroupItem
                value={airline.nvls.toString()}
                id={airline.iata}
                checked={airline.nvls.toString() === searchParams.get("airlineCode")}
              />
              <Label htmlFor={airline.iata}>{airline.publicName}</Label>
            </div>
          ))}
        </RadioGroup>
      </fieldset>
    </div>
  );
}
