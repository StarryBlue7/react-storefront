const alphanumeric = new RegExp(/^\w+$/);
const emailPattern = new RegExp(/.+@.+\..+/);

type UsernameValidation = { usernameError: boolean; usernameHelper: string };
type PasswordValidation = { passwordError: boolean; passwordHelper: string };
type EmailValidation = { emailError: boolean; emailHelper: string };

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
}

export default new FormValidation();
