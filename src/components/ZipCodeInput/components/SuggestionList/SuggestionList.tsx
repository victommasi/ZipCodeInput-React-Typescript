import React from "react";
import { ListWrapper } from "./SuggestionList_Styles";
import { SuggestionListProps, ZipCode } from "../../types";

const SuggestionList = ({ zipcodes, onSelect }: SuggestionListProps) => {
  return (
    <ListWrapper>
      {zipcodes.map(({ zipcode, city, state }: ZipCode) => (
        <li key={zipcode}>
          <button
            type="button"
            className="zipcode-button"
            onClick={() => onSelect(zipcode)}
          >
            <p className="zipcode-number">{zipcode}</p>
            <p className="zipcode-info">
              {city}, {state}
            </p>
          </button>
        </li>
      ))}
    </ListWrapper>
  );
};

export default SuggestionList;
