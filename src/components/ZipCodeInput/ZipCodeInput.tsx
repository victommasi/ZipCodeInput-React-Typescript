import React, { useState } from "react";
import { InputWrapper } from "./ZipCodeInput_Styles";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IFormField, ZipCode } from "./types";
import classNames from "classnames";
import { zipCodeRegex } from "./constants";
import { isArrayEmpty } from "./utils";
import { fetchZipCodes } from "./services/zipcodeService";
import SuggestionList from "./components/SuggestionList";

const ZipCodeInput = () => {
  const [{ value, isValid, isDirty, isFocused }, setFieldState] = useState<
    IFormField
  >({
    value: "",
    isValid: false,
    isDirty: false,
    isFocused: false
  });

  const [zipcodes, setZipcodes] = useState<ZipCode[]>([]);
  const [filteredZipcodes, setFilteredZipcodes] = useState<ZipCode[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;

    setFilteredZipcodes(
      zipcodes?.filter(({ zipcode }) => zipcode.toString().includes(value))
    );

    setFieldState((prev: IFormField) => ({
      ...prev,
      value
    }));
  };

  const handleBlur = (e: any): void => {
    setFilteredZipcodes([]);
    setFieldState((prev: IFormField) => ({
      ...prev,
      isFocused: false,
      isValid: zipCodeRegex.test(value)
    }));
  };

  const handleFocus = async (): Promise<void> => {
    if (isArrayEmpty(zipcodes)) {
      try {
        const response = await fetchZipCodes();
        setZipcodes(response.data);
      } catch (e) {
        console.error(e);
      }
    }

    setFieldState((prev: IFormField) => ({
      ...prev,
      isFocused: true,
      isDirty: true
    }));
  };

  const handleSelectZipcode = (zipcode: number): void => {
    console.log(zipcode);
    setFieldState((prev: IFormField) => ({
      ...prev,
      value: zipcode.toString()
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
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
        />
        <SuggestionList
          zipcodes={filteredZipcodes}
          onSelect={handleSelectZipcode}
        />
      </div>
    </InputWrapper>
  );
};

export default ZipCodeInput;
