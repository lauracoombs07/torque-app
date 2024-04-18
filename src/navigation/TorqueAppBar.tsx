import { AppBar, Box, Toolbar, Typography } from "@mui/material"
import {useNavigate} from "react-router-dom"

const TorqueAppBar = () => {
  const navigate = useNavigate()

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h4" component="div" sx={{ flexGrow: 1 }} onClick={() => navigate("/training-application/team")}>
            Torque
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default TorqueAppBar
