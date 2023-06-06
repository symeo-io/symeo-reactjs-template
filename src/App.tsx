import { BrowserRouter } from "react-router-dom";
import RoutesWrapper from "./RoutesWrapper";
import { AuthProvider } from "oidc-react";
import { config } from "config";
import { intl } from "intl";
import { RawIntlProvider } from "react-intl";
import { LocalStorageContextProvider } from "providers/localStorage/LocalStorageContextProvider";
import { store } from "store";
import { Provider, ReactReduxContext } from "react-redux";
import { theme } from "theme/theme";
import { ThemeProvider } from "@mui/material";

function App() {
  return (
    <AuthProvider {...config.authentication.google}>
      <Provider store={store} context={ReactReduxContext}>
        <RawIntlProvider value={intl}>
          <ThemeProvider theme={theme}>
            <BrowserRouter>
              <LocalStorageContextProvider>
                <RoutesWrapper />
              </LocalStorageContextProvider>
            </BrowserRouter>
          </ThemeProvider>
        </RawIntlProvider>
      </Provider>
    </AuthProvider>
  );
}

export default App;
