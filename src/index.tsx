import { StrictMode } from "react";
import * as ReactDOMClient from "react-dom/client";
import GlobalStyles from "./styles/global";

import App from "./App";

const rootElement = document.getElementById("root");
const root = ReactDOMClient.createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
    <GlobalStyles />
  </StrictMode>
);
