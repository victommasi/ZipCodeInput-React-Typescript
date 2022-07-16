import styled from "styled-components";
import { colors, fontSize } from "../../../../styles";

export const ListWrapper = styled.ul`
  position: absolute;
  width: 100%;
  height: auto;
  background: white;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  box-shadow: 0px 2px 10px -2px rgba(0, 0, 0, 0.3);
  max-height: 300px;
  overflow-y: auto;

  ::-webkit-scrollbar {
    width: 5px;
  }

  ::-webkit-scrollbar-track {
    background: ${colors.lightgray};
  }

  ::-webkit-scrollbar-thumb {
    background: ${colors.gray};
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #999;
  }

  > li {
    width: 100%;
    height: 40px;
    transition: background-color 0.15s ease-out;

    &:hover {
      cursor: pointer;
      background-color: ${colors.lightgray};
    }
  }

  .zipcode-button {
    width: 100%;
    height: 100%;
    padding: 5px 10px;
    background: none;
    border: none;
    text-align: left;
  }

  .zipcode-number {
    color: ${colors.primary};
    font-size: ${fontSize.sm};
    margin: 0;
    line-height: 10px;
  }

  .zipcode-info {
    color: ${colors.secondary};
    font-size: ${fontSize.xs};
  }
`;
