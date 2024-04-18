import { yupResolver } from "@hookform/resolvers/yup"
import {Alert, Dialog, DialogTitle, Paper, Snackbar, Stack, TextField} from "@mui/material"
import dayjs from "dayjs"
import { Controller, FormProvider, SubmitHandler, useForm } from "react-hook-form"
import { object, ObjectSchema, string } from "yup"

import styles from "./TeamDialogStyles"
import { Team } from "../../../models/Team"
import { useCreateTeamMutation, useUpdateTeamMutation } from "../../../store/slice/teamSlice"
import DialogButtons from "../../components/DialogButtons"
import {useState} from "react";

interface FormValues {
  teamName: any
  description: any
  uiAppVersion: string
  uiReleaseDate?: any
  id?: any
}

interface Props {
  handleClose: () => void
  modalIsOpen: boolean
  teamIdToEdit: string
  teams: Team[]
}

const TeamDialog = ({ handleClose, teamIdToEdit, modalIsOpen, teams }: Props) => {
  const [createTeam] = useCreateTeamMutation()
  const [updateTeam] = useUpdateTeamMutation()

  const [isOpen, setIsOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const buttonName = teamIdToEdit ? "Update" : "Save"
  const teamToEdit: Team = teams && teams.filter((team: Team) => team.pkId === teamIdToEdit)[0]
  const title = teamIdToEdit ? "Edit Team" : "Create New Team"

  const defaultValues: FormValues = {
    teamName: teamToEdit?.teamName ?? "",
    description: teamToEdit?.description ?? "",
    uiAppVersion: teamToEdit?.uiAppVersion ?? "",
    uiReleaseDate: dayjs(teamToEdit?.uiReleaseDate).format("MM/DD/YYYY") || null,
    id: teamIdToEdit
  }

  const formSchema: ObjectSchema<FormValues>  = object({
    teamName: string().required().min(3, "Team Name must be at least 3 characters").max(50),
    description: string().required().min(3, "Description must be at least 3 characters").max(80),
    uiAppVersion: string().required().matches(/^\d+(\.\d+)*$/, "Version must be in the format (x.x.x)"),
    uiReleaseDate: string().nullable(),
    id: string().nullable()
  })

  const methods = useForm({
    defaultValues: defaultValues,
    mode: "all",
    resolver: yupResolver(formSchema)
  })

  const handleSave = () => {
    // @ts-ignore
    teamIdToEdit ? methods.handleSubmit(handleUpdateTeam)() : methods.handleSubmit(handleCreateTeam)()
  }

  const handleCreateTeam: SubmitHandler<FormValues> = (data: any) => {

    const tempTeam = {
      teamName: data.teamName,
      description: data.description,
      uiAppVersion: data.uiAppVersion,
      uiReleaseDate: dayjs(data.uiReleaseDate).format("YYYY-MM-DD")
    }

    createTeam(tempTeam).unwrap()
      .then(() => {
        handleClose()
        methods.reset(defaultValues)
      })
      .catch(() => {
        setIsOpen(true)
        setErrorMessage("Error creating Team")
      })
  }

  const handleUpdateTeam: SubmitHandler<FormValues> = (data: any) => {

    const tempTeam = {
      pkId: data.id,
      teamName: data.teamName,
      description: data.description,
      uiAppVersion: data.uiAppVersion,
      uiReleaseDate: dayjs(data.uiReleaseDate).format("YYYY-MM-DD")
    }
    updateTeam(tempTeam).unwrap()
      .then(() => {
        handleClose()
        methods.reset(defaultValues)
      })
      .catch(() => {
        setIsOpen(true)
        setErrorMessage("Error updating Team")
      })
  }

  return (
    <Dialog onClose={handleClose} open={modalIsOpen} sx={styles.modal}>
      <Paper sx={styles.content}>
        <DialogTitle>{title}</DialogTitle>
        <FormProvider {...methods}>
          <Stack spacing={4} p={2}>
            <Controller
              name="teamName"
              control={methods.control}
              render={({ field: { onChange, onBlur, value }, fieldState: { error }  }) => {
                return <TextField
                  error={!!error}
                  helperText={error ? error?.message : ""}
                  label="Team Name"
                  onBlur={onBlur}
                  onChange={onChange}
                  value={value}
                /> }}
            />
            <Controller
              name="description"
              control={methods.control}
              render={({ field: { onChange, onBlur, value }, fieldState: { error }  }) => (
                <TextField
                  error={!!error}
                  helperText="required"
                  label="Description"
                  onBlur={onBlur}
                  onChange={onChange}
                  value={value}
                />)}
            />
            <Controller
              name="uiAppVersion"
              control={methods.control}
              render={({ field: { onChange, onBlur, value }, fieldState: { error }  }) => (
                <TextField
                  error={!!error}
                  helperText={error ? error?.message : ""}
                  label="App Version"
                  onBlur={onBlur}
                  onChange={onChange}
                  value={value}
                  autoComplete={"off"}
                />)}
            />
            <Controller
              name="uiReleaseDate"
              control={methods.control}
              render={({ field: { onBlur, onChange, value }, fieldState: { error }  }) => (
                <TextField
                  error={!!error}
                  helperText={error ? error?.message : ""}
                  label="Release Date"
                  onBlur={onBlur}
                  onChange={onChange}
                  value={value}
                // inputProps={{ type: "date", format: "dd/MM/yyyy" }}
                />
              // <LocalizationProvider dateAdapter={AdapterDayjs}>
              //   <DatePicker
              //     label="Release Date"
              //     value={value}
              //     onChange={onChange}
              //   />
              // </LocalizationProvider>
              )}
            />
            <DialogButtons
              buttonName={buttonName}
              onClose={handleClose}
              onClick={() => handleSave()}
            />
          </Stack>
        </FormProvider>
      </Paper>
      <Snackbar
        open={isOpen}
        autoHideDuration={3000}
        onClose={() => setIsOpen(prevState => !prevState)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="error" variant="filled">{errorMessage}</Alert>
      </Snackbar>
    </Dialog>
  )
}

export default TeamDialog
