// emailRegex is a regular expression for validating email addresses.
const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// isValidEmail checks if an email is valid by matching it against the emailRegex.
const isValidEmail = (email) => String(email).toLowerCase().match(emailRegex);

// isValidPassword checks if a password has valid length or not.
const isValidPassword = (password) => {
    return password && password.length >= 8 && password.length <= 12;
}

module.exports = { emailRegex, isValidEmail, isValidPassword }