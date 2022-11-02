import React from "react";
import {
  Button,
  DialogActions,
  TextField,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";

import { useMutation } from "@apollo/client";
import { ADD_USER } from "../../utils/mutations";

import Auth from "../../utils/auth";
import Validate from "../../utils/formValidations";
import TagList from "../TagList";
import ButtonLoader from "../feedback/ButtonLoader";

type SignupFormProps = {
  modalStates?: {
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

type SignupValidation = {
  usernameError: boolean;
  usernameHelper: string;
  emailError: boolean;
  emailHelper: string;
  passwordError: boolean;
  passwordHelper: string;
  preventSubmit: boolean;
};

type SelectedTags = Set<string>;

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
      field === "passwordConfirm" &&
      value.length === formState.password.length
    ) {
      validateField("all")();
    }
  };

  // Validations & helper messages
  const [formValidate, setFormValidate] = React.useState<SignupValidation>({
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
    setFormValidate((prev: SignupValidation) => {
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

  // Revalidate errored fields on form update
  React.useEffect(() => {
    if (
      formValidate.usernameError ||
      formValidate.emailError ||
      formValidate.passwordError
    ) {
      validateField("all")();
    }
    // Prevent eslint warning enforcing cyclical useEffect setting
  }, [formState]); // eslint-disable-line

  // Signup steps
  const steps = ["Account Info", "Personalize"];
  const [activeStep, setActiveStep] = React.useState<number>(0);
  const nextStep = () => {
    setActiveStep(activeStep + 1);
  };

  // Tag selection for user likes
  const [selectedTags, setSelectedTags] = React.useState<SelectedTags>(
    new Set()
  );
  const tagStates = {
    selectedTags,
    toggleTag: (tag: string) => () => {
      let newTags = new Set(selectedTags);
      if (selectedTags.has(tag)) {
        newTags.delete(tag);
        setSelectedTags(newTags);
      } else {
        newTags.add(tag);
        setSelectedTags(newTags);
      }
    },
  };

  // Submit login to server
  const [signup, { loading }] = useMutation(ADD_USER);
  const handleSignup = async (e: React.FormEvent) => {
    // Prevent default form behavior
    e.preventDefault();
    console.log("submitted");

    // Prevent invalid submits
    if (formValidate.preventSubmit || activeStep < steps.length - 1) {
      console.log("submit invalid");
      return;
    }

    // Prevent multiple submits
    setFormValidate((prev: SignupValidation) => {
      return { ...prev, preventSubmit: true };
    });

    try {
      const { data } = await signup({
        variables: {
          ...formState,
          username: formState.username.toLowerCase(),
          likes: Array.from(selectedTags),
        },
      });
      Auth.login(data.addUser.token);
      // Close modal if given in props
      modalStates && modalStates.closeAuth();
    } catch (e) {
      console.error(e);
      // TODO: Add feedback for signup error
    }
  };

  // Advance form with Enter key
  const nextOnEnter = (e: React.KeyboardEvent) =>
    e.key === "Enter" && !formValidate.preventSubmit && nextStep();

  return (
    <>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((step, i) => (
          <Step key={i}>
            <StepLabel>{step}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {activeStep === 0 && (
        <>
          <TextField
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
            onBlur={validateField("username")}
          />
          <TextField
            margin="dense"
            id="email"
            label="Email"
            type="email"
            autoComplete="email"
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
            autoComplete="new-password"
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
            autoComplete="new-password"
            fullWidth
            variant="standard"
            error={formValidate.passwordError}
            helperText={formValidate.passwordHelper}
            value={formState.passwordConfirm}
            onChange={updateForm}
            onBlur={validateField("password")}
            onKeyDown={nextOnEnter}
          />
        </>
      )}
      {activeStep === 1 && (
        <>
          <TagList label={""} tagStates={tagStates} rows={5} />
        </>
      )}
      <DialogActions>
        {modalStates && (
          <Button variant="outlined" onClick={modalStates.closeAuth}>
            Cancel
          </Button>
        )}
        {activeStep === steps.length - 1 ? (
          <Button
            type="submit"
            variant="contained"
            onClick={handleSignup}
            disabled={formValidate.preventSubmit}
          >
            Sign Up
            {loading && <ButtonLoader />}
          </Button>
        ) : (
          <Button
            variant="contained"
            onClick={nextStep}
            disabled={formValidate.preventSubmit}
          >
            Next
          </Button>
        )}
      </DialogActions>
    </>
  );
}
