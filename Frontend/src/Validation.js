const Validate_obj = {
  validateName: (name) => {
    const nameRegex = /^[a-zA-Z][a-zA-Z\s'-]{1,49}$/;
    if (name.length < 2) {
      return "Name cannot have less than 2 letters";
    }
    if (!nameRegex.test(name)) {
      return "Name cannot contain any symbols";
    }
    return true;
  },

  validatePassword: (password) => {
    const passwordRegex = {
      minLength: 8,
      maxLength: 128,
      hasUpperCase: /[A-Z]/,
      hasLowerCase: /[a-z]/,
      hasNumbers: /[0-9]/,
      hasSpecialChar: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
    };

    if (password.length < passwordRegex.minLength) {
      return "Password must be at least 8 characters long.";
    }

    if (password.length > passwordRegex.maxLength) {
      return "Password must be less than 128 characters.";
    }

    if (passwordRegex.hasLowerCase.test(password) == false) {
      return "Password must contain at least one lowercase letter.";
    }

    if (passwordRegex.hasUpperCase.test(password) == false) {
      return "Password must contain at least one uppercase letter.";
    }

    if (passwordRegex.hasSpecialChar.test(password) == false) {
      return "Password must contain at least one special character.";
    }

    return true;
  },

  validateEmail: (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (email.length > 254) {
      return { isValid: false, error: "Email is too long" };
    }
    if (!emailRegex.test(email)) {
      return { isValid: false, error: "Invalid email format" };
    }
    return true;
  },
};

export default Validate_obj;
