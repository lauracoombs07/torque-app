import { useState } from "react"

import { TabContext, TabList } from "@mui/lab"
import { Button, Tab } from "@mui/material"
import Box from "@mui/material/Box"
import { useNavigate } from "react-router-dom"

const TorqueTabBar = () => {
  const uri = window.location.href
  const viewingTeamInfo = uri.includes("team")
  const [value, setValue] = useState(viewingTeamInfo ? 0 : 1)
  const navigate = useNavigate()
  const displayBackButton = uri.includes("info")
  // const viewingMemberInfo = uri.includes("member")

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
    newValue === 0 ? navigate("team") : navigate("member")
  }
  const handleClick = () => {
    viewingTeamInfo ? navigate("team") : navigate("member")
  }

  return (
    <Box sx={{ width: "100%" }} pb={8}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        {displayBackButton ?
          <Button onClick={() => handleClick()}>Back</Button>
          : <TabContext value={value}>
            <TabList onChange={handleChange}>
              <Tab label="Teams" id="team"/>
              <Tab label="Members" id="member"/>
            </TabList>
          </TabContext>}
      </Box>
    </Box>
  )
}

export default TorqueTabBar
