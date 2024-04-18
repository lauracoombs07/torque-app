import { useState } from "react"

import ComputerIcon from "@mui/icons-material/Computer"
import Diversity3Icon from "@mui/icons-material/Diversity3"
import { Button, Card, CardActions, CardContent, Container, Divider, Stack, Typography } from "@mui/material"

import MemberDialog from "./components/MemberDialog"
import styles from "./MemberInfoPageStyles"
import { useGetAllMembersQuery } from "../../store/slice/memberSlice"
import { useGetAllRolesQuery } from "../../store/slice/roleSlice"
import { useGetAllTeamsCondensedQuery } from "../../store/slice/teamSlice"

const MemberInfoPage = () => {
  // temporary move to state or context somewhere
  const { data: condensedTeams } = useGetAllTeamsCondensedQuery()
  const { data: members, isLoading } = useGetAllMembersQuery()
  const { data: roles } = useGetAllRolesQuery()

  const [memberModalOpen, setMemberModalOpen] = useState(false)
  // const [memberToEdit, setMemberToEdit]: any = useState(null)

  const handleClose = () => {
    // setMemberToEdit(null)
    setMemberModalOpen(prevState => !prevState)
  }

  const uri = window.location.href
  const memberId = uri.split("?")[0].split("/")[6]
  const foundMember = members ? members!.find((member) => member.id === memberId)! : null
  const displayRole = roles!.find((role) => role.pkId === foundMember?.roleId)?.roleName ?? "none"

  if (isLoading) return <Typography>Loading...</Typography>

  return (
    <>
      <Container >
        <Card raised sx={ styles.card }>
          <CardContent>
            <Stack direction="row" justifyContent="center">
              <Typography variant="h4" component="div">{foundMember?.firstName} {foundMember?.lastName}</Typography>
            </Stack>
            <Typography variant="body1" fontStyle="italic" textAlign="center" component="div">{foundMember?.email}</Typography>
            <Divider sx={{ my: 3 }}/>
            <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={3}>
              <Diversity3Icon/>
              <Typography variant="h6" component="div">{foundMember?.team.teamName}</Typography>
            </Stack>
            <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={3}>
              <ComputerIcon/>
              <Typography variant="h6" component="div">{displayRole}</Typography>
            </Stack>
          &nbsp;
          </CardContent>
          <CardActions>
            <Stack direction="row" justifyContent="flex-end" sx={styles.buttonStack} p={2}>
              <Button size="small" variant="contained" onClick={() => setMemberModalOpen(prevState => !prevState)}>Edit</Button>
            </Stack>
          </CardActions>
        </Card>
      </Container>
      {memberModalOpen && members && <MemberDialog
        handleClose={() => handleClose()}
        memberEmailToEdit={foundMember!.email}
        members={members ?? []}
        modalIsOpen={memberModalOpen}
        teamOptions={condensedTeams ?? []}
      />}
    </>
  )
}

export default MemberInfoPage
