import { Dispatch, SetStateAction } from "react";
import { DateRange } from "./date-range";

type TProps = { setDateRange: Dispatch<SetStateAction<IDateRange | null>> };

export default function FilterParameter({ setDateRange }: TProps) {
  return (
    <div>
      <DateRange setDateRange={setDateRange} />
    </div>
  );
}
