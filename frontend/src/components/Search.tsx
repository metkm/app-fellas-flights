import { IoMdCalendar } from "react-icons/io";
import { IoAirplaneSharp } from "react-icons/io5";
import { cn, getDateString } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { useSearchParams } from "react-router-dom";

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();

  const direction = searchParams.get("flightDirection") || undefined;

  const from = searchParams.get("fromScheduleDate");
  const dateFrom = from ? new Date(from) : undefined;

  const to = searchParams.get("toScheduleDate");
  const toDate = to ? new Date(to) : undefined;

  const getDayDiff = (date: Date) => {
    if (!dateFrom) return;

    const diff = date.getTime() - dateFrom.getTime();
    const diffDay = Math.round(diff / (1000 * 3600 * 24));
    return diffDay;
  };

  const handleChange = (key: string, val: string) => {
    setSearchParams((params) => {
      params.set(key, val);
      return params;
    });
  };

  const handleDateChange = (key: string, val?: Date) => {
    if (!val) return;

    setSearchParams((params) => {
      params.set(key, getDateString(val));

      if (key === "fromScheduleDate" && toDate) {
        const diffDay = getDayDiff(toDate);

        // If we have both dates and change the from schedule then we should keep the from and to dates max of 3 days
        if (diffDay !== undefined && (diffDay >= 3 || diffDay <= 0)) {
          params.delete("toScheduleDate");
        }
      }

      return params;
    });
  };

  return (
    <section className="flex flex-col gap-4 p-4 bg-white rounded-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <IoAirplaneSharp size={24} />
          <p className="font-bold text-lg uppercase">Book Your Flight</p>
        </div>

        <div className="flex">
          <Button
            onClick={() => handleChange("flightDirection", "A")}
            variant={direction === "D" ? "secondary" : "default"}
            className="rounded-r-none"
          >
            Round trip
          </Button>
          <Button
            onClick={() => handleChange("flightDirection", "D")}
            variant={direction === "A" ? "secondary" : "default"}
            className="rounded-l-none"
          >
            One way
          </Button>
        </div>
      </div>

      <div className="flex items-center max-w-md gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "grow lg:w-[280px] rounded-r-none justify-start text-left font-normal",
                !dateFrom && "text-muted-foreground"
              )}
            >
              <IoMdCalendar className="mr-2 h-4 w-4" />
              {dateFrom ? format(dateFrom, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={dateFrom}
              onSelect={(val) => handleDateChange("fromScheduleDate", val)}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "grow lg:w-[280px] rounded-l-none justify-start text-left font-normal",
                !toDate && "text-muted-foreground"
              )}
            >
              <IoMdCalendar className="mr-2 h-4 w-4" />
              {toDate ? format(toDate, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={toDate}
              onSelect={(val) => handleDateChange("toScheduleDate", val)}
              disabled={(date) => {
                if (!dateFrom) return false;

                const diffDay = getDayDiff(date);
                if (!diffDay) return false;

                return diffDay > 3 || diffDay < 0;
              }}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
    </section>
  );
}
