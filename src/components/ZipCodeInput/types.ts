export interface IFormField {
  value: string;
  isValid: boolean;
  isDirty: boolean;
  isFocused: boolean;
}

export type ZipCode = {
  zipcode: number;
  city: string;
  state: string;
};

export type SuggestionListProps = {
  zipcodes: ZipCode[];
  onSelect: (zipcode: number) => void;
};

export type ZipCodeInputProps = {
  value: string;
  onChange: (value: string) => void;
  label: string;
  errorMsg: string;
};
