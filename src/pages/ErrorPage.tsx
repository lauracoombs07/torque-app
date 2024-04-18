import {Container, Typography } from "@mui/material"
import { useRouteError } from "react-router-dom"
import styles from "./ErrorPageStyles"

const ErrorPage = () => {
  const error: any = useRouteError()
  return (
    <Container sx={styles.page}>
      <Typography variant="h4">Error Page</Typography>
      <Typography  variant="h6">{error.statusText || error.message}</Typography>
    </Container>
  )
}

export default ErrorPage
