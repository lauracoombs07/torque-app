import { Box } from "@mui/material"
import Container from "@mui/material/Container"
import { Outlet } from "react-router-dom"

import styles from "./AppStyles"
import TorqueAppBar from "./navigation/TorqueAppBar"
import TorqueTabBar from "./navigation/TorqueTabBar"
import { useGetAllRolesQuery } from "./store/slice/roleSlice"

export default function App() {
  const { data: roles, isLoading } = useGetAllRolesQuery()
  console.log("roles ->", roles)
  console.log("isLoading ->", isLoading)
  return (
    <Box sx={styles.page}>
      <TorqueAppBar/>
      <TorqueTabBar/>
      <Container>
        <Outlet/>
      </Container>
    </Box>
  )
}

