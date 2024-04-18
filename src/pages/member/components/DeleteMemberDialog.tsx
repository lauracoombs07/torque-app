import { Dispatch } from "react"

import { Button, Dialog, Stack, Typography } from "@mui/material"

interface Props {
  deleteOpen: boolean
  deleteUser: () => void
  handleClose: Dispatch<any>
  memberName: string
}
const DeleteTeamDialog = ({ deleteOpen, deleteUser, handleClose, memberName }: Props) => {
  return (
    <Dialog open={deleteOpen} onClose={handleClose} >
      <Stack spacing={3} sx={{ padding: "2rem" }}>
        <Typography>{`Are you sure you want to delete ${memberName}?`}</Typography>
        <Stack direction="row" justifyContent="space-around">
          <Button onClick={handleClose} variant="outlined">Cancel</Button>
          <Button onClick={deleteUser} variant="contained">Delete</Button>
        </Stack>
      </Stack>
    </Dialog>
  )
}

export default DeleteTeamDialog
