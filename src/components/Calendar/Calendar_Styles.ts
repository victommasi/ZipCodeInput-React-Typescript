import styled from "styled-components";
import { colors, fontSize } from "../../styles";

export const CalendarContainer = styled.div`
  margin: 15px;
  padding: 10px 15px;
  width: 500px;
  height: 120px;
  background: white;
  border-radius: 8px;
  box-shadow: 0px 2px 10px 0px rgb(0, 0, 0, 20%);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .calendar__row {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    &:first-child {
      margin-bottom: 10px;
      border-bottom: 1px solid ${colors.lightgray};
    }
  }

  .calendar__week {
    display: flex;
  }

  .calendar__year {
    font-size: ${fontSize.xl};
    font-weight: 400;
    color: ${colors.primary};
  }

  .calendar__button {
    background-color: white;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    border: none;
    box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.25);
    transition: background ease-out 0.2s;

    &:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }
  }
`;
