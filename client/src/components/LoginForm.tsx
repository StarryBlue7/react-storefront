import React from "react";
import { Button, DialogActions, TextField } from "@mui/material";

import { useMutation } from "@apollo/client";
import { LOGIN } from "../utils/mutations";

import Auth from "../utils/auth";

export default function LoginForm({ modalStates }: any) {
  const [formState, setFormState] = React.useState<any>({
    username: "",
    password: "",
  });
  const updateForm = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const field = e.target.id;
    const value = e.target.value;
    setFormState({ ...formState, [field]: value });
  };

  const [login] = useMutation(LOGIN);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { data } = await login({
        variables: { ...formState, username: formState.username.toLowerCase() },
      });
      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }
  };

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
