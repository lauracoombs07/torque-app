import { Dispatch } from "react"

import { InfoOutlined } from "@mui/icons-material"
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import { IconButton, Stack } from "@mui/material"

interface Props {
  handleEdit: Dispatch<string>
  handleDelete: Dispatch<any>
  handleShowInfo: Dispatch<any>
  member: any
  team: any
}
const ActionIcons = ({ handleEdit, handleDelete, handleShowInfo, member, team }: Props) => {
  // console.log("member ->", member)
  const memberContent =  <Stack direction="row" spacing={0}>
    <IconButton onClick={() => handleShowInfo(member.row.email)}>
      <InfoOutlined />
    </IconButton>
    <IconButton onClick={() => handleEdit(member.row.email)}>
      <EditIcon />
    </IconButton>
    <IconButton onClick={() => handleDelete(member.row.email)}>
      <DeleteIcon />
    </IconButton>
  </Stack>
  const teamContent =  <Stack direction="row" spacing={0}>
    <IconButton onClick={() => handleShowInfo(team.row.id)}>
      <InfoOutlined />
    </IconButton>
    <IconButton onClick={() => handleEdit(team.row.id)}>
      <EditIcon />
    </IconButton>
    <IconButton onClick={() => handleDelete(team.row.id)}>
      <DeleteIcon />
    </IconButton>
  </Stack>

  return (
    <>
      {member ? memberContent : teamContent}
    </>
  )
}

export default ActionIcons
