import styled from "styled-components";
import { colors, fontSize } from "../../../../styles";

export const DayWrapper = styled.li`
  margin: 0 10px;
  width: 40px;
  height: 60px;
  background-color: white;
  border-radius: 4px;
  transition: box-shadow ease-out 0.2s;

  &:hover {
    box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.25);
  }
`;

export const Button = styled.button`
  padding: 10px;
  width: 100%;
  height: 100%;
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: inherit;
  transition: background ease-out 0.2s;
  background: ${(props: any) =>
    props.isSelected ? `${colors.primary}` : "white"};
  border: ${(props: any) =>
    props.isToday ? `1px solid ${colors.primary}` : "none"};

  .day__month {
    font-size: ${fontSize.xs};
    font-weight: 300;
    margin-top: -8px;
    color: ${(props: any) =>
      props.isSelected ? `white` : `${colors.primary}`};
  }

  .day__name {
    font-size: ${fontSize.sm};
    font-weight: 300;
    text-transform: uppercase;
    line-height: 1;
    color: ${(props: any) =>
      props.isSelected ? `white` : `${colors.secondary}`};
  }

  .day__number {
    font-size: ${fontSize.lg};
    font-weight: 600;
    color: ${(props: any) =>
      props.isSelected ? `white` : `${colors.secondary}`};
  }
`;
