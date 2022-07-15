import React, { memo } from "react";
import { DayWrapper, Button } from "./Day_Styles";
import { DayProps } from "../../types";
import { format } from "date-fns";

const Day = ({ day, isSelected = false, selectDate }: DayProps) => {
  const date = new Date(day);
  const parsedDayName = format(date, "EEE");
  const parsedDayNumber = format(date, "dd");
  const parsedDayMonth = format(date, "MMM");
  const isToday = new Date().toLocaleDateString() === date.toLocaleDateString();

  return (
    <DayWrapper>
      <Button
        onClick={() => selectDate(date)}
        isToday={isToday}
        isSelected={isSelected}
      >
        <p className="day__name">{parsedDayName}</p>
        <p className="day__number"> {parsedDayNumber} </p>
        <p className="day__month"> {parsedDayMonth} </p>
      </Button>
    </DayWrapper>
  );
};

export default memo(Day);
