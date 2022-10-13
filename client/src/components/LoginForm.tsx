import React from "react";
import { Button, DialogActions, TextField } from "@mui/material";

import { useMutation } from "@apollo/client";
import { LOGIN } from "../utils/mutations";

import Auth from "../utils/auth";
import Validate from "../utils/formValidations";

type LoginFormProps = {
  modalStates: {
    authOpen: boolean;
    openAuth: () => void;
    closeAuth: () => void;
  };
};

type LoginState = {
  username: string;
  password: string;
};

type LoginValidation = {
  usernameError: boolean;
  usernameHelper: string;
  passwordError: boolean;
  passwordHelper: string;
  preventSubmit: boolean;
};

export default function LoginForm({ modalStates }: LoginFormProps) {
  // Form control
  const [formState, setFormState] = React.useState<LoginState>({
    username: "",
    password: "",
  });
  const updateForm = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const field = e.target.id;
    const value = e.target.value;
    setFormState((prev: LoginState) => {
      return { ...prev, [field]: value };
    });
  };

  // Validation & helper messages
  const [formValidate, setFormValidate] = React.useState<LoginValidation>({
    usernameError: false,
    usernameHelper: " ",
    passwordError: false,
    passwordHelper: " ",
    preventSubmit: true,
  });

  React.useEffect(() => {
    if (formState.username.length > 0 && formState.password.length > 0) {
      const validated = Validate.username(formState.username);
      setFormValidate((prev: LoginValidation) => {
        return {
          ...prev,
          ...validated,
          preventSubmit: validated.usernameError,
        };
      });
    }
  }, [formState]);

  // Submit login to server
  const [login] = useMutation(LOGIN);
  const handleLogin = async (e: React.FormEvent) => {
    // Prevent default form behavior
    e.preventDefault();
    // Prevent multiple submits
    setFormValidate((prev: LoginValidation) => {
      return { ...prev, preventSubmit: true };
    });

    try {
      const { data } = await login({
        variables: { ...formState, username: formState.username.toLowerCase() },
      });
      Auth.login(data.login.token);
      modalStates.closeAuth();
    } catch (e: any) {
      console.error(e);
      setFormValidate((prev: LoginValidation) => {
        return {
          ...prev,
          usernameError: true,
          passwordError: true,
          passwordHelper: e.message,
        };
      });
    }
  };

  // Submit form with Enter key
  const submitOnEnter = (e: React.KeyboardEvent) =>
    e.key === "Enter" && handleLogin(e);

  return (
    <>
      <TextField
        autoFocus
        margin="dense"
        id="username"
        label="Username"
        type="text"
        autoComplete="username"
        fullWidth
        variant="standard"
        error={formValidate.usernameError}
        helperText={formValidate.usernameHelper}
        value={formState.username}
        onChange={updateForm}
      />
      <TextField
        margin="dense"
        id="password"
        label="Password"
        type="password"
        autoComplete="current-password"
        fullWidth
        variant="standard"
        error={formValidate.passwordError}
        helperText={formValidate.passwordHelper}
        value={formState.password}
        onChange={updateForm}
        onKeyDown={submitOnEnter}
      />
      <DialogActions>
        <Button variant="outlined" onClick={modalStates.closeAuth}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleLogin}
          disabled={formValidate.preventSubmit}
        >
          Login
        </Button>
      </DialogActions>
    </>
  );
}
