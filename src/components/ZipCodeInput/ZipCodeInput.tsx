import React, { useCallback, useEffect, useRef, useState } from "react";
import { InputWrapper } from "./ZipCodeInput_Styles";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IFormField, ZipCode, ZipCodeInputProps } from "./types";
import classNames from "classnames";
import { translation, zipCodeRegex } from "./constants";
import { isArrayEmpty } from "./utils";
import { fetchZipCodes } from "./services/zipcodeService";
import SuggestionList from "./components/SuggestionList";

const ZipCodeInput = ({
  value: customValue,
  onChange,
  label,
  errorMsg
}: ZipCodeInputProps) => {
  const [{ value, isValid, isDirty, isFocused }, setFieldState] = useState<
    IFormField
  >({
    value: customValue,
    isValid: false,
    isDirty: false,
    isFocused: false
  });

  const [zipcodes, setZipcodes] = useState<ZipCode[]>([]);
  const [filteredZipcodes, setFilteredZipcodes] = useState<ZipCode[]>([]);
  const suggestionListRef = useRef<HTMLUListElement>(null);
  const formFieldRef = useRef<HTMLDivElement>(null);
  const isShowSuggestionList = !isArrayEmpty(filteredZipcodes);
  const hasError = !isValid && isDirty && !isFocused && value !== "";

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

  useEffect(() => onChange(value), [value, onChange]);

  const closeSuggestionList = useCallback((e: MouseEvent): void => {
    const target = e.target as HTMLElement;
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
    const zipCodeText = zipcode.toString();

    setFieldState((prev: IFormField) => ({
      ...prev,
      isFocused: false,
      isValid: zipCodeRegex.test(zipCodeText),
      value: zipCodeText
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
          {label}
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
        {hasError && <span className="form-field-error-msg">{errorMsg}</span>}
      </div>
    </InputWrapper>
  );
};

export default ZipCodeInput;
