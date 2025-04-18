const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const strongPasswordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;

const validateEmail = (email) => emailRegex.test(email);
const validatePassword = (password) => strongPasswordRegex.test(password);

module.exports = { validateEmail, validatePassword };
