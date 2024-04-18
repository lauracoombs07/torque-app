import { useState } from "react"

import { yupResolver } from "@hookform/resolvers/yup"
import {Alert, AlertColor, Autocomplete, Dialog, DialogTitle, Paper, Snackbar, Stack, TextField} from "@mui/material"
import { sortBy } from "lodash"
import { Controller, FormProvider, useForm } from "react-hook-form"
import { object, ObjectSchema, string } from "yup"

import styles from "./MemberDialogStyles"
import { CondensedTeam, Member } from "../../../models/Member"
import { Role } from "../../../models/Role"
import { useCreateMemberMutation, useUpdateMemberMutation } from "../../../store/slice/memberSlice"
import { useGetAllRolesQuery } from "../../../store/slice/roleSlice"
import DialogButtons from "../../components/DialogButtons"

interface FormValues {
  firstName: any
  lastName: any
  email: string
  role?: any
  team?: any
  id?: any
}

interface Props {
  handleClose: () => void
  members: Member[]
  memberEmailToEdit: string
  modalIsOpen: boolean
  teamOptions: CondensedTeam[] | []
}

const MemberDialog = ({ handleClose, members, memberEmailToEdit, modalIsOpen, teamOptions }: Props) => {
  const { data: roles } = useGetAllRolesQuery()

  const [createMember] = useCreateMemberMutation()
  const [updateMember] = useUpdateMemberMutation()

  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState({ message: "", severity: "" })
  const memberToEdit: Member = members && members.filter((member: Member) => member.email === memberEmailToEdit)[0]

  const title = memberEmailToEdit ? "Edit Member" : "Create New Member"
  const buttonName = memberEmailToEdit ? "Update" : "Save"

  const memberRole = roles && roles?.find((role: any) => role.pkId === memberToEdit?.roleId)
  const defaultValues: FormValues = {
    firstName: memberToEdit?.firstName || "",
    lastName: memberToEdit?.lastName || "",
    email: memberToEdit?.email || "",
    team: memberToEdit?.team || null,
    role: memberRole || null,
    id: memberToEdit?.id || ""
  }

  const formSchema: ObjectSchema<FormValues> = object({
    firstName: string().required(),
    lastName: string().required(),
    email: string().required(),
    team: object({ teamId: string(), teamName: string() }).required(),
    role: object({ pkId: string(), roleName: string(), roleDescription: string() }).nullable(),
    id: string().nullable()
  })

  const methods = useForm({
    defaultValues: defaultValues,
    mode: "all",
    resolver: yupResolver(formSchema)
  })

  const handleChangeTeam = (newValue: any) => {
    // @ts-ignore
    methods.setValue("team", newValue); methods.trigger("team").then()
  }
  const handleChangeRole = (newValue: any) => {
    // @ts-ignore
    methods.setValue("role", newValue); methods.trigger("role").then()
  }

  const handleSave = () => {
    memberEmailToEdit ? methods.handleSubmit(handleUpdate)() : methods.handleSubmit(handleCreate)()
  }

  const handleCreate = (data: any) => {
    const tempMember = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      roleId: data.role.pkId,
      teamId: data.team.teamId
    }

    createMember(tempMember).unwrap()
      .then(() => {
        setMessage({ message: "Successfully created new member", severity: "success" })
        setIsOpen(true)
        methods.reset(defaultValues)
        handleClose()
      })
      .catch(() => {
        setIsOpen(true)
        setMessage({ message: "Error creating member", severity: "error" })
      })
  }

  const handleUpdate = (data: any) => {
    const tempMember = {
      id: data.id,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      roleId: data.role.pkId,
      teamId: data.team.teamId
    }
    updateMember(tempMember).unwrap()
      .then(() => {
        setMessage({ message: "Successfully updated member", severity: "success" })
        setIsOpen(true)
        methods.reset(defaultValues)
        handleClose()
      })
      .catch(() => {
        setIsOpen(true)
        setMessage({ message: "Error updating member", severity: "error" })
      })
  }

  return (
    <Dialog onClose={handleClose} open={modalIsOpen} sx={styles.modal}>
      <Paper sx={styles.content}>
        <DialogTitle>{title}</DialogTitle>
        <FormProvider {...methods}>
          <Stack spacing={4} p={2}>
            <Controller
              name="firstName"
              control={methods.control}
              render={({ field: { onChange, onBlur, value }, fieldState: { error }  }) => (
                <TextField
                  onBlur={onBlur}
                  onChange={onChange}
                  value={value}
                  label="First Name"
                  helperText="required"
                  error={!!error}
                />)}
            />
            <Controller
              name="lastName"
              control={methods.control}
              render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                <TextField
                  error={!!error}
                  helperText="required"
                  label="Last Name"
                  onBlur={onBlur}
                  onChange={onChange}
                  value={value}
                />)}
            />
            <Controller
              name="email"
              control={methods.control}
              render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                <TextField
                  error={!!error}
                  helperText="required"
                  label="Email"
                  onBlur={onBlur}
                  onChange={onChange}
                  value={value}
                />)}
            />
            <Controller
              name="role"
              control={methods.control}
              rules={{ required: true }}
              render={({ field: { onBlur, value }, fieldState: { error } }) => {
                console.log("roles ->", roles)
                return <Autocomplete
                  disablePortal
                  getOptionLabel={(option) => option.roleName}
                  isOptionEqualToValue={(option, value) => option.roleName === value.roleName}
                  id="role"
                  onBlur={onBlur}
                  options={sortBy(roles, "roleName")}
                  onChange={(_event, newValue: Role) => handleChangeRole(newValue)}
                  value={value}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      error={!!error}
                      label="Role"
                    />
                  )}
                />
              }}
            />
            <Controller
              name="team"
              control={methods.control}
              rules={{ required: true }}
              render={({ field: { onBlur, value }, fieldState: { error } }) => (
                <Autocomplete
                  disablePortal
                  getOptionLabel={(option) => option.teamName}
                  isOptionEqualToValue={(option, value) => option.teamName === value.teamName}
                  id="team"
                  onBlur={onBlur}
                  options={sortBy(teamOptions, "teamName")}
                  onChange={(_event, newValue: CondensedTeam) => handleChangeTeam(newValue)}
                  value={value}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      error={!!error}
                      label="Team"
                    />
                  )}
                />
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
        <Alert severity={message.severity as AlertColor} variant="filled">{message.message}</Alert>
      </Snackbar>
    </Dialog>
  )
}

export default MemberDialog
