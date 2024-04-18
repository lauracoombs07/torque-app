import {useState} from "react"

import EventAvailableIcon from "@mui/icons-material/EventAvailable"
import PeopleAltIcon from "@mui/icons-material/PeopleAlt"
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch"
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Divider,
  List,
  ListItem,
  Stack,
  Typography
} from "@mui/material"
import dayjs from "dayjs"

import TeamDialog from "./components/TeamDialog"
import styles from "./TeamInfoPageStyles"
import {Member} from "../../models/Member"
import {useGetAllMembersQuery} from "../../store/slice/memberSlice"
import {useGetAllRolesQuery} from "../../store/slice/roleSlice"
import {useGetAllTeamsQuery} from "../../store/slice/teamSlice"

const TeamInfoPage = () => {
  const { data: members } = useGetAllMembersQuery()
  const { data: roles } = useGetAllRolesQuery()
  const { data: teams, isLoading } = useGetAllTeamsQuery()
  const [teamModalOpen, setTeamModalOpen] = useState(false)

  // temporary move to state or context somewhere
  const uri = window.location.href
  const teamId = uri.split("?")[0].split("/")[6]
  const foundTeam = teams ? teams!.find((team) => team.pkId === teamId)! : null
  const teamMembers = members?.filter((member: Member) => member.team.teamId === teamId)
  const handleClose = () => {
    // setTeamToEdit(null)
    setTeamModalOpen(prevState => !prevState)
  }
  console.log("uuid ->", teamId)

  if (isLoading) return <Typography>Loading...</Typography>

  return (
    <>
      <Container >
        <Card raised sx={ styles.card }>
          <CardContent>
            <Stack direction="row" justifyContent="center">
              <Typography variant="h4" component="div">{foundTeam?.teamName}</Typography>
            </Stack>
            {/*<Typography variant="caption" fontStyle="italic" component="div">Description:</Typography>*/}
            <Typography variant="body2" fontStyle="italic" component="div" textAlign="center">{foundTeam?.description}</Typography>
            <Divider sx={{ my: 3 }}/>
            <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={3}>
              <RocketLaunchIcon/>
              <Typography variant="h6" component="div">{foundTeam?.uiAppVersion}</Typography>
            </Stack>
            &nbsp;
            <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={3}>
              <EventAvailableIcon/>
              <Typography variant="h6" component="div">{dayjs(foundTeam?.uiReleaseDate).format("MM/DD/YYYY")}</Typography>
            </Stack>
            &nbsp;
            <Stack direction="row" spacing={3} alignItems="center">
              <PeopleAltIcon />
              <Typography variant="h6" component="div">Team Members</Typography>
            </Stack>
            {/*<Divider sx={{ my: 0 }}/>*/}
            <List>
              {teamMembers?.map((member: Member) => (
                <ListItem key={member.id}>
                  <Stack direction="row" justifyContent="space-between" sx={styles.listItem}>
                    <Box component={Typography}>{member.firstName} {member.lastName}</Box>
                    <Box component={Typography}>{roles!.find((role) => role.pkId === member.roleId)?.roleName}</Box>
                  </Stack>
                </ListItem>
              ))}
            </List>
          </CardContent>
          <CardActions>
            <Stack direction="row" justifyContent="flex-end" sx={styles.listItem} p={2}>
              <Button size="small" variant="contained" onClick={() => setTeamModalOpen(prevState => !prevState)}>Edit Team</Button>
            </Stack>
          </CardActions>
        </Card>
      </Container>
      {teamModalOpen && teams && <TeamDialog
        handleClose={handleClose}
        modalIsOpen={teamModalOpen}
        teamIdToEdit={foundTeam!.pkId}
        teams={teams}
      />}
    </>
  )
}

export default TeamInfoPage
