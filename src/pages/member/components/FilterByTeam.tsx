import { ChangeEvent } from "react"

import { Box, Checkbox, FormControl, FormControlLabel, FormGroup, Stack, Typography } from "@mui/material"
import { sortBy } from "lodash"

import { useGetAllTeamsQuery } from "../../../store/slice/teamSlice"

interface Props {
  filter: any
  setFilter: any
}

const FilterByTeam = ({ filter, setFilter }: Props) => {
  const { data: teams } = useGetAllTeamsQuery()

  const handleChange = (_e: ChangeEvent<HTMLInputElement>, teamName: string) => {
    filter.includes(teamName)
      ? setFilter(filter.filter((team: string) => team !== teamName))
      : setFilter([...filter, teamName])
  }

  return (
    <Box>
      <FormControl sx={{ mx: 1 }} component="fieldset" variant="standard">
        {/*<FormLabel component="legend">Team</FormLabel>*/}
        <FormGroup>
          <Stack direction="row" spacing={1} justifyContent="space-between">
            {teams ? sortBy(teams, "teamName").map((team, index) => (
              <FormControlLabel
                key={index}
                control={
                  <Checkbox
                    checked={filter.includes(team.teamName)}
                    name={team.teamName}
                    onChange={(e) => handleChange(e, team.teamName)}
                    size="small"
                  />
                }
                label={<Typography variant="caption">{team.teamName}</Typography>}
              />
            )): null}
          </Stack>
        </FormGroup>
        {/*<FormHelperText>Be careful</FormHelperText>*/}
      </FormControl>
    </Box>
  )
}

export default FilterByTeam
