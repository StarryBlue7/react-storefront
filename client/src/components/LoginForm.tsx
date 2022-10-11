import React from "react";
import { Button, DialogActions, TextField } from "@mui/material";

export default function LoginForm({ modalStates }: any) {
  const [formState, setFormState] = React.useState<any>({
    username: "",
    password: "",
  });
  const updateForm = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const field = event.target.id;
    const value = event.target.value;
    setFormState({ ...formState, [field]: value });
  };

  const handleLogin = (): void => {};

  return (
    <>
      <TextField
        autoFocus
        margin="dense"
        id="username"
        label="Username"
        type="text"
        fullWidth
        variant="standard"
        value={formState.username}
        onChange={updateForm}
      />
      <TextField
        autoFocus
        margin="dense"
        id="password"
        label="Password"
        type="password"
        fullWidth
        variant="standard"
        value={formState.password}
        onChange={updateForm}
      />
      <DialogActions>
        <Button variant="outlined" onClick={modalStates.closeAuth}>
          Cancel
        </Button>
        <Button variant="contained" onClick={handleLogin}>
          Login
        </Button>
      </DialogActions>
    </>
  );
}
