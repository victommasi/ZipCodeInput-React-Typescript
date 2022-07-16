import ZipCodeInput from "./components/ZipCodeInput";
import { translation } from "./components/ZipCodeInput/constants";

export default function App() {
  return (
    <ZipCodeInput
      value={""}
      onChange={() => {}}
      label={translation.ZIPCODE}
      errorMsg={translation.INVALID_FORMAT}
    />
  );
}
