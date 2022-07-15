import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export type DayProps = {
  day: Date;
  isSelected: boolean;
  selectDate: (day: Date) => void;
};

export type WeekProps = {
  weekDays: Date[];
};

export type CalendarProps = {
  date?: string;
};

export type SlideButtonProps = {
  onClick: () => void;
  icon: IconDefinition;
};
