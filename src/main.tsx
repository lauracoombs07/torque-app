import React from "react"

import { createTheme, StyledEngineProvider } from "@mui/material"
import { ThemeProvider } from "@mui/material/styles"
import ReactDOM from "react-dom/client"
import "./index.css"
import { Provider } from "react-redux"
import { RouterProvider } from "react-router-dom"

import GlobalStyles from "./globalStyles"
import routes from "./react-router/routes"
import store from "./store/store"

// const theme = createTheme()
const darkTheme = createTheme({
  palette: {
    primary: {
      // main: green[800]
      main: "#53966c"
    }
  }
})

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StyledEngineProvider injectFirst>
    <React.StrictMode>
      <GlobalStyles />
      <ThemeProvider theme={darkTheme}>
        <Provider store={store}>
          <RouterProvider router={routes}/>
        </Provider>
      </ThemeProvider>
    </React.StrictMode>
  </StyledEngineProvider>
)
