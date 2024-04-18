import { Dispatch } from "react"

import { Button, Dialog, Stack, Typography } from "@mui/material"

interface Props {
  deleteOpen: boolean
  deleteTeam: () => void
  handleClose: Dispatch<any>
  isTeamEmpty: boolean
  teamName: string
}

const DeleteTeamDialog = ({ deleteOpen, deleteTeam, handleClose, isTeamEmpty, teamName }: Props) => {
  const dialogContent = isTeamEmpty ? `Are you sure you want to delete ${teamName}?` : "This team is not empty and cannot be deleted"

  return (
    <Dialog open={deleteOpen} onClose={handleClose}>
      <Stack spacing={3} sx={{ padding: "2rem" }}>
        <Typography>{dialogContent}</Typography>
        <Stack direction="row" justifyContent="space-around">
          <Button variant="outlined" onClick={handleClose}>Cancel</Button>
          {isTeamEmpty ? <Button variant="contained" onClick={deleteTeam}>Delete</Button> : null}
        </Stack>
      </Stack>
    </Dialog>
  )
}

export default DeleteTeamDialog
