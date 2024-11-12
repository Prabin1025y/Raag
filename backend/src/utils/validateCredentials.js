import validator from "validator";

const ValidateCredentials = (fullName, email, password, confirmPassword) => {

    if (!fullName || !email || !password || !confirmPassword)
        return { success: false, message: "Please fill out all the fields" };

    if (password !== confirmPassword)
        return { success: false, message: "Confirm password do not match" };

    if (!validator.isEmail(email))
        return { success: false, message: "Please enter a valid email" };

    if (password.length < 6)
        return { success: false, message: "Password must be of 6 or more characters" };

    if (validator.isAlpha(password) || validator.isAlphanumeric(password))
        return { success: false, message: "Password must contain atleast a number and a special character" };

    return { success: true, message: "Valid Credentials" }

}

export default ValidateCredentials;