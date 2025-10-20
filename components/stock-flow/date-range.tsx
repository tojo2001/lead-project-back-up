"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dispatch, SetStateAction, useState } from "react";

type TProps = { setDateRange: Dispatch<SetStateAction<IDateRange | null>> };

export function DateRange({ setDateRange }: TProps) {
  const [startDateTime, setStartDateTime] = useState<Date | null>(null);
  const [endDateTime, setEndDateTime] = useState<Date | null>(null);

  const handleChange = (
    type: "date" | "time",
    value: string,
    isStart: boolean
  ) => {
    const updater = isStart ? setStartDateTime : setEndDateTime;

    updater((prev) => {
      if (!value) return null;
      const existing = prev ? new Date(prev) : new Date();

      if (type === "date") {
        const [year, month, day] = value.split("-").map(Number);
        existing.setFullYear(year);
        existing.setMonth(month - 1);
        existing.setDate(day);
      } else if (type === "time") {
        const [hours, minutes] = value.split(":").map(Number);
        existing.setHours(hours);
        existing.setMinutes(minutes);
      }

      return existing;
    });
  };

  const extractParts = (date: Date | null) => {
    if (!date) return null;
    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
      hour: date.getHours(),
      minute: date.getMinutes(),
      second: date.getSeconds(),
      millisecond: date.getMilliseconds(),
    };
  };

  const handleValidate = () => {
    const start = extractParts(startDateTime);
    const end = extractParts(endDateTime);

    setDateRange(start && end ? { startDate: start, endDate: end } : null);
  };

  // values
  const startDateValue = startDateTime
    ? startDateTime.toISOString().slice(0, 10)
    : "";
  const startTimeValue = startDateTime
    ? startDateTime.toTimeString().slice(0, 5)
    : "";
  const endDateValue = endDateTime
    ? endDateTime.toISOString().slice(0, 10)
    : "";
  const endTimeValue = endDateTime
    ? endDateTime.toTimeString().slice(0, 5)
    : "";

  return (
    <div className="flex items-center justify-center gap-12 mb-6">
      {/* START DATE */}
      <div>
        <p className="mb-2">Start date</p>
        <div className="flex items-center justify-center space-x-2">
          <Input
            type="date"
            value={startDateValue}
            onChange={(e) => handleChange("date", e.target.value, true)}
          />
          <Input
            type="time"
            value={startTimeValue}
            onChange={(e) => handleChange("time", e.target.value, true)}
          />
        </div>
        <p className="mt-2 text-sm text-gray-500">
          Selected: {startDateTime?.toLocaleString() || "none"}
        </p>
      </div>

      {/* END DATE */}
      <div>
        <p className="mb-2">End date</p>
        <div className="flex items-center justify-center space-x-2">
          <Input
            type="date"
            value={endDateValue}
            onChange={(e) => handleChange("date", e.target.value, false)}
          />
          <Input
            type="time"
            value={endTimeValue}
            onChange={(e) => handleChange("time", e.target.value, false)}
          />
        </div>
        <p className="mt-2 text-sm text-gray-500">
          Selected: {endDateTime?.toLocaleString() || "none"}
        </p>
      </div>

      {/* VALIDATE BUTTON */}
      <div className="flex flex-col justify-end">
        <Button
          onClick={handleValidate}
          disabled={!startDateTime || !endDateTime}
        >
          Validate
        </Button>
      </div>
    </div>
  );
}
