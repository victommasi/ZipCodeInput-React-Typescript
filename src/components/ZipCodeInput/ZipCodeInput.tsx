import React, { useCallback, useEffect, useRef, useState } from "react";
import { InputWrapper } from "./ZipCodeInput_Styles";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { colors } from "../../styles";
import { IFormField } from "./types";
import classNames from "classnames";
import { zipCodeRegex } from "./constants";

const ZipCodeInput = () => {
  const [{ value, isValid, isDirty, isFocused }, setFieldState] = useState<
    IFormField
  >({
    value: "",
    isValid: false,
    isDirty: false,
    isFocused: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    setFieldState((prev: IFormField) => ({
      ...prev,
      value
    }));
  };

  const handleValidation = (): void => {
    setFieldState((prev: IFormField) => ({
      ...prev,
      isFocused: false,
      isValid: zipCodeRegex.test(value)
    }));
  };

  const handleFocus = (): void => {
    setFieldState((prev: IFormField) => ({
      ...prev,
      isFocused: true,
      isDirty: true
    }));
  };

  return (
    <InputWrapper>
      <div
        className={classNames("form-field", {
          "form-field--focused": isFocused,
          "form-field--error": !isValid && isDirty && !isFocused
        })}
      >
        <label htmlFor="zipcode" className="input-label">
          Zipcode
        </label>
        <FontAwesomeIcon
          className={classNames("input-icon", {
            "input-icon--valid": isValid
          })}
          icon={faLocationDot}
        />
        <input
          type="number"
          name="zipcode"
          className="input-field"
          onChange={handleChange}
          value={value}
          onBlur={handleValidation}
          onFocus={handleFocus}
        />
      </div>
    </InputWrapper>
  );
};

export default ZipCodeInput;
