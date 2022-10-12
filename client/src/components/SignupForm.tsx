import React from "react";
import { Button, DialogActions, TextField } from "@mui/material";

import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";

import Auth from "../utils/auth";
import Validate from "../utils/formValidations";

type SignupFormProps = {
  modalStates: {
    authOpen: boolean;
    openAuth: () => void;
    closeAuth: () => void;
  };
};

type SignupState = {
  username: string;
  password: string;
  email: string;
  passwordConfirm: string;
};

type LoginValidation = {
  usernameError: boolean;
  usernameHelper: string;
  emailError: boolean;
  emailHelper: string;
  passwordError: boolean;
  passwordHelper: string;
  preventSubmit: boolean;
};

type Field = "username" | "email" | "password" | "all";

export default function SignupForm({ modalStates }: SignupFormProps) {
  // Form control
  const [formState, setFormState] = React.useState<SignupState>({
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const updateForm = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const field = e.target.id;
    const value = e.target.value;
    setFormState((prev: SignupState) => {
      return { ...prev, [field]: value };
    });

    if (
      formValidate.usernameError ||
      formValidate.emailError ||
      formValidate.passwordError
    ) {
      validateField("all")();
    }
  };

  // Validations & helper messages
  const [formValidate, setFormValidate] = React.useState<LoginValidation>({
    usernameError: false,
    usernameHelper: " ",
    emailError: false,
    emailHelper: " ",
    passwordError: false,
    passwordHelper: " ",
    preventSubmit: true,
  });

  /**
   * @param {Field} field Form field id to validate, or "all" to validate all
   * @returns Validation function
   */
  const validateField = (field: Field) => () => {
    setFormValidate((prev: LoginValidation) => {
      const usernameValidation =
        field === "username" || field === "all"
          ? Validate.username(formState.username)
          : {};
      const emailValidation =
        field === "email" || field === "all"
          ? Validate.email(formState.email)
          : {};
      const passwordValidation =
        field === "password" || field === "all"
          ? Validate.password(formState.password, formState.passwordConfirm)
          : {};
      const newValidation = {
        ...prev,
        ...usernameValidation,
        ...emailValidation,
        ...passwordValidation,
      };
      const preventSubmit =
        formState.username.length === 0 ||
        formState.email.length === 0 ||
        formState.password.length === 0 ||
        formState.passwordConfirm.length === 0 ||
        newValidation.usernameError ||
        newValidation.emailError ||
        newValidation.passwordError;
      return {
        ...newValidation,
        preventSubmit,
      };
    });
  };

  const [signup] = useMutation(ADD_USER);

  // Submit login to server
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { data } = await signup({
        variables: { ...formState, username: formState.username.toLowerCase() },
      });
      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <TextField
        margin="dense"
        id="username"
        label="Username"
        type="text"
        fullWidth
        variant="standard"
        error={formValidate.usernameError}
        helperText={formValidate.usernameHelper}
        value={formState.username}
        onChange={updateForm}
        onBlur={validateField("username")}
      />
      <TextField
        margin="dense"
        id="email"
        label="Email"
        type="email"
        fullWidth
        variant="standard"
        error={formValidate.emailError}
        helperText={formValidate.emailHelper}
        value={formState.email}
        onChange={updateForm}
        onBlur={validateField("email")}
      />
      <TextField
        margin="dense"
        id="password"
        label="Password"
        type="password"
        fullWidth
        variant="standard"
        error={formValidate.passwordError}
        value={formState.password}
        onChange={updateForm}
      />
      <TextField
        margin="dense"
        id="passwordConfirm"
        label="Confirm Password"
        type="password"
        fullWidth
        variant="standard"
        error={formValidate.passwordError}
        helperText={formValidate.passwordHelper}
        value={formState.passwordConfirm}
        onChange={updateForm}
        onBlur={validateField("password")}
      />
      <DialogActions>
        <Button variant="outlined" onClick={modalStates.closeAuth}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSignup}
          disabled={formValidate.preventSubmit}
        >
          Sign Up
        </Button>
      </DialogActions>
    </>
  );
}
