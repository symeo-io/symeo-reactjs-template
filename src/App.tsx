import { BrowserRouter } from "react-router-dom";
import RoutesWrapper from "./RoutesWrapper";
import { AuthProvider } from "oidc-react";
import { config } from "config";
import { intl } from "intl";
import { RawIntlProvider } from "react-intl";

function App() {
  return (
    <AuthProvider {...config.authentication.google}>
      <RawIntlProvider value={intl}>
        <BrowserRouter>
          <RoutesWrapper />
        </BrowserRouter>
      </RawIntlProvider>
    </AuthProvider>
  );
}

export default App;
