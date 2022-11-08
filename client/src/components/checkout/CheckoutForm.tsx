import React from "react";
import {
  Button,
  DialogActions,
  TextField,
  Stepper,
  Step,
  StepLabel,
  Typography,
  FormGroup,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";

import Validate from "../../utils/formValidations";
import StripeWrapper from "./StripeWrapper";
import StripePay from "./StripePay";

type OrderInfoState = {
  email: string;
  phone: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  postcode: string;
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

type Field = "email" | "phone" | "address" | "city" | "postcode" | "all";

const states = [
  "AL",
  "AK",
  "AS",
  "AZ",
  "AR",
  "CA",
  "CO",
  "CT",
  "DE",
  "DC",
  "FM",
  "FL",
  "GA",
  "GU",
  "HI",
  "ID",
  "IL",
  "IN",
  "IA",
  "KS",
  "KY",
  "LA",
  "ME",
  "MH",
  "MD",
  "MA",
  "MI",
  "MN",
  "MS",
  "MO",
  "MT",
  "NE",
  "NV",
  "NH",
  "NJ",
  "NM",
  "NY",
  "NC",
  "ND",
  "MP",
  "OH",
  "OK",
  "OR",
  "PW",
  "PA",
  "PR",
  "RI",
  "SC",
  "SD",
  "TN",
  "TX",
  "UT",
  "VT",
  "VI",
  "VA",
  "WA",
  "WV",
  "WI",
  "WY",
];

export default function CheckoutForm({ cartHandler }: any) {
  // Form control
  const [formState, setFormState] = React.useState<OrderInfoState>({
    email: "",
    phone: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    postcode: "",
  });

  const updateForm = (e: any): void => {
    const field = e.target.id || e.target.name;
    // e.target.id in formState ? e.target.id : e.target.id.split("-")[0];
    const value = e.target.value; // || e.target.textContent;

    setFormState((prev: OrderInfoState) => {
      return { ...prev, [field]: value };
    });

    if (field === "postcode") {
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
      const addressValidation =
        field === "address" || field === "all"
          ? Validate.address(
              formState.address1,
              formState.address2,
              formState.city,
              formState.state,
              formState.postcode
            )
          : {};
      const newValidation = {
        ...prev,
        ...phoneValidation,
        ...emailValidation,
        ...addressValidation,
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
  }, [formState]); // eslint-disable-line
  // Prevent eslint warning enforcing cyclical useEffect setting

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
    formValidate.addressError ||
      !formState.address1 ||
      !formState.city ||
      !formState.state ||
      !formState.postcode,
  ];

  // Advance form with Enter key
  const nextOnEnter = (e: React.KeyboardEvent) =>
    e.key === "Enter" && !formValidate.preventSubmit && nextStep();

  return (
    <>
      <Stepper activeStep={activeStep} alternativeLabel sx={{ my: 2 }}>
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
            label="Apt #, Unit #, etc."
            type="text"
            autoComplete="address-line2"
            fullWidth
            variant="standard"
            error={formValidate.addressError}
            value={formState.address2}
            onChange={updateForm}
          />
          <FormGroup row sx={{ columnGap: 2, pt: 1 }}>
            <TextField
              margin="dense"
              id="city"
              label="City"
              type="text"
              autoComplete="address-level2"
              variant="standard"
              sx={{ flexGrow: 1 }}
              error={formValidate.addressError}
              helperText={formValidate.addressHelper}
              value={formState.city}
              onChange={updateForm}
            />
            <FormControl
              sx={{ m: 1, minWidth: 80 }}
              error={formValidate.addressError}
            >
              <InputLabel>State</InputLabel>
              <Select
                id="state"
                name="state"
                label="State"
                value={formState.state || ""}
                onChange={updateForm}
                autoComplete="address-level1"
                autoWidth
                margin="dense"
              >
                {states.map((state: string) => (
                  <MenuItem value={state} key={state}>
                    {state}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              margin="dense"
              id="postcode"
              label="ZIP"
              type="text"
              autoComplete="postal-code"
              variant="standard"
              sx={{ width: 100 }}
              error={formValidate.addressError}
              value={formState.postcode}
              onChange={updateForm}
              onBlur={validateField("address")}
              onKeyDown={nextOnEnter}
            />
          </FormGroup>
        </>
      )}
      {activeStep === 2 && (
        <>
          <StripeWrapper cart={cartHandler.cart} formState={formState}>
            <StripePay />
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
