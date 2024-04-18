import { Button, Stack } from "@mui/material"
import { useFormContext } from "react-hook-form"

interface Props {
  buttonName: string
  onClose: () => void
  onClick: any
}
const DialogButtons = ({ buttonName, onClose, onClick }: Props) => {
  const { formState } = useFormContext()

  return (
    <Stack direction="row" justifyContent="flex-end" spacing={3}>
      <Button onClick={onClose}>Cancel</Button>
      <Button disabled={!formState.isValid} onClick={onClick} variant="contained">{buttonName}</Button>
    </Stack>
  )
}

export default DialogButtons
