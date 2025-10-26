"use client";
import React, { useState } from "react";
import { CalendarIcon } from "lucide-react";
import { DayPicker } from "react-day-picker";
import { dateFormat } from "@/app/_helpers/appConstants";
import { format } from "date-fns";

function SingleDatePicker({ date, onChangeDate }) {
  const [showPicker, setShowPicker] = useState(false);

  function handleDateChange(date) {
    if (!date) return;
    onChangeDate(date);
    setShowPicker(!showPicker);
  }

  return (
    <>
      <label htmlFor="invoice-date" className="py-2">
        Date
      </label>
      <label
        id="invoice-date"
        className="px-5 h-[42px] py-2 border w-full border-primary-600 rounded-xl hover:bg-primary-600"
        onClick={() => setShowPicker(!showPicker)}
      >
        <div className="flex flex-row gap-2">
          {format(date, dateFormat)}
          <CalendarIcon />
        </div>
      </label>
      <div className="relative">
        <div
          hidden={!showPicker}
          id="invoice-date"
          className="absolute bg-primary-700 rounded-md p-2 my-4"
        >
          <DayPicker
            mode="single"
            selected={date}
            onSelect={handleDateChange}
            classNames={{
              root: "p-2",
              month: "space-y-2",
              caption: "pb-2",
              week: "gap-2",
              day: "p-2",
            }}
          />
        </div>
      </div>
    </>
  );
}

export default SingleDatePicker;
