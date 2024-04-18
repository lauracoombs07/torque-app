import { useState } from "react"

import { Box, Button, Stack, Typography } from "@mui/material"
import { DataGrid } from "@mui/x-data-grid"
import { isEmpty } from "lodash"
import { useNavigate } from "react-router-dom"

import DeleteMemberDialog from "./components/DeleteMemberDialog"
import FilterByTeam from "./components/FilterByTeam"
import MemberDialog from "./components/MemberDialog"
import styles from "./MemberPageStyles"
import { useDeleteMemberMutation, useGetAllMembersQuery } from "../../store/slice/memberSlice"
import { useGetAllRolesQuery } from "../../store/slice/roleSlice"
import { useGetAllTeamsCondensedQuery } from "../../store/slice/teamSlice"
import ActionIcons from "../components/ActionIcons"

const MemberPage = () => {

  const { data: members } = useGetAllMembersQuery()
  const { data: condensedTeams } = useGetAllTeamsCondensedQuery()
  const { data: roles } = useGetAllRolesQuery()
  const navigate = useNavigate()

  const [deleteMember] = useDeleteMemberMutation()

  const [deleteOpen, setDeleteOpen] = useState(false)
  const [filter, setFilter]: any = useState([])
  const [memberModalOpen, setMemberModalOpen] = useState(false)
  const [memberToEdit, setMemberToEdit]: any = useState(null)
  const fullMember = members && members!.find((member) => member.email === memberToEdit)!
  const handleClose = () => {
    setMemberToEdit(null)
    setMemberModalOpen(prevState => !prevState)
  }

  const handleDelete = (email: string | null) => {
    setMemberToEdit(email)
    setDeleteOpen(prevState => !prevState)
  }

  const handleEdit = (email: string) => {
    setMemberToEdit(email)
    setMemberModalOpen(prevState => !prevState)
  }

  const handleShowInfo = (email: string) => {
    console.log("email ->", email)
    const id = members!.find((member) => member.email === email)!.id
    // navigate to team info page
    navigate(`info/${id}`)
  }

  const deleteUser = () => {
    const memberId =  members!.find((member) => member.email === memberToEdit)!.id!
    deleteMember(memberId).unwrap()
      .then(() => {
        setDeleteOpen(prevState => !prevState)
      })
  }

  const columns = [
    { field: "lastName", headerName: "Last Name", width: 200 },
    { field: "firstName", headerName: "First Name", width: 200 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "team", headerName: "Team", width: 200 },
    { field: "role", headerName: "Role", width: 200 },
    { field: "actions", headerName: "Actions", width: 200, renderCell: (member: any) => <ActionIcons member={member} team="" handleEdit={handleEdit} handleDelete={handleDelete} handleShowInfo={handleShowInfo}/> }
  ]

  const rows = members ? members?.map((member) => {
    const displayRole = roles!.find((role) => role.pkId === member.roleId)?.roleName
    return {
      lastName: member.lastName,
      firstName: member.firstName,
      email: member.email,
      team: member.team.teamName,
      role: displayRole ?? ""
    }
  }) : []

  const handleClick = (teams: any) => {
    console.log("teams ->", teams)
    // @ts-ignore
    setFilter([...teams])
  }

  return (
    <Stack spacing={4} >
      <Stack direction="row" justifyContent="center">
        <Typography variant="h4">Members</Typography>
      </Stack>
      <Button
        color="primary"
        disabled={isEmpty(condensedTeams)}
        onClick={() => setMemberModalOpen(prevState => !prevState)}
        variant="contained"
      >
        Add Member
      </Button>
      {!isEmpty(members) && <FilterByTeam filter={filter} setFilter={handleClick} />}
      <Box sx={ styles.dataGridContainer }>
        <DataGrid
          initialState={{
            sorting: { sortModel: [{ field: "lastName", sort: "asc" }] }
          }}
          rows={rows.filter((row) => filter.length === 0 || filter.includes(row.team))}
          columns={columns}
          getRowId={(row) => row.email}
          disableRowSelectionOnClick
        />
      </Box>
      {memberModalOpen && members && <MemberDialog
        handleClose={() => handleClose()}
        memberEmailToEdit={memberToEdit ?? ""}
        members={members ?? []}
        modalIsOpen={memberModalOpen}
        teamOptions={condensedTeams ?? []}
      />}
      {deleteOpen && <DeleteMemberDialog
        deleteOpen={deleteOpen}
        deleteUser={deleteUser}
        handleClose={() => setDeleteOpen(prevState => !prevState)}
        memberName={`${fullMember?.firstName} ${fullMember?.lastName}`}
      />}
    </Stack>
  )
}

export default MemberPage
