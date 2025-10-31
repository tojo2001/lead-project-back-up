"use client";

import { useState, useEffect, RefObject } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLeadQueryStore } from "@/store/use-lead-query.store";

type TProps = {
  dateRangeResetBtnRef: RefObject<HTMLButtonElement>;
};

export default function DateRange({ dateRangeResetBtnRef }: TProps) {
  const { setDateRange, resetDateRange } = useLeadQueryStore();
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

  const extractParts = (date: Date | null, isStart: boolean) => {
    if (!date) return null;
    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
      hour: date.getHours(),
      minute: date.getMinutes(),
      second: isStart ? 0 : date.getSeconds(),
      millisecond: isStart ? 0 : date.getMilliseconds(),
      timezone: "Europe/Paris",
    };
  };

  // ? Automatically set date range when both start & end are filled
  useEffect(() => {
    if (startDateTime && endDateTime) {
      const start = extractParts(startDateTime, true);
      const end = extractParts(endDateTime, false);
      if (start && end) {
        setDateRange({ $dateFromParts: start }, { $dateFromParts: end });
      }
    }
  }, [startDateTime, endDateTime, setDateRange]);

  const clearDateRange = () => {
    setStartDateTime(null);
    setEndDateTime(null);
    resetDateRange();
  };

  const startDateValue = startDateTime
    ? startDateTime.toLocaleDateString("en-CA")
    : "";
  const startTimeValue = startDateTime
    ? startDateTime.toTimeString().slice(0, 5)
    : "";
  const endDateValue = endDateTime
    ? endDateTime.toLocaleDateString("en-CA")
    : "";
  const endTimeValue = endDateTime
    ? endDateTime.toTimeString().slice(0, 5)
    : "";

  return (
    <>
      <div className="space-y-2">
        {/* START DATE */}
        <div className="">
          <p className="text-sm">Start date</p>
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
        </div>

        {/* END DATE */}
        <div className="">
          <p className="text-sm">End date</p>
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
        </div>
      </div>

      {/* ACTIONS */}
      <div className="flex items-center space-x-2">
        <Button
          ref={dateRangeResetBtnRef}
          variant="link"
          className="text-destructive underline"
          onClick={clearDateRange}
          disabled={!startDateTime && !endDateTime}
        >
          Reset Range
        </Button>

        {/* Optional quick-set button */}
        <Button
          variant="link"
          className="text-blue-600 underline"
          onClick={() => {
            const now = new Date();
            setEndDateTime(now);
          }}
        >
          Set to Current
        </Button>
      </div>
    </>
  );
}
