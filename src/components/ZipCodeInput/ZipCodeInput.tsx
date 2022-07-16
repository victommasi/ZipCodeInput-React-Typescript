import React, { useCallback, useEffect, useRef, useState } from "react";
import { InputWrapper } from "./ZipCodeInput_Styles";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IFormField, ZipCode } from "./types";
import classNames from "classnames";
import { translation, zipCodeRegex } from "./constants";
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
  const suggestionListRef = useRef<any>(null);
  const formFieldRef = useRef<any>(null);
  const isShowSuggestionList = !isArrayEmpty(filteredZipcodes);
  const hasError = !isValid && isDirty && !isFocused;

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      const { value } = e.target;

      setFilteredZipcodes(
        zipcodes?.filter(({ zipcode }) => zipcode.toString().includes(value))
      );

      setFieldState((prev: IFormField) => ({
        ...prev,
        value
      }));
    },
    [zipcodes]
  );

  const closeSuggestionList = useCallback((e: Event): void => {
    const { target } = e;
    if (
      !suggestionListRef.current?.contains(target) &&
      !formFieldRef.current?.contains(target)
    ) {
      setFilteredZipcodes([]);
    }
  }, []);

  useEffect(() => {
    if (isShowSuggestionList) {
      document.addEventListener("click", closeSuggestionList);
    }

    return () => document.removeEventListener("click", closeSuggestionList);
  }, [closeSuggestionList, isShowSuggestionList]);

  const handleBlur = useCallback((): void => {
    setFieldState((prev: IFormField) => ({
      ...prev,
      isFocused: false,
      isValid: zipCodeRegex.test(value)
    }));
  }, [value]);

  const handleFocus = useCallback(async (): Promise<void> => {
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
  }, [zipcodes]);

  const handleSelectZipcode = useCallback((zipcode: number): void => {
    setFilteredZipcodes([]);
    setFieldState((prev: IFormField) => ({
      ...prev,
      isFocused: false,
      isValid: zipCodeRegex.test(zipcode.toString()),
      value: zipcode.toString()
    }));
  }, []);

  return (
    <InputWrapper>
      <div
        ref={formFieldRef}
        className={classNames("form-field", {
          "form-field--focused": isFocused,
          "form-field--error": hasError
        })}
      >
        <label htmlFor="zipcode" className="input-label">
          {translation.ZIPCODE}
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
          placeholder={translation.ENTER_NUMBER}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
        />
        <SuggestionList
          ref={suggestionListRef}
          zipcodes={filteredZipcodes}
          onSelect={handleSelectZipcode}
        />
        {hasError && (
          <span className="form-field-error-msg">
            {translation.INVALID_FORMAT}
          </span>
        )}
      </div>
    </InputWrapper>
  );
};

export default ZipCodeInput;
