const alphanumeric = new RegExp(/^\w+$/);

type UsernameValidation = { usernameError: boolean; usernameHelper: string };

class FormValidation {
  username(username: string): UsernameValidation {
    let allowedChars = alphanumeric.test(username);
    let length = username.length >= 3;

    const usernameError = !(allowedChars && length);

    let usernameHelper: string = " ";
    if (!allowedChars) {
      usernameHelper = "Alphanumeric characters only.";
    } else if (!length) {
      usernameHelper = "Minimum 3 characters long.";
    }

    return { usernameError, usernameHelper };
  }
}

export default new FormValidation();
