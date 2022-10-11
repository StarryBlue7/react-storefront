import React from "react";
import { Button, DialogActions, TextField } from "@mui/material";

export default function LoginForm({ modalStates }: any) {
  const [formState, setFormState] = React.useState<any>({
    username: "",
    password: "",
  });
  return (
    <>
      <TextField
        autoFocus
        margin="dense"
        id="name"
        label="Username"
        type="text"
        fullWidth
        variant="standard"
      />
      <TextField
        autoFocus
        margin="dense"
        id="password"
        label="Password"
        type="password"
        fullWidth
        variant="standard"
      />
      <DialogActions>
        <Button variant="outlined" onClick={modalStates.closeAuth}>
          Cancel
        </Button>
        <Button variant="contained">Login</Button>
      </DialogActions>
    </>
  );
}
