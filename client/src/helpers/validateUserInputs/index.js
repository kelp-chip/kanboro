function validateNewUser(username, password, repeatedPasswords) {
  let message = [];
  var usernameRegex = /^([A-Za-z0-9_]){0,}$/;
  if (!username.match(usernameRegex))
    message.push("username cannot have special characters");
  if (username.length < 4)
    message.push("username must be at least 4 characters in length");
  if (!password.match(/^(?=.*[a-z])/))
    message.push("password must contain at least one lowercase letter");
  if (!password.match(/^(?=.*[A-Z])/))
    message.push("password must contain at least one uppercase letter");
  if (!password.match(/^(?=.*\d)/))
    message.push("password must contain at least one number");
  if (!password.match(/^(?=.*[@$!%*?&])/))
    message.push("password must contain at least one special character");
  if (password.length < 8)
    message.push("password must be at least 8 characters in length");
  if (password !== repeatedPasswords) message.push("passwords do not match");

  if (message.length > 0) return { valid: false, message };
  return { valid: true };
}

export default validateNewUser;
