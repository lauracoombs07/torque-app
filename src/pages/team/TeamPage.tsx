import { useState } from "react"

import { Box, Button, Stack, Typography } from "@mui/material"
import { DataGrid } from "@mui/x-data-grid"
import dayjs from "dayjs"
import { useNavigate } from "react-router-dom"

import DeleteTeamDialog from "./components/DeleteTeamDialog"
import TeamDialog from "./components/TeamDialog"
import { useGetAllMembersQuery } from "../../store/slice/memberSlice"
import { useDeleteTeamMutation, useGetAllTeamsQuery } from "../../store/slice/teamSlice"
import ActionIcons from "../components/ActionIcons"

const TeamPage = () => {
  const { data: members } = useGetAllMembersQuery()
  const { data: teams, isLoading: isLoadingTeams } = useGetAllTeamsQuery()
  const navigate = useNavigate()

  const [deleteOpen, setDeleteOpen] = useState(false)
  const [deleteTeam] = useDeleteTeamMutation()
  const [teamToEdit, setTeamToEdit]: any = useState(null)
  const [teamModalOpen, setTeamModalOpen] = useState(false)

  const isTeamEmpty = members?.filter((member) => member.team.teamId === teamToEdit).length === 0
  console.log("isTeamEmpty ->", isTeamEmpty)
  const handleClose = () => {
    setTeamToEdit(null)
    setTeamModalOpen(prevState => !prevState)
  }

  const handleEdit = (id: string) => {
    setTeamToEdit(id)
    setTeamModalOpen(prevState => !prevState)
  }

  const handleDelete = (id: string) => {
    setTeamToEdit(id)
    // is team empty ?
    setDeleteOpen(prevState => !prevState)
  }

  const handleShowInfo = (id: string) => {
    navigate(`info/${id}`)
  }

  const deleteTeamById = () => {
    const teamId =  teams!.find((team) => team.pkId === teamToEdit)!.pkId!
    deleteTeam(teamId).unwrap()
      .then(() => {
        setDeleteOpen(prevState => !prevState)
      })
  }

  const columns = [
    { field: "teamName", headerName: "Team Name", width: 200 },
    { field: "description", headerName: "Description", width: 400 },
    { field: "uiAppVersion", headerName: "App Version", width: 150 },
    { field: "uiReleaseDate", headerName: "Release Date", width: 200 },
    { field: "actions", headerName: "Actions", width: 200, renderCell: (team: any) => <ActionIcons member="" team={team} handleEdit={handleEdit} handleDelete={handleDelete} handleShowInfo={handleShowInfo} /> }
  ]

  const rows = teams ? teams?.map((team) => {
    return {
      id: team.pkId,
      teamName: team.teamName,
      description: team.description ?? "",
      uiAppVersion: team.uiAppVersion ?? "",
      uiReleaseDate: dayjs(team.uiReleaseDate).format("MM/DD/YYYY") ?? ""
    }
  }) : []

  if (isLoadingTeams) return <Typography>Loading...</Typography>

  return (
    <Stack spacing={4}>
      <Stack direction="row" justifyContent="center">
        <Typography variant="h4">Teams</Typography>
      </Stack>
      <Button
        color="primary"
        variant="contained"
        onClick={() => setTeamModalOpen(prevState => !prevState)}>
        Add Team
      </Button>
      <Box sx={{ maxHeight: 500, width: "100%" }}>
        <DataGrid
          initialState={{
            sorting: { sortModel: [{ field: "teamName", sort: "asc" }] }
          }}
          rows={rows}
          columns={columns}
          disableRowSelectionOnClick
        />
      </Box>
      {teamModalOpen && teams && <TeamDialog
        handleClose={handleClose}
        modalIsOpen={teamModalOpen}
        teamIdToEdit={teamToEdit}
        teams={teams}
      />}
      {deleteOpen && <DeleteTeamDialog
        deleteOpen={deleteOpen}
        deleteTeam={deleteTeamById}
        handleClose={() => setDeleteOpen(prevState => !prevState)}
        isTeamEmpty={isTeamEmpty}
        teamName={teams!.find((team) => team.pkId === teamToEdit)!.teamName}
      />}
    </Stack>
  )
}

export default TeamPage
