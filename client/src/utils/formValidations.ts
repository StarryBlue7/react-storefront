const alphanumeric = new RegExp(/^\w+$/);
const emailPattern = new RegExp(/.+@.+\..+/);
const phonePattern = new RegExp(
  /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/
);
const addressPattern = new RegExp(/\d+\s+\w+\s+\w+/);
const postcodePattern = new RegExp(/^\d{5}(-\d{4})?$/);

type UsernameValidation = { usernameError: boolean; usernameHelper: string };
type PasswordValidation = { passwordError: boolean; passwordHelper: string };
type EmailValidation = { emailError: boolean; emailHelper: string };
type PhoneValidation = { phoneError: boolean; phoneHelper: string };
type AddressValidation = { addressError: boolean; addressHelper: string };

class FormValidation {
  username(username: string): UsernameValidation {
    const allowedChars = alphanumeric.test(username);
    const length = username.length >= 3;

    const usernameError = !(allowedChars && length);

    let usernameHelper: string = " ";
    if (!allowedChars) {
      usernameHelper = "Alphanumeric characters only.";
    } else if (!length) {
      usernameHelper = "Minimum 3 characters long.";
    }

    return { usernameError, usernameHelper };
  }

  password(password: string, confirm: string): PasswordValidation {
    let matchConfirm = true;
    if (password.length > 0 && confirm.length > 0) {
      matchConfirm = password === confirm;
    }
    const length = password.length >= 8;

    const passwordError = !(matchConfirm && length);

    let passwordHelper: string = " ";
    if (!matchConfirm) {
      passwordHelper = "Passwords must match.";
    } else if (!length) {
      passwordHelper = "Minimum 8 characters long.";
    }

    return { passwordError, passwordHelper };
  }

  email(email: string): EmailValidation {
    const emailError = !emailPattern.test(email);
    const emailHelper: string = emailError ? "Must be valid email." : " ";
    return { emailError, emailHelper };
  }

  phone(phone: string): PhoneValidation {
    const phoneError = !phonePattern.test(phone);
    const phoneHelper: string = phoneError
      ? "Must be valid phone number."
      : " ";
    return { phoneError, phoneHelper };
  }

  address(
    line1: string,
    line2: string,
    city: string,
    state: string,
    postcode: string
  ): AddressValidation {
    const addressError = !addressPattern.test(
      line1 + " " + line2 + " " + city + " " + state + " " + postcode
    );
    const postcodeInvalid = !postcodePattern.test(postcode);

    let addressHelper = " ";
    if (addressError) {
      addressHelper = "Must be valid shipping address.";
    } else if (!city) {
      addressHelper = "Please enter city name.";
    } else if (!state) {
      addressHelper = "Please select state.";
    } else if (!postcode || postcodeInvalid) {
      addressHelper = "Please enter valid ZIP code.";
    }

    return { addressError, addressHelper };
  }
}

export default new FormValidation();
