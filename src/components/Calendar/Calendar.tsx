import React, { useCallback, useEffect, useState } from "react";
import { CalendarContainer } from "./Calendar_Styles";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { add, sub, getYear } from "date-fns";
import { CalendarProps } from "./types";
import Day from "./components/Day";
import { getWeekDaysByDate } from "./utils";
import SlideButton from "./components/SlideButton";

const Calendar = ({ date }: CalendarProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    date ? new Date(date) : null
  );
  const [currentDay, setCurrentDay] = useState<Date>(
    date ? new Date(date) : new Date()
  );
  const [weekDays, setWeekDays] = useState<Date[]>([]);

  useEffect(() => {
    const weekDaysArr: Date[] = getWeekDaysByDate(new Date());
    setWeekDays(weekDaysArr);
  }, []);

  useEffect(() => {
    const weekDaysArr: Date[] = getWeekDaysByDate(currentDay);
    setWeekDays(weekDaysArr);
  }, [currentDay]);

  const handlePrevWeek = useCallback((): void => {
    setCurrentDay(sub(currentDay, { weeks: 1 }));
  }, [currentDay]);

  const handleNextWeek = useCallback((): void => {
    setCurrentDay(add(currentDay, { weeks: 1 }));
  }, [currentDay]);

  const handleSelectDate = useCallback((date: Date): void => {
    setSelectedDate(date);
  }, []);

  const checkIsSelectedDate = (date: Date): boolean => {
    if (!selectedDate) return false;
    return +date === +selectedDate;
  };

  return (
    <CalendarContainer>
      <div className="calendar__row">
        <p className="calendar__year">{getYear(currentDay)}</p>
      </div>
      <div className="calendar__row">
        <SlideButton onClick={handlePrevWeek} icon={faAngleLeft} />
        <ul className="calendar__week">
          {weekDays.map((day: Date) => (
            <Day
              key={day.getDate()}
              day={day}
              isSelected={checkIsSelectedDate(day)}
              selectDate={handleSelectDate}
            />
          ))}
        </ul>
        <SlideButton onClick={handleNextWeek} icon={faAngleRight} />
      </div>
    </CalendarContainer>
  );
};

export default Calendar;
