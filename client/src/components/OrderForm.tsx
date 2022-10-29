import React from "react";
import {
  Button,
  DialogActions,
  TextField,
  Stepper,
  Step,
  StepLabel,
  Typography,
} from "@mui/material";

import Validate from "../utils/formValidations";
import StripeWrapper from "./StripeWrapper";
import CheckoutForm from "./CheckoutForm";

type OrderInfoState = {
  email: string;
  phone: string;
  address1: string;
  address2: string;
  address3: string;
};

type OrderInfoValidation = {
  phoneError: boolean;
  phoneHelper: string;
  emailError: boolean;
  emailHelper: string;
  addressError: boolean;
  addressHelper: string;
  preventSubmit: boolean;
};

type Field = "email" | "phone" | "address" | "all";

export default function OrderForm({ cartHandler }: any) {
  // Form control
  const [formState, setFormState] = React.useState<OrderInfoState>({
    email: "",
    phone: "",
    address1: "",
    address2: "",
    address3: "",
  });
  const updateForm = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const field = e.target.id;
    const value = e.target.value;
    setFormState((prev: OrderInfoState) => {
      return { ...prev, [field]: value };
    });

    if (field === "address3") {
      validateField("all")();
    }
  };

  // Validations & helper messages
  const [formValidate, setFormValidate] = React.useState<OrderInfoValidation>({
    phoneError: false,
    phoneHelper: " ",
    emailError: false,
    emailHelper: " ",
    addressError: false,
    addressHelper: " ",
    preventSubmit: true,
  });

  /**
   * @param {Field} field Form field id to validate, or "all" to validate all
   * @returns Validation function
   */
  const validateField = (field: Field) => () => {
    setFormValidate((prev: OrderInfoValidation) => {
      const phoneValidation =
        field === "phone" || field === "all"
          ? Validate.phone(formState.phone)
          : {};
      const emailValidation =
        field === "email" || field === "all"
          ? Validate.email(formState.email)
          : {};
      const passwordValidation =
        field === "address" || field === "all"
          ? Validate.address(
              formState.address1,
              formState.address2,
              formState.address3
            )
          : {};
      const newValidation = {
        ...prev,
        ...phoneValidation,
        ...emailValidation,
        ...passwordValidation,
      };
      const preventSubmit =
        formState.phone.length === 0 ||
        formState.email.length === 0 ||
        formState.address1.length === 0 ||
        formState.address2.length === 0 ||
        newValidation.phoneError ||
        newValidation.emailError ||
        newValidation.addressError;
      return {
        ...newValidation,
        preventSubmit,
      };
    });
  };

  // Revalidate errored fields on form update
  React.useEffect(() => {
    if (
      formValidate.phoneError ||
      formValidate.emailError ||
      formValidate.addressError
    ) {
      validateField("all")();
    }
    // Prevent eslint warning enforcing cyclical useEffect setting
  }, [formState]); // eslint-disable-line

  // Signup steps
  const steps = ["Contact Info", "Shipping", "Enter Payment"];
  const [activeStep, setActiveStep] = React.useState<number>(0);
  const nextStep = () => {
    setActiveStep(activeStep + 1);
  };

  // Check validations per step
  const disableNext = [
    formValidate.emailError ||
      formValidate.phoneError ||
      !formState.email ||
      !formState.phone,
    formValidate.addressError || !formState.address1 || !formState.address3,
  ];

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
          <Typography variant="h5">Contact</Typography>
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
            id="phone"
            label="Phone Number"
            type="text"
            autoComplete="phone"
            fullWidth
            variant="standard"
            error={formValidate.phoneError}
            helperText={formValidate.phoneHelper}
            value={formState.phone}
            onChange={updateForm}
            onBlur={validateField("phone")}
          />
        </>
      )}
      {activeStep === 1 && (
        <>
          <Typography variant="h5">Shipping Address</Typography>
          <TextField
            margin="dense"
            id="address1"
            label="Street Address"
            type="text"
            autoComplete="address-line1"
            fullWidth
            variant="standard"
            error={formValidate.addressError}
            value={formState.address1}
            onChange={updateForm}
          />
          <TextField
            margin="dense"
            id="address2"
            label="Apt #, Ste #, etc."
            type="text"
            autoComplete="address-line2"
            fullWidth
            variant="standard"
            error={formValidate.addressError}
            value={formState.address2}
            onChange={updateForm}
          />
          <TextField
            margin="dense"
            id="address3"
            label="City, State, Zip"
            type="text"
            autoComplete="address-line3"
            fullWidth
            variant="standard"
            error={formValidate.addressError}
            helperText={formValidate.addressHelper}
            value={formState.address3}
            onChange={updateForm}
            onBlur={validateField("address")}
            onKeyDown={nextOnEnter}
          />
        </>
      )}
      {activeStep === 2 && (
        <>
          <StripeWrapper cart={cartHandler.cart}>
            <CheckoutForm />
          </StripeWrapper>
        </>
      )}
      <DialogActions>
        {activeStep < steps.length - 1 && (
          <Button
            variant="contained"
            onClick={nextStep}
            disabled={disableNext[activeStep]}
          >
            Next
          </Button>
        )}
      </DialogActions>
    </>
  );
}
