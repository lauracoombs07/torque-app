import { CssBaseline } from "@mui/material"
import makeStyles from "@mui/styles/makeStyles"

const useStyles = makeStyles(() => ({
  "@global": {
    "body, html": {
      // backgroundColor: "#1f1f1f",
      // color: "#ffffff",
      // fontColor: "#fff",
      fontFamily: "\"Philosopher\", \"Helvetica\", \"Arial\", sans-serif"
    }
  }
}))

const GlobalStyles = () => {
  useStyles()
  return <CssBaseline />
}

export default GlobalStyles
