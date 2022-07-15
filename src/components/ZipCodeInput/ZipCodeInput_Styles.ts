import styled from "styled-components";
import { colors, fontSize } from "../../styles";

export const InputWrapper = styled.div`
  margin: 15px;
  width: 200px;
  height: auto;
  background: white;
  border-radius: 8px;
  display: flex;
  align-items: center;

  .form-field {
    position: relative;

    &--focused {
      .input-field {
        border: 1px solid ${colors.primary};
      }

      .input-label,
      .input-icon {
        color: ${colors.primary};
      }
    }

    &--error {
      .input-field {
        border: 1px solid red;
      }

      .input-label,
      .input-icon {
        color: red;
      }
    }
  }

  .input-icon {
    position: absolute;
    left: 10px;
    bottom: 12px;
    color: ${colors.gray};
    transition: color 0.2s ease-out;

    &--valid {
      color: ${colors.green};
    }
  }

  .input-field {
    width: 100%;
    height: 40px;
    border-radius: 4px;
    border: 1px solid ${colors.secondary};
    padding-left: 30px;
    padding-right: 5px;
    color: ${colors.secondary};
    transition: border 0.1s ease-out;
    font-size: ${fontSize.sm};

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    input[type="number"] {
      -moz-appearance: textfield;
    }
  }

  .input-label {
    font-size: ${fontSize.xs};
    background-color: white;
    position: absolute;
    z-index: 2;
    top: -10px;
    left: 12px;
    display: block;
    color: ${colors.secondary};
    transition: color 0.2s ease-in-out;

    &:before {
      content: "";
      display: block;
      position: absolute;
      width: 50px;
      left: -3px;
      height: 20px;
      background-color: white;
      z-index: -1;
    }
  }
`;
